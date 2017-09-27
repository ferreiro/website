
const path = require('path')
const MailchimpApi = require('mailchimp-api-v3')
const mailchimp = new MailchimpApi('a07be4a32ce4596b687a7b772a1efc7e-us8')

const express = require('express')
const router = express.Router()

router.get('/subscribe', (req, res) => {
  res.send('hello')
})
router.post('/subscribe', (req, res) => {
  const email = req.body.email || ''
  mailchimp.post({
    path : '/lists/3b63288535/members',
    body: {
      email_address: email,
      status: 'subscribed'
    }
  }, function (err, result) {
    if (err) {
      console.log(err)
      return res.json({
        error: err.detail
      })
    }
    return res.json({
      success: 'Subscribed'
    })
  })
})

module.exports = router
