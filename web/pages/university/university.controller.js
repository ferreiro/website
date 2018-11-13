import {createViewPath} from '../create-view-path'

const content = require('../../content/english.json') // TODO: Add multilanguage

export const getUniversity = (req, res) => (
    res.render(createViewPath('university', 'university.pug'), {
        title: 'University curriculum',
        path: 'university',
        content: content.university
    })
)
