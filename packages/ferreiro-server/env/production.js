module.exports = {
  // APP config
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASS: process.env.ADMIN_PASS,
  MAILCHIMP_API_TOKEN: process.env.MAILCHIMP_API_TOKEN,
  MAX_CACHE_DAYS_SITEMAP: process.env.MAX_CACHE_DAYS_SITEMAP,

  // AMAZON WEB SERVICES
  S3_REGION: process.env.S3_REGION,
  S3_BUCKET: process.env.S3_BUCKET,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,

  // Email Services
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  MAILGUN_USER: process.env.MAILGUN_USER,
  MAILGUN_PASS: process.env.MAILGUN_PASS,

  // Session Configurations
  SESSION_SECRET: process.env.SESSION_SECRET,
  RECAPTCHA_PUBLIC: process.env.RECAPTCHA_PUBLIC,
  RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET,

  // Tracking systems
  NEW_RELIC_LICENSE_KEY: process.env.NEW_RELIC_LICENSE_KEY
}
