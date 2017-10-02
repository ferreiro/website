
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
    'name': req.body.__name || null,
    'email': req.body.__email || null,
    'msg': req.body.__msg || null,
    'subscribed': req.body.__subscribed || null
  })

  if (message.subscribed) {
    addUserToMailchimp(email)
  }

  utils.validateMessage(message, function(valid) {
    if (!valid) {
      return errors.formNotValid(req, res)
    }

    utils.sendMessage(message, function (err, email) {
      if (err) {
        errors.emailNotSend(req, res)
      } else {
        res.status(200).json(email)
      }
    })
  })
})

function addUserToMailchimp (email) {
  mailchimp.post({
    path : '/lists/3b63288535/members',
    body: {
      email_address: email,
      status: 'subscribed'
    }
  }, (err, result) => {
    if (err) {
      // we coudln't add user to machilp
    }
    return
  })
}

module.exports = router
