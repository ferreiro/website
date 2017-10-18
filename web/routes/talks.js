const express = require('express')
const router = express.Router()

const talks = require('../content/english/talks.json')

router.get('/', getTalks)

module.exports = router

function getTalks (req, res, next) {
  res.render('talks', {
    title: 'Talks and Workshops',
    image: 'https://www.ferreiro.me/images/talks/jorge_ferreiro_speaker_talks_workshops.jpg',
    path: 'talks',
    config: talks.config,
    pastTalks: talks.pastTalks
  })
}