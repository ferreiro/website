const path = require('path')
const MailchimpApi = require('mailchimp-api-v3')
const express = require('express')
const router = express.Router()

const env = require('../../../env')
const mailchimp = new MailchimpApi(env.MAILCHIMP_API_TOKEN)

router.post('/', (req, res) => {
  console.log('posteme')
  const name = req.body.__name || ''
  const email = req.body.__email || ''
  addUserToMailchimp (name, email, (err) => {
    if (err.status === 400) {
      return res.json({
        error: 'This email is already register!'
      })
    }
    if (err) {
      return res.json({
        error: err.detail
      })
    }
    return res.json({
      success: 'Subscribed'
    })
  })
})

function addUserToMailchimp (name, email, next) {
  mailchimp.post({
    path : '/lists/3b63288535/members',
    body: {
      merge_fields: {
        name: name
      },
      email_address: email,
      status: 'subscribed'
    }
  }, (err, result) => {
    if (err) {
      return next(err)
    }
    return next(null)
  })
}

module.exports = router
