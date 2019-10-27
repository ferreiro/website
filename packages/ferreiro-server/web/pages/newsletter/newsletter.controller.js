import {createViewPath} from '../create-view-path'
import {isReactEnabled} from '../is-react-enabled'

const content = require('../../content/english/contact.json')

export const getNewsletter = (req, res) => {
    if (isReactEnabled(req)) {
        return res.render(createViewPath('newsletter', 'blog.react.pug'), {
            path: 'newsletter',
            admin: isAuthorizedAdmin(req)
        })
    }

    return res.render(createViewPath('newsletter', 'newsletter.pug'), {
        title: 'Newsletter - Jorge Ferreiro',
        path: 'newsletter',
        newsletter: true,
        content: content,
        redirect: req.query.redirect
    })
}
