/**
* Contact. Send messages
*/
const express = require('express')
const router = express.Router()
const _ = require('lodash')

const content = require('../content/english/contact.json')

// Routes
router.get('/', contact)
router.get('/talk', contactTalk)
router.get('/feedback', feedback)

module.exports = router

// FUNCTIONS

function contact (req, res, next) {
  return res.render('contact', {
    title: 'Contact me',
    path: 'contact',
    content: content,
    redirect: req.query.redirect
  })
}

function contactTalk (req, res, next) {
  let talkContact = _.cloneDeep(content)
  talkContact.config.claim = "Are you organizing an event and want me to talk? I'll be happy to be part of it! Send me an email with a proposal and let's talk! (<a class='email openModalBox'>jorge at ferreiro dot me</a>)."
  talkContact.sendButton = "Submit proposal"
  talkContact.form.message = "What's your event about and when is it?"

  res.render('contact', {
    title: 'Bring me to your event',
    content: talkContact,
    path: 'talks',
    redirect: req.query.redirect
  })
}

function feedback(req, res, next) {
  const feedbackContent = require('../content/english/feedback.json')
  res.render('feedback', {
    title: 'Feeback',
    path: 'feedback',
    content: feedbackContent,
    redirect: req.query.redirect
  })
}
