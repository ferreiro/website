var express = require('express')
var router = express.Router()

var pug = require('pug')
var xoauth2 = require('xoauth2')
var nodemailer = require('nodemailer')
var validator = require('validator')
var content = require('../public/content/english.json')
var config = require('../config')

MAILGUN_USER = config.mailgun.USER || undefined
MAILGUN_PASS = config.mailgun.PASS || undefined
JORGE_EMAIL = config.email.JORGE ||  undefined
GMAIL_USER = config.gmail.USER || undefined
GMAIL_PASS = config.gmail.PASS || undefined

// Routes
router.get('/', contact)
router.get('/feedback', feedback)
router.post('/send', submitForm)

module.exports = router

// FUNCTIONS
function contact (req, res, next) {
  res.render('contact', {
    title: 'Contact me'
    , path: 'contact'
    , content: content.contact
  })
}

function feedback(req, res, next) {
  res.render('contact', {
    title: 'Feeback'
    , path: 'feedback'
    , content: content.feedback
  })
}

function submitForm (req, res, next) {
  var form = {
    'name': req.body.contact_name || undefined,
    'email': req.body.contact_email || undefined,
    'message': req.body.contact_msg || undefined,
    'subscribed': req.body.contact_newsletter || false,
    'source': req.body.contact_source || 'General'
  }

  validForm = validateForm(form.email, form.message)

  if (validForm) {

    var endpoint
    var transporter
    var compiledTemplate
    var htmlEmail
    var mailOptions

    transporter = nodemailer.createTransport({
      service: 'Mailgun',
      auth: {
        user: MAILGUN_USER, // postmaster@sandbox[base64 string].mailgain.org
        pass: MAILGUN_PASS // You set this.
      }
    })

    // HTML Template
    compiledTemplate = pug.compileFile('views/emailTemplate.pug')
    htmlEmail = compiledTemplate({ form: form })
    console.log(endpoint);

    // Setup e-mail data with unicode symbols
    mailOptions = {
      from: '"' + form.name + " 👥 <" + form.email + '>', // sender address
      to: [JORGE_EMAIL], // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world 🐴', // plaintext body
      html: '<b>Hello world 🐴</b>' // html body
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
      res.json({
        'error': info,
        'validData': true,
        'emailSent': (!error)
      })
    })
  }
  else {
    res.json({
      'data': {
        'error': true,
        'validData' : validForm,
        'emailSent' : false
      }
    })
  }
}


// function submitForm (req, res) {
//   var validForm
//   var form = {
//     'name': req.body.contact_name || undefined,
//     'email': req.body.contact_email || undefined,
//     'message': req.body.contact_msg || undefined,
//     'subscribed': req.body.contact_newsletter || false,
//     'source': req.body.contact_source || 'General'
//   }
//
//   validForm = validateForm(form.email, form.message)
//
//   if (validForm) { // validCaptcha &&
//     transporter = nodemailer.createTransport(
//       'smtps://' + GMAIL_USER + ':' + GMAIL_PASS + '@smtp.gmail.com');
//
//     var compiledTemplate = pug.compileFile('views/emailTemplate.pug')
//     var htmlEmail = compiledTemplate({
//       name: form.name,
//       email: form.email,
//       message: form.message,
//       subscribed: form.subscribed,
//       source: form.source
//     })
//
//     mailOptions = { // Setup e-mail data with unicode symbols
//         subject: '[Ferreiro/contact] Message from ' + form.name,
//         from: String(form.name) + ' <' + String(form.email) + '>', // sender address
//         to: 'jorge@ferreiro.me', // list of receivers
//         replyTo: form.email,
//         html: htmlEmail // html body
//     }
//     transporter.sendMail (mailOptions, function(error, data) {
//       res.setHeader('Content-Type', 'application/json')
//       res.json({
//         'error': error,
//         'validData': true,
//         'emailSent': (!error)
//       })
//     })
//   }
//   else {
//     res.setHeader('Content-Type', 'application/json')
//     res.json({
//       'data': {
//         'error': true,
//         'validData' : validForm,
//         'emailSent' : false
//       }
//     })
//   }
// }

validateForm = function (email, message) {
  var isEmailCorrect = validator.isEmail(String(email))
  var isMessageFilled = (email !== undefined)

  return isEmailCorrect && isMessageFilled
}
