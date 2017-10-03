const pug = require('pug')
const path = require('path')
const nodemailer = require('nodemailer')

const env = require('../../../env')

const MAILGUN_USER = env.MAILGUN_USER
const MAILGUN_PASS = env.MAILGUN_PASS
if (!MAILGUN_USER || !MAILGUN_PASS) {
  throw new Error('MAILGUN ENV TOKENS NOT PROVIDED')
}

const CONTACT_EMAIL = env.CONTACT_EMAIL
if (!CONTACT_EMAIL) {
  throw new Error('CONTACT_EMAIL ENV TOKENS NOT PROVIDED')
}

sendMessage = function (message, cb) {

  var transporter;
  var emailHTML;
  var mailOptions;

  transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: MAILGUN_USER, // postmaster@sandbox[base64 string].mailgain.org
      pass: MAILGUN_PASS // You set this.
    }
  })

  try {
    var compiledFunction = pug.compileFile(path.join(__dirname,'template.pug'))
    emailHMTL = compiledFunction({
      form: message
    })
  }
  catch(err) {
      emailHMTL = '' + JSON.stringify(message)
  }

  mailOptions = {
    from: message.name + '<' + MAILGUN_USER + '>', // sender address
    to: CONTACT_EMAIL, // list of receivers
    subject: '[Ferreiro.me] New message', // Subject line
    html: emailHMTL // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, email) {
    if (error) {
      return cb(error, null)
    }
    return cb(null, email)
  })
}

module.exports = sendMessage
