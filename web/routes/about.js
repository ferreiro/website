const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  const about = require('../content/english/about.json')

  const education = about.education
  const work = about.work
  const skills = about.skills

  res.render('about', {
    title: 'About Jorge Ferreiro',
    path: 'about',
    skills: skills,
    education: education,
    work: work
  })
})

module.exports = router
