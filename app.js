if (process.env.NODE_ENV === 'production') {
  require('newrelic') // Stats for production only
}

var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var helmet = require('helmet')
var session = require('express-session')
var setupPassport = require('./setupPassport')

var app = express()

// Add security layer
app.use(helmet())
// Serve static bower: http://goo.gl/e2nTBf
app.use(favicon(path.join(__dirname, 'web', 'public', 'images', 'favicons', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'web/public')))
app.use(express.static(__dirname + '/public'))
app.use('/bower_components',  express.static(__dirname + '/bower_components'))
app.use('/semantic',  express.static(__dirname + '/semantic'))
app.use(logger('dev'))
// order matters here
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ secret: 'keyboard cat' }))
setupPassport(app)

// view engine setup
app.set('views', path.join(__dirname, 'web/views'))
app.set('view engine', 'pug')

// Routes
const content = require('./web/content/english')
app.locals.menu = content.menu
app.locals.social = content.social

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
