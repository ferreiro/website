import {cloneDeep} from 'lodash'
import {createViewPath} from '../create-view-path'
import {isReactEnabled} from '../is-react-enabled'

const contactContent = require('../../content/english/contact.json')
const feedbackContent = require('../../content/english/feedback.json')

export const getContact = (req, res) => {
    if (isReactEnabled(req)) {
        return res.render(createViewPath('contact', 'contact.react.pug'), {
            title: 'Contact - Jorge Ferreiro',
            headline: 'Contact me',
            path: 'contact',
            content: contactContent,
            redirect: req.query.redirect
        })  
    }

    res.render(createViewPath('contact', 'contact.pug'), {
        title: 'Contact - Jorge Ferreiro',
        headline: 'Contact me',
        path: 'contact',
        content: contactContent,
        redirect: req.query.redirect
    })
}

export const getContactTalk = (req, res) => {
    let talkContact = cloneDeep(contactContent)
    talkContact.config.claim = "Are you organizing an event and want me to talk? I'll be happy to be part of it! Submit the form below or shoot me an email at (<a class='email openModalBox'>jorge at ferreiro dot me</a>)."
    talkContact.sendButton = "Submit proposal"
    talkContact.form.message = "What's your event about and when is it?"

    return res.render(createViewPath('contact', 'contact.pug'), {
        title: 'Bring me to your event',
        content: talkContact,
        path: 'contact/talks',
        redirect: req.query.redirect
    })
}

export const getContactFeedback = (req, res) => (
    res.render(createViewPath('contact', 'feedback.pug'), {
        title: 'Feeback',
        path: 'contact/feedback',
        content: feedbackContent,
        redirect: req.query.redirect
    })
)
