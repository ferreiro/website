const express = require('express')
const router = express.Router()

const talks = require('../content/english/talks.json')

router.get('/', getTalks)

module.exports = router

function getTalks (req, res, next) {
  res.render('talks', {
    title: 'Talks and workshops',
    path: 'talks',
    config: talks.config,
    pastTalks: talks.pastTalks
  })
}