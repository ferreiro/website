const pug = require('pug')
const path = require('path')
const nodemailer = require('nodemailer')

const env = require('../../../env')

sendMessage = function (message, cb) {

  var transporter;
  var emailHTML;
  var mailOptions;

  transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: env.MAILGUN_USER, // postmaster@sandbox[base64 string].mailgain.org
      pass: env.MAILGUN_PASS // You set this.
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
    from: message.name + '<' + env.MAILGUN_USER + '>', // sender address
    to: env.PERSONAL_EMAIL, // list of receivers
    subject: '[Ferreiro.me] New message', // Subject line
    html: emailHMTL // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, email) {
    if (error) {
      return cb(error, null)
    }
    return cb(error, email)
  })
}

module.exports = sendMessage
