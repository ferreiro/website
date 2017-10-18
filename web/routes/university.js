const express = require('express')
const router = express.Router()

const content = require('../content/english.json') // TODO: Add multilanguage

router.get('/', function (req, res, next) {
  res.render('university', {
    title: 'University curriculum',
    path: 'university',
    content: content.university
  })
})

module.exports = router
