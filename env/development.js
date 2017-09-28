module.exports = {
  // APP config
  PORT: 3000,
  MONGODB_URI: 'mongodb://127.0.0.1/ferreiro_blog',
  ADMIN_EMAIL: 'admin',
  ADMIN_PASS: 'admin',
  MAILCHIMP_API_TOKEN: process.env.MAILCHIMP_API_TOKEN,

  // Email Services
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  MAILGUN_USER: process.env.MAILGUN_USER,
  MAILGUN_PASS: process.env.MAILGUN_PASS,

  // Session Configurations
  SESSION_SECRET: 'Yolo',
  RECAPTCHA_PUBLIC: process.env.RECAPTCHA_PUBLIC,
  RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET,

  // Tracking systems
  NEW_RELIC_LICENSE_KEY: process.env.NEW_RELIC_LICENSE_KEY
}
