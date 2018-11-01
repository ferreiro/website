const validator = require('validator')
const {isEmpty} = require('lodash')

const validateMessage = (message, cb) => {
  if (message === null) {
    return cb(false)
  }
  if (message.email === null || message.msg === null) {
    return cb(false)
  }

  const isValidEmail = validator.isEmail(String(message.email))
  const isMessageFilled = !isEmpty(message.msg)
  const isValid = isValidEmail && isMessageFilled;

  cb(isValid)
}

module.exports = validateMessage
