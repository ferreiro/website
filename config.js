var config = {
  'email': {
    'JORGE': process.env.JORGE_EMAIL
  },
  'mailgun': {
    'USER': process.env.MAILGUN_USER,
    'PASS': process.env.MAILGUN_PASS
  },
  'gmail': {
    'USER': process.env.GMAIL_USER,
    'PASS': process.env.GMAIL_PASSWD
  },
  'recaptcha': {
    'PUBLIC_KEY': process.env.RECAPTCHA_PUBLIC,
    'SECRET_KEY': process.env.RECAPTCHA_SECRET
  }
}

module.exports = config
