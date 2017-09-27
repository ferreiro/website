if (process.env.NODE_ENV === 'production') {
  require('newrelic') // Stats for production only
}

const setupDatabase = require('./setupDatabase')
const setupMiddlewares = require('./setupMiddlewares')
const setupPassport = require('./setupPassport')
const setupLocals = require('./setupLocals')
const setupAdmin = require('./setupAdmin')

const express = require('express')
const app = express()

setupDatabase()
setupMiddlewares(app)
setupPassport(app) // Important! after middlewares setup
setupLocals(app)
setupAdmin(app)

// Routes
app.use('/', require('./web/routes'))
app.use('/api', require('./api'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
