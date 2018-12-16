import {createViewPath} from '../create-view-path'

const content = require('../../content/english.json') // TODO: Add multilanguage

export const getStats = (req, res) => (
    res.render(createViewPath('stats', 'stats.pug'), {
        title: 'App statistics',
        path: 'stats',
        content: content.stats
    })
)
