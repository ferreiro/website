var express = require('express');
var nodemailer = require('nodemailer'); // Nodemailer es un módulo externo de node que nos permite mandar correos.
var config = require('./../config.json');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('contact', {
    title: 'Contact me'
  });
});

function composeEmailHTML(name, email, message) {
      // Preparing email message
      html =  '<html><body style="background: #F8F8F8; margin:0; padding:1em 2em;">';
      html += '<h3>Mensaje</h3>';
      html += '<p style="font-size:16px;">';
      html += 'Nombre: '  + name +'<br /> ';
      html += 'Email: '   + email + '<br />';
      html += 'Date: '    + message + '<br />';
      html += '</p>';
      html += '</body></html>';

      return html;
}

router.post('/send', function(req, res, next) {
    var transporter
      , contactForm
      , mailOptions;

    gmailUser = config.gmail.user;
    gmailPassword = process.env.GMAIL_PASSWD; // get from Enviroments

    console.log(gmailPassword)

    contactForm = {
      sent: false,
      name: req.body.contact_name,
      email: req.body.contact_email,
      msg: req.body.contact_msg,
      subject: "Contacto Web de Jorge"
    };

    email_html = composeEmailHTML(
      contactForm.name,
      contactForm.email,
      contactForm.message
    );

    mailOptions = { // Setup e-mail data with unicode symbols
        subject: '[jgferreiro.com] Message from ' + contactForm.name,
        from: 'Jorge <me@jgferreiro.com>', // sender address
        to: 'me@jgferreiro.com', // list of receivers
        replyTo: contactForm.email,
        html: email_html // html body
    };

    transporter = nodemailer.createTransport({
  	    service: 'Gmail',
  	    auth: {
  	        user: gmailUser,
  	        pass: gmailPassword
  	    }
  	});

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
      if (!error) {
        contactForm.sent = true;
      }
      // Devolver JSON para cuando se haga un formulario ajax.
      res.json({
          data: contactForm // We return form object we created before
      });
    });

});

module.exports = router;
