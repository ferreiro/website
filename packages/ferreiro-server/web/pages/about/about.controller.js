import {createViewPath} from '../create-view-path'
import {isReactEnabled} from '../is-react-enabled'

const about = require('../../content/english/about.json')
const experience = require('../../content/english/experience.json')

export const getAboutPage = (req, res, next) => {
  if (isReactEnabled(req, process.env)) {
    return res.render(createViewPath('about', 'about.react.pug'), {
      path: 'about',
      title: 'About - Jorge Ferreiro',
      headline: 'About',
      image: 'https://www.ferreiro.me/images/talks/jorge_ferreiro_speaker_talks_workshops.jpg',
    })
  }

  const {
    bio,
    work,
    skills,
    education
  } = about;

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