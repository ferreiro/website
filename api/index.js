var errors = require('./errors')

var express = require('express')
var app = express()

app.set('view engine', 'jade')

// API Route
app.use('/v1', require('./v1'))
app.get('/status', function (req, res) {
  res.status(200).json({
    'response': 'Everything is working correctly'
  })
})
app.all('*', errors.endpointNotFound)

module.exports = app
