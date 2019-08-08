const pug = require('pug')
const path = require('path')
const nodemailer = require('nodemailer')

const env = require('../../../env')

const MAILGUN_USER = env.MAILGUN_USER
const MAILGUN_PASS = env.MAILGUN_PASS
const CONTACT_EMAIL = env.CONTACT_EMAIL
const EMAIL_TEMPLATE_PATH = path.join(__dirname, 'EmailTemplate.pug')

if (!MAILGUN_USER || !MAILGUN_PASS) {
    throw new Error('MAILGUN ENV TOKENS NOT PROVIDED')
}
if (!CONTACT_EMAIL) {
    throw new Error('CONTACT_EMAIL ENV TOKENS NOT PROVIDED')
}

const compiledEmailTemplate = pug.compileFile(EMAIL_TEMPLATE_PATH)

export const sendMessage = (message, cb) => {
    const emailHtml = generateEmailHtml(message)
    const emailOptions = getEmailOptions(message, emailHtml)
    const emailTransporter = generateMailgunEmailTransporter()

    emailTransporter.sendMail(emailOptions, (error, email) => {
        if (error) {
            return cb(error, null)
        }
        return cb(null, email)
    })
}

const generateEmailHtml = (form) => {
    try {
        return compiledEmailTemplate({form})
    }
    catch(err) {
        return JSON.stringify(err)
    }
}

const getEmailOptions = (message, html) => ({
    from: message.name + '<' + MAILGUN_USER + '>', // sender address
    to: CONTACT_EMAIL, // list of receivers
    subject: '[Ferreiro.me] New message', // Subject line
    html
})

const generateMailgunEmailTransporter = () => (
    generateEmailTransporter('MAILGUN', MAILGUN_USER, MAILGUN_PASS)
)

const generateEmailTransporter = (service, user, pass) => (
    nodemailer.createTransport({
        service: service,
        auth: {user, pass}
    })
)