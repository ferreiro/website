var errors = require('./errors')

var express = require('express')
var app = express()

app.set('view engine', 'jade')

// API Route
app.use('/v1', require('./v1'))
app.all('*', errors.endpointNotFound)

module.exports = app
