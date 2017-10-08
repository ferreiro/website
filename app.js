if (process.env.NODE_ENV === 'production') {
  require('newrelic') // Stats for production only
}

const setupApp = require('./setup')
const express = require('express')
const app = express()

setupApp(app)

module.exports = app
