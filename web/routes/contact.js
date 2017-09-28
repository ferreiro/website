/**
* Contact. Send messages
*/
const express = require('express')
const router = express.Router()

const content = require('../content/english.json')

const env = require('../../env')
const MAILGUN_USER = env.MAILGUN_USER
const MAILGUN_PASS = env.MAILGUN_PASS
const CONTACT_EMAIL = env.CONTACT_EMAIL

// Routes
router.get('/', contact)
router.get('/feedback', feedback)
// router.post('/send', submit)

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

function submit (req, res, next) {
  var form = {
    'name': req.query.contact_name || undefined,
    'email': req.query.contact_email || undefined,
    'message': req.query.contact_msg || undefined,
    'subscribed': req.query.contact_newsletter || false,
    'source': req.query.contact_source || 'General'
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

    // Setup e-mail data with unicode symbols
    mailOptions = {
      from: MAILGUN_USER, // sender address
      to: CONTACT_EMAIL, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world 🐴', // plaintext body
      html: '<b>Hello world 🐴</b>' // html body
    }
    //
    // console.log(mailOptions);
    // console.log(MAILGUN_PASS);
    // console.log(MAILGUN_USER);
    // console.log(CONTACT_EMAIL);

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {


      console.log(error);
      console.log(info);
      res.json({
        'error': error,
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
  console.log(isEmailCorrect);
  console.log(isMessageFilled);
  return isEmailCorrect && isMessageFilled
}
