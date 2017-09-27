module.exports = {
  // APP config
  PORT: '',
  MONGO_DB: '',
  ADMIN_EMAIL: '',
  ADMIN_PASS: '',

  // Email Services
  PERSONAL_EMAIL: '',
  MAILGUN_USER: process.env.MAILGUN_USER,
  MAILGUN_PASS: process.env.MAILGUN_PASS,
  GMAIL_USER: '',
  GMAIL_PASS: '',

  // Session Configurations
  SESSION_SECRET: 'cat',

  // Tracking systems
  NEW_RELIC_LICENSE_KEY: ''
}
