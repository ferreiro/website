var blog = require('./blog')
var contactRoutes = require('./contact/contact.routes')

var express = require('express')
var router = express()


// API Route
router.use('/contact', contactRoutes)
router.use('/blog', blog.routes)

module.exports = router
