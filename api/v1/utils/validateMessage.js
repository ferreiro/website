var validator = require('validator')

validateMessage = function (message, cb) {
  var valid = false
  var emailCorrect = false
  var messageFilled = false

  if (message === null)
    return cb(valid)

  if (message.email === null || message.msg === null)
    return cb(valid)

  var email = message.email
  var msg = message.msg
  
  emailCorrect = validator.isEmail(String(email))
  messageFilled = (msg !== undefined)

  valid = emailCorrect && messageFilled

  cb(valid)
}

module.exports = validateMessage
