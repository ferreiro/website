import {createViewPath} from '../create-view-path'

// const content = require('../../content/english.json') // TODO: Add multilanguage

export const getGifts = (req, res) => (
    res.render(createViewPath('landings', 'gifts.pug'), {
        title: 'Regalo Codecamp 2019',
        path: 'gifts',
        content: []
    })
)
