var blog = require('./blog')
var contact = require('./contact')

var express = require('express')
var router = express()


// API Route
router.use('/contact', contact.routes)
router.use('/blog', blog.routes)

module.exports = router
