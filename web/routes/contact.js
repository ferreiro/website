/**
* Contact. Send messages
*/
const express = require('express')
const router = express.Router()
const _ = require('lodash')

// Routes
router.get('/', contact)
router.get('/talk', contactTalk)
router.get('/feedback', feedback)

module.exports = router

// FUNCTIONS

function contact (req, res, next) {
  const content = require('../content/english/contact.json')
  return res.render('contact', {
    title: 'Contact - Jorge Ferreiro',
    headline: 'Contact me',
    path: 'contact',
    content: content,
    redirect: req.query.redirect
  })
}

function contactTalk (req, res, next) {
  const content = require('../content/english/contact.json')
  let talkContact = _.cloneDeep(content)
  talkContact.config.claim = "Are you organizing an event and want me to talk? I'll be happy to be part of it! Submit the form below or shoot me an email at (<a class='email openModalBox'>jorge at ferreiro dot me</a>)."
  talkContact.sendButton = "Submit proposal"
  talkContact.form.message = "What's your event about and when is it?"

  res.render('contact', {
    title: 'Bring me to your event',
    content: talkContact,
    path: 'contact/talks',
    redirect: req.query.redirect
  })
}

function feedback(req, res, next) {
  const feedbackContent = require('../content/english/feedback.json')
  res.render('feedback', {
    title: 'Feeback',
    path: 'contact/feedback',
    content: feedbackContent,
    redirect: req.query.redirect
  })
}
