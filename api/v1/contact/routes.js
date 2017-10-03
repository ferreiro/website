
const MailchimpApi = require('mailchimp-api-v3')
const express = require('express')
const router = express.Router()

const env = require('../../../env')
const utils = require('../utils')
const errors = require('../../errors')
const mailchimp = new MailchimpApi(env.MAILCHIMP_API_TOKEN)

/**
* @api POST /contact
* Send a personal email
*
* @ name
* @ message
* @ email
* @ subscribed
*/
router.post('/', function (req, res) {
  var message = ({
    name: req.body.__name || null,
    email: req.body.__email || null,
    msg: req.body.__msg || null,
    subscribed: req.body.__subscribed || null
  })

  utils.validateMessage(message, function(valid) {
    if (!valid) {
      return errors.formNotValid(req, res)
    }

    if (message.subscribed) {
      addUserToMailchimp(message.email)
    }

    utils.sendMessage(message, function (err, email) {
      if (err) {
        errors.emailNotSend(req, res)
        return res.json({
          error: err
        })
      } else {
        res.status(200).json(email)
      }
    })
  })
})

function addUserToMailchimp (email) {
  console.log('Add user to mailchimp')
  console.log(email)
  mailchimp.post({
    path : '/lists/3b63288535/members',
    body: {
      email_address: email,
      status: 'subscribed'
    }
  }, (err, result) => {
    console.log(err)
    if (err) {
      // we coudln't add user to machilp
    }
  })
}

module.exports = router
