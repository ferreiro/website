const about = require('../content/english/about.json')
const experience = require('../content/english/experience.json')

export const getAboutPage = (req, res, next) => {
  const bio = about.bio
  const work = about.work
  const skills = about.skills
  const education = about.education

  res.render('about', {
    title: 'About me - Jorge Ferreiro - Biography',
    path: 'about',
    bio,
    work,
    skills,
    education,
    experience,
  })
}