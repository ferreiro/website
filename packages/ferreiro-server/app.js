const setupApp = require('./setup')
const express = require('express')
const app = express()

setupApp(app)

module.exports = app
