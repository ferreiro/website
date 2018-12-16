import {createViewPath} from '../create-view-path'

const content = require('../../content/english/contact.json')

export const getNewsletter = (req, res) => (
    res.render(createViewPath('newsletter', 'newsletter.pug'), {
        title: 'Newsletter - Jorge Ferreiro',
        path: 'newsletter',
        newsletter: true,
        content: content,
        redirect: req.query.redirect
    })
)
