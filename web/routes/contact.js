/**
* Contact. Send messages
*/
const express = require('express')
const router = express.Router()

// Routes
router.get('/', contact)
router.get('/talk', contactTalk)
router.get('/feedback', feedback)

module.exports = router

// FUNCTIONS

function contact (req, res, next) {
  let content = require('../content/english/contact.json')
  res.render('contact', {
    title: 'Contact me',
    path: 'contact',
    content: content
  })
}

function contactTalk (req, res, next) {
  let content = require('../content/english/contact.json')
  content.config.claim = "Are you organizing an event and want me to be your speaker? Send me an email with the proposal (<a class='email openModalBox'>jorge at ferreiro dot me</a>). I'll be happy to be part of it!"
  content.sendButton = "Submit proposal"
  content.form.message = "What's your proposal? Name, dates, topics, etc..."
  res.render('contact', {
    title: 'Jorge at your event',
    path: 'talks',
    content: content
  })
}

function feedback(req, res, next) {
  const content = require('../content/english/contact.json')
  res.render('contact', {
    title: 'Feeback',
    path: 'feedback',
    content: content.feedback
  })
}
