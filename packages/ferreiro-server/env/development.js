module.exports = {
    // APP config
    BETA_ACTIVATED: true,
    PORT: 3000,
    MONGODB_URI: "mongodb://127.0.0.1/ferreiro_blog",
    ADMIN_EMAIL: "admin",
    ADMIN_PASS: "admin",
    MAILCHIMP_API_TOKEN: process.env.MAILCHIMP_API_TOKEN,

    // AMAZON WEB SERVICES
    S3_REGION: process.env.S3_REGION,
    S3_BUCKET: process.env.S3_BUCKET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,

    // GOOGLE TOKENS
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,

    // Email Services
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    MAILGUN_USER: process.env.MAILGUN_USER,
    MAILGUN_PASS: process.env.MAILGUN_PASS,

    // Session Configurations
    SESSION_SECRET: "Yolo",
    RECAPTCHA_PUBLIC: process.env.RECAPTCHA_PUBLIC,
    RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET,

    // Tracking systems
    NEW_RELIC_LICENSE_KEY: process.env.NEW_RELIC_LICENSE_KEY
}
