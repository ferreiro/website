/**
* Contact. Send messages
*/
const express = require('express')
const router = express.Router()

const content = require('../content/english/contact.json')

// Routes
router.get('/', contact)
router.get('/feedback', feedback)

module.exports = router

// FUNCTIONS
function contact (req, res, next) {
  res.render('contact', {
    title: 'Contact me',
    path: 'contact',
    content: content
  })
}

function feedback(req, res, next) {
  res.render('contact', {
    title: 'Feeback'
    , path: 'feedback'
    , content: content.feedback
  })
}
