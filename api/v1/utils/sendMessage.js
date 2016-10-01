var pug = require('pug')
var path = require('path')
var config = require('../../config')
var nodemailer = require('nodemailer')

sendMessage = function (message, cb) {

  var transporter;
  var compiledTemplate;
  var emailHTML;
  var mailOptions;

  transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: config.MAILGUN_USER, // postmaster@sandbox[base64 string].mailgain.org
      pass: config.MAILGUN_PASS // You set this.
    }
  })

  console.log('Hola desde sendMessage');

  // compiledTemplate = pug.compileFile(path.join('/emailTemplate.pug'))
  // console.log('compilerd');
  // emailHMTL = compiledTemplate({ message: message })
  emailHMTL = ''

  mailOptions = {
    from: '"' + message.name + " 👥 <" + message.email + '>', // sender address
    to: config.PERSONAL_EMAIL, // list of receivers
    subject: 'Hello ✔', // Subject line
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
