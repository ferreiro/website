/**
* Contact. Send messages
*/
const express = require('express')
const router = express.Router()

const content = require('../content/english/contact.json')

// Routes
router.get('/', newsletter)

module.exports = router

// FUNCTIONS
function newsletter (req, res, next) {
  res.render('newsletter', {
    title: 'Newsletter - Jorge Ferreiro',
    path: 'newsletter',
    newsletter: true,
    content: content,
    redirect: req.query.redirect
  })
}
