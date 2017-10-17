var config = {
  'email': {
    'JORGE': process.env.JORGE_EMAIL
  },
  'mailgun': {
    'USER': process.env.MAILGUN_USER,
    'PASS': process.env.MAILGUN_PASS
  },
  'recaptcha': {
    'PUBLIC_KEY': process.env.RECAPTCHA_PUBLIC,
    'SECRET_KEY': process.env.RECAPTCHA_SECRET
  },
  'NEW_RELIC_LICENSE_KEY': process.env.NEW_RELIC_LICENSE_KEY
}

module.exports = config
