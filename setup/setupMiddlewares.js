const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const session = require('express-session')
const express = require('express')

const env = require('../env')

module.exports = (app) => {
  if (process.env.NODE_ENV === 'production') {
    require('newrelic') // Stats for production only
  }

  // Add security layer
  app.use(helmet())

  // Serve static bower: http://goo.gl/e2nTBf
  app.use(favicon(path.join(__dirname, '../web', 'public', 'images', 'favicons', 'favicon.ico')))
  app.use(express.static(path.join(__dirname, '../web/public')))
  app.use(express.static(__dirname + '../web/public'))
  app.use('/bower_components', express.static(path.join(__dirname, '../bower_components')))
  app.use('/semantic',  express.static(path.join(__dirname, '../semantic')))
  app.use(logger('dev'))

  // order matters here for passport
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  // Session configuration (always after previous block)
  if (!env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET not provided ')
  }
  app.use(session({
    secret: env.SESSION_SECRET
  }))

  // view engine setup
  app.set('views', path.join(__dirname, '../web/views'))
  app.set('view engine', 'pug')
}