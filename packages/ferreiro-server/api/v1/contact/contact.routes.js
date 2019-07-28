import env from '../../../env';
import errors from '../../errors';
import express from 'express';
import MailchimpApi from 'mailchimp-api-v3';
import {sendMessage} from './sendMessage';
import {validateMessage} from './validateMessage';
import {isReactEnabled} from '../../../web/pages/is-react-enabled';

const router = express.Router()
const mailchimp = new MailchimpApi(env.MAILCHIMP_API_TOKEN)

const MAILCHIMP_NEWSLETTER_LIST = '/lists/3b63288535/members'

/**
* @api POST /contact
* Send a personal email
*/
const getMessageFromRequest = (req) => {
  // TODO: Remove old logic once the migration is done...
  // In react we don't longer prepend form with __
  if (isReactEnabled(req)) {
    return {
      name: req.body.name,
      email: req.body.email,
      msg: req.body.msg,
      subscribed: req.body.subscribed 
    }
  }

  const {
    __name = null,
    __email = null,
    __msg = null,
    __subscribed = null
  } = req.body;

  return {
    name: __name,
    email: __email,
    msg: __msg,
    subscribed: __subscribed
  }
}

router.post('/', function (req, res) {
  const message = getMessageFromRequest(req)

  validateMessage(message, (valid) => {
    if (!valid) {
      return errors.formNotValid(req, res)
    }

    if (message.subscribed) {
      addUserToMailchimp(message.name, message.email, (error) => {
        // ignore if fails to add to mailchimp
      })
    }

    sendMessage(message, function (err, email) {
      if (err) {
        return errors.emailNotSend(req, res)
      } else {
        res.status(200).json(email)
      }
    })
  })
})

router.post('/subscribe', function (req, res) {
  const name = req.body.__name || ''
  const email = req.body.__email || null

  addUserToMailchimp(name, email, (err) => {
    if (err) {
      return res.json({
        error: err.detail
      })
    }
    return res.json({
      success: 'Subscribed! Thanks so much'
    })
  })
})

function addUserToMailchimp (name, email, next) {
  // first letter in uppercase
  const userName = ''.concat(name.replace(/\b\w/g, l => l.toUpperCase()))

  return mailchimp.post({
    path : MAILCHIMP_NEWSLETTER_LIST,
    body: {
      merge_fields: {
        FNAME: userName
      },
      email_address: email,
      status: 'subscribed'
    }
  }, (err, result) => {
    if (err) {
      return next(err)
    } // we coudln't add user to machilp
    return next()
  })
}

module.exports = router
