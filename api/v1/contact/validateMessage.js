const validator = require('validator')
const {isEmpty} = require('lodash')

export const validateMessage = ({
  msg = null,
  email = '',
}, cb) => {
  if (isEmpty(msg)) {
    return cb(false)
  }
  if (isEmpty(email) || isInvalidEmail(email)) {
    return cb(false)
  }

  cb(true)
}

const isInvalidEmail = (email) => (
  !validator.isEmail(email)
)