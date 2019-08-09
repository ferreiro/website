import {createViewPath} from '../create-view-path'

const about = require('../../content/english/about.json')
const experience = require('../../content/english/experience.json')

export const getAboutPage = (_, res) => {
    const {
        bio,
        work,
        skills,
        education
    } = about

    res.render(createViewPath('about', 'about.pug'), {
        title: 'About me - Jorge Ferreiro - Biography',
        path: 'about',
        bio,
        work,
        skills,
        education,
        experience,
    })
}