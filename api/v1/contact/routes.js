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
    'msg': req.body.__msg || null,
    'subscribed': req.body.__subscribed || null
  })

  utils.validateMessage(message, function(valid) {
    console.log(valid);
    if (!valid) {
      errors.formNotValid(req, res)
    }
    else {
      utils.sendMessage(message, function (err, email) {
        if (err) {
          errors.emailNotSend(req, res)
        } else {
          res.status(200).json(email)
        }
      })
    }
  })
})

module.exports = router
