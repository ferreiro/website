var contact = require('./contact')

var express = require('express')
var router = express()


// API Route
router.use('/contact', contact.routes)

module.exports = router
