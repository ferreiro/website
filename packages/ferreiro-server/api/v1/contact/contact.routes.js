import env from "../../../env"
import errors from "../../errors"
import express from "express"
import MailchimpApi from "mailchimp-api-v3"
import { sendContactMessage, sendMessage } from "./sendMessage"
import { validateMessage } from "./validateMessage"

const router = express.Router()
const mailchimp = new MailchimpApi(env.MAILCHIMP_API_TOKEN)

/**
 * @api POST /contact
 * Send a personal email
 */
router.post("/", function(req, res) {
    const {
        __name = null,
        __email = null,
        __msg = null,
        __subscribed = null
    } = req.body

    const message = {
        name: __name,
        email: __email,
        msg: __msg,
        subscribed: __subscribed
    }

    validateMessage(message, valid => {
        if (!valid) {
            return errors.formNotValid(req, res)
        }

        if (message.subscribed) {
            addUserToMailchimp(message.name, message.email, error => {
                if (error) {
                    console.log("mailchimp:error", error)
                }
                // ignore if fails to add to mailchimp
            })
        }

        sendContactMessage(message, function(err, email) {
            if (err) {
                errors.emailNotSend(req, res)
                return res.json({
                    error: err
                })
            } else {
                res.status(200).json(email)
            }
        })
    })
})

router.post("/ideas", function(req, res) {
    // TODO: sanitize...
    const message = req.body.message
    const sender = "Ferreiro Post Idea"
    const subject = "🚀 Ferreiro.me - New Post idea"

    sendMessage({ message, sender, subject }, (error, email) => {
        if (error) {
            return res.json({ error })
        }
        res.status(200).json(email)
    })
})

router.post("/subscribe", function(req, res) {
    const name = req.body.__name || ""
    const email = req.body.__email || null

    addUserToMailchimp(name, email, err => {
        if (err) {
            return res.json({
                error: err.detail
            })
        }
        return res.json({
            success: "Subscribed! Thanks so much"
        })
    })
})

function addUserToMailchimp(name, email, next) {
    name = "".concat(name.replace(/\b\w/g, l => l.toUpperCase())) // first letter in uppercase
    mailchimp.post(
        {
            path: "/lists/3b63288535/members",
            body: {
                merge_fields: {
                    FNAME: name
                },
                email_address: email,
                status: "subscribed"
            }
        },
        err => {
            if (err) {
                return next(err)
            } // we coudln't add user to machilp
            return next()
        }
    )
}

module.exports = router
