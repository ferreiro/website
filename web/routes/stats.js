const express = require('express')
const router = express.Router()

const content = require('../content/english.json') // TODO: Add multilanguage

router.get('/', function (req, res, next) {
  res.render('stats', {
    title: 'App statistics',
    path: 'stats',
    content: content.stats
  })
})

module.exports = router
