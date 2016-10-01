'use strict'

var stringifySync = require('../util/safe-json').stringifySync
var shimmer = require('../shimmer')
var urltils = require('../util/urltils.js')
var recordRedis = require('../metrics/recorders/redis.js')
var REDIS = require('../metrics/names').REDIS


module.exports = function initialize(agent, redis) {
  var tracer = agent.tracer

  var redisPrototype = redis && redis.RedisClient && redis.RedisClient.prototype
  if (redisPrototype) {
    if (redisPrototype.internal_send_command) {
      shimmer.wrapMethod(
        redisPrototype,
        'redis.RedisClient.prototype',
        'internal_send_command',
        function wrapSendCommand(original) {
          return tracer.wrapFunction(
            REDIS.OPERATION + 'Unknown',
            recordRedis,
            original,
            internalSendCommandWrapper
          )
        }
      )
    } else {
      shimmer.wrapMethod(
        redisPrototype,
        'redis.RedisClient.prototype',
        'send_command',
        function wrapSendCommand(original) {
          return tracer.wrapFunction(
            REDIS.OPERATION + 'Unknown',
            recordRedis,
            original,
            sendCommandWrapper
          )
        }
      )
    }
  }

  function sendCommandWrapper(segment, args, bind) {
    var position = args.length - 1
    var keys = args[1]
    var last = args[position]

    segment.name = REDIS.OPERATION + (args[0] || 'unknown')

    if (keys && typeof keys !== 'function') {
      urltils.copyParameters(agent.config,
        {key: stringifySync(keys[0], 'Unknown')}, segment.parameters)
    }

    // capture connection info for datastore instance metric
    segment.port = this.port
    segment.host = this.host

    if (typeof last === 'function') {
      args[position] = bind(last, true, true)
    } else if (Array.isArray(last) && typeof last[last.length - 1] === 'function') {
      last[last.length - 1] = bind(last[last.length - 1], true, true)
    } else { // let's shove a callback in there for fun
      args.push(bind(null, true, true))
    }

    return args
  }

  function internalSendCommandWrapper(segment, args, bind) {
    var keys = args[0].args
    var command = args[0].command
    args[0].callback = bind(args[0].callback, true, true)

    segment.name = REDIS.OPERATION + (command || 'unknown')

    if (keys && typeof keys !== 'function') {
      urltils.copyParameters(agent.config,
        {key: stringifySync(keys[0], 'Unknown')}, segment.parameters)
    }

    // capture connection info for datastore instance metric
    segment.port = this.port
    segment.host = this.host

    return args
  }
}
