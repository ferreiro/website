'use strict'

var shimmer = require('../shimmer')
var logger = require('../logger').child({component: 'pg'})
var parseSql = require('../db/parse-sql')
var POSTGRES = require('../metrics/names').POSTGRES
var dbutil = require('../db/utils')


// Adds a segment
// The `config` argument is either a statement string template or a pg statement
// config object with a `text` property holding the statement string template.
function initializeSegment(tracer, segment, config) {
  var statement
  if (config && (typeof config === 'string' || config instanceof String)) {
    statement = config
  } else if (config && config.text) {
    statement = config.text
  } else {
    // Won't be matched by parser, but should be handled properly
    statement = 'Other'
  }

  var ps = parseSql(POSTGRES.PREFIX, statement)
  var model = ps.model
  var operation = ps.operation

  segment.name = POSTGRES.STATEMENT + (model || 'other') + '/' + operation

  logger.trace(
    'capturing postgresql query. model: %s, operation: %s',
    model,
    operation
  )

  tracer.getTransaction().addRecorder(ps.recordMetrics.bind(ps, segment))
}

module.exports = function initialize(agent, pgsql) {
  if (!pgsql) return

  var tracer = agent.tracer

  // allows for native wrapping to not happen if not necessary
  // when env var is true

  if (process.env.NODE_PG_FORCE_NATIVE) {
    return instrumentPGNative('pg', pgsql)
  }

  // The pg module defines "native" getter which sets up the native client lazily
  // (only when called).  We replace the getter, so that we can instrument the native
  // client.  The original getter replaces itself with the instance of the native
  // client, so only instrument if the getter exists (otherwise assume already
  // instrumented).
  var origGetter = pgsql.__lookupGetter__('native')
  if (origGetter) {
    delete pgsql.native
    pgsql.__defineGetter__('native', function getNative() {
      var temp = origGetter()
      instrumentPGNative('pg.native', temp)
      return temp
    })
  }

  // wrapping for native
  function instrumentPGNative(eng, pg) {
    var constructors = [
        {english: eng, nodule: pg},
        {english: eng + '.pools', nodule: pg.pools}
      ]

    constructors.forEach(function cb_forEach(obj) {
      shimmer.wrapMethod(obj.nodule, obj.english, 'Client', function wrapper(Client) {
        wrapClient.prototype = Client.prototype
        return wrapClient

        function wrapClient() {
          // NOTE:  This is an instance of PG's `Client` class, _not_ its
          //        `Connection` class. This is an important distinction as the
          //        latter does not have the host/port/database meta data.
          var client = Client.apply(this, arguments)
          if (typeof client === 'undefined') client = this

          shimmer.wrapMethod(client, 'Client', 'connect', wrapConnect)
          shimmer.wrapMethod(client, 'Client', 'query', wrapNativeQuery)

          function wrapConnect(connect) {
            return function wrappedConnect(callback) {
              if (typeof callback === 'function') {
                callback = tracer.bindFunction(callback)
              }
              return connect.call(this, callback)
            }
          }

          function wrapNativeQuery(original) {
            return tracer.wrapFunction(
              POSTGRES.STATEMENT + 'Unknown',
              null,
              original,
              nativeQueryWrapper,
              nativeResponseWrapper
            )
          }

          function nativeQueryWrapper(segment, args, bindCallback) {
            initializeSegment(tracer, segment, args[0])

            var pos = args.length - 1
            var last = args[pos]

            // Capture client info for datastore instance metric.
            dbutil.captureInstanceAttributes(
              segment, client.host, client.port, client.database
            )

            // Proxy callback in case they start new segments
            args[pos] = bindCallback(last)

            return args
          }

          function nativeResponseWrapper(segment, result, bindCallback) {
            // Wrap end and error events too, in case they start new segments
            // within them. Use end and error events to end segments.
            result.on('error', end)
            result.on('end', end)

            function end() {
              segment.touch()
              logger.trace(
                'postgres command trace segment ended by event for transaction %s.',
                segment.transaction.id
              )
            }

            // TODO: Maybe .on and .addListener shouldn't be different
            // Proxy events too, in case they start new segments within handlers
            shimmer.wrapMethod(result, 'query.on', 'on', function queryOnWrapper(on) {
              return function queryOnWrapped() {
                if (arguments[1]) {
                  if (arguments[0] !== 'row') {
                    arguments[1] = bindCallback(arguments[1])
                  } else {
                    arguments[1] = tracer.bindFunction(arguments[1], segment, true)
                  }
                }
                return on.apply(this, arguments)
              }
            })

            shimmer.wrapMethod(
              result,
              'query.addListener',
              'addListener',
              queryAddListenerWrapper
            )

            function queryAddListenerWrapper(addL) {
              return function queryAddListenerWrapped() {
                if (arguments[1]) {
                  if (arguments[0] !== 'row') {
                    arguments[1] = bindCallback(arguments[1])
                  } else {
                    arguments[1] = tracer.bindFunction(arguments[1], segment, true)
                  }
                }
                addL.apply(this, arguments)
              }
            }

            return result
          }

          return client
        }
      })
    })
  }

  // wrapping for JS
  shimmer.wrapMethod(
    pgsql && pgsql.Client && pgsql.Client.prototype,
    'pg.Client.prototype',
    'query',
    wrapQuery
  )

  function wrapQuery(original) {
    return tracer.wrapFunction(
      POSTGRES.STATEMENT + 'Unknown',
      null,
      original,
      queryWrapper,
      responseWrapper
    )
  }

  function queryWrapper(segment, args, bindCallback) {
    var position = args.length - 1
    var last = args[position]

    initializeSegment(tracer, segment, args[0])

    // Capture client info for datastore instance metric.
    dbutil.captureInstanceAttributes(segment, this.host, this.port, this.database)

    // Proxy callbacks in case they start new segments
    if (typeof last === 'function') {
      args[position] = bindCallback(last, true, true)
    } else if (Array.isArray(last) && typeof last[last.length - 1] === 'function') {
      var callback = last[last.length - 1]
      last[last.length - 1] = bindCallback(callback)
    }

    return args
  }

  function responseWrapper(segment, query, bindCallback) {
    // Use end and error events to end segments
    query.on('error', end)
    query.on('end', end)

    function end() {
      segment.end()
      logger.trace(
        'postgres command trace segment ended by event for transaction %s.',
        segment.transaction.id
      )
    }

    // Proxy events too, in case they start new segments within handlers
    shimmer.wrapMethod(query, 'query.on', 'on', function queryOnWrapper(on) {
      return function queryOnWrapped() {
        if (arguments[1]) {
          if (arguments[0] !== 'row') {
            arguments[1] = bindCallback(arguments[1])
          } else {
            arguments[1] = tracer.bindFunction(arguments[1], segment, true)
          }
        }
        return on.apply(this, arguments)
      }
    })

    shimmer.wrapMethod(query, 'query.addListener', 'addListener', addListenerWrapper)

    function addListenerWrapper(addL) {
      return function wrappedAddListener() {
        if (arguments[1]) {
          if (arguments[0] !== 'row') {
            arguments[1] = bindCallback(arguments[1])
          } else {
            arguments[1] = tracer.bindFunction(arguments[1], segment, true)
          }
        }
        addL.apply(this, arguments)
      }
    }

    return query
  }
}
