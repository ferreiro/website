const validator = require('validator')

validateMessage = function (message, cb) {
  let valid = false

  if (message === null) {
    return cb(valid)
  }
  if (message.email === null || message.msg === null) {
    return cb(valid)
  }

  const isValidEmail = validator.isEmail(String(message.email))
  const isMessageFilled = (message.msg !== undefined)
  valid = isValidEmail && isMessageFilled

  cb(valid)
}

module.exports = validateMessage
