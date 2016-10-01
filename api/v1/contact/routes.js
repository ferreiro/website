var utils = require('../utils')
var errors = require('../../errors')

var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.json({
    'title': '',
    'body': ''
  })
})

/**
* @api POST /contact
* Sends emails
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
    'body': req.body.__body || null,
    'subscribed': req.body.__subscribed || null
  })

  if (utils.validateMessage(message.body, message.email)) {
    utils.sendMessage(message, function (err, email) {
      if (err) {
        errors.emailNotSend(req, res)
      } else {
        res.status(200).json(email)
      }
    })
  }
  else {
    errors.formNotValid(req, res)
  }

})

module.exports = router
