var config = {
  "jorgeEmail": process.env.JORGE_EMAIL,
  "gmail": {
    "USER": process.env.GMAIL_USER,
    "PASS": process.env.GMAIL_PASSWD
  },
  "recaptcha": {
    "PUBLIC_KEY": process.env.RECAPTCHA_PUBLIC,
    "SECRET_KEY": process.env.RECAPTCHA_SECRET
  }
}

module.exports = config
