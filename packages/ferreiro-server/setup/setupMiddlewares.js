const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const session = require('express-session')
const express = require('express')
const compression = require('compression')

const env = require('../env')

module.exports = (app) => {
  // Add security layer
  app.use(helmet())

  // Compression!
  app.use(compression())

  // Search engines
  app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname + '/../robots.txt'))
  })
  app.get('/sitemap.xml', (req, res) => {
    res.sendFile(path.join(__dirname + '/../sitemap.xml'))
  })

  // Serve static bower: http://goo.gl/e2nTBf
  app.use(favicon(path.join(__dirname, '../web', 'public', 'src', 'images', 'favicons', 'favicon.ico'), {
    maxAge: process.env.NODE_ENV === 'production' ? '2h' : 0
  }))
  app.use(express.static(path.join(__dirname, '../web/public/dst'), {
    maxAge: process.env.NODE_ENV === 'production' ? '2h' : 0
  }))
  // NB: We generate this from the web client. It contains
  // the react bundles...
  app.use(express.static(path.join(__dirname, '../dist'), {
    maxAge: process.env.NODE_ENV === 'production' ? '2h' : 0
  }))
  app.use('/bower_components', express.static(path.join(__dirname, '../bower_components'), {
    maxAge: process.env.NODE_ENV === 'production' ? '2h' : 0
  }))
  app.use('/favicons', express.static(path.join(__dirname, '../web/public/src/images/favicons'), {
    maxAge: process.env.NODE_ENV === 'production' ? '2h' : 0
  }))
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
    secret: env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
  }))

  // view engine setup
  // NB: Since we're starting to use a duck structure, we'll point to the /web folder,
  // Later on you, you can decide where to load the views using:
  // Eg: return res.render('home/home.pug')
  app.set('views', path.join(__dirname, '../web'))
  app.set('view engine', 'pug')
}