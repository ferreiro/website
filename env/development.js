module.exports = {
  // APP config
  PORT: '',
  MONGO_DB: '',
  ADMIN_EMAIL: 'admin',
  ADMIN_PASS: 'admin',

  // Email Services
  PERSONAL_EMAIL: '',
  MAILGUN_USER: process.env.MAILGUN_USER,
  MAILGUN_PASS: process.env.MAILGUN_PASS,
  GMAIL_USER: '',
  GMAIL_PASS: '',

  // Session Configurations
  SESSION_SECRET: 'keyboard cat',

  // Tracking systems
  NEW_RELIC_LICENSE_KEY: ''
}
