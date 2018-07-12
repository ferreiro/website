const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  const about = require('../content/english/about.json')

  const bio = about.bio
  const work = about.work
  const skills = about.skills
  const education = about.education

  res.render('about', {
    title: 'Biography - Jorge Ferreiro',
    path: 'about',
    bio: bio,
    work: work,
    skills: skills,
    education: education
  })
})

module.exports = router
