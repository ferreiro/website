var validator = require('validator')

validateMessage = function (message, email) {

  if (message == null || email == null) {
    return false
  }

  var emailCorrect = validator.isEmail(String(email))
  var messageFilled = (email !== undefined)

  return emailCorrect && messageFilled
}

module.exports = validateMessage
