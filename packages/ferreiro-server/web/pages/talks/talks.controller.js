import {createViewPath} from '../create-view-path'

const talks = require('../../content/english/talks.json')

export const getTalks = (req, res) => (
    res.render(createViewPath('talks', 'talks.pug'), {
        path: 'talks',
        title: 'Talks and Workshops - Jorge Ferreiro',
        headline: 'Talks and Workshops',
        image: 'https://www.ferreiro.me/images/talks/jorge_ferreiro_speaker_talks_workshops.jpg',
        config: talks.config,
        pastTalks: talks.pastTalks
    })
)

export const getTalksTestimonials = (req, res) => (
    res.render(createViewPath('talks', 'talksTestimonials.pug'), {
        path: 'talks',
        title: 'Talks and Workshops - Jorge Ferreiro',
        headline: 'Talks and Workshops',
        image: 'https://www.ferreiro.me/images/talks/jorge_ferreiro_speaker_talks_workshops.jpg',
        config: talks.config,
        pastTalks: talks.pastTalks
    })
) 