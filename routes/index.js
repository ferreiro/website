var fs = require('fs')
var express = require('express')
var content = require('../public/content/english.json') // TODO: Add multilanguage
var router = express.Router()

router.get('/', home) // Home shows about page
router.get('/about', about)
router.get('/resume/jorge_ferreiro_resume.pdf', resume)
router.get('/university', university)
router.get('/stats', stats)

module.exports = router

// FUNCTIONS

function home(req, res, next) {
  res.render('home', {
    title: 'Home',
    path: 'featured',
    content: content.about
  })
}

function resume(req, res, next) {
  var filePath = __dirname + '/../public/pdf/13_july_2017_final.pdf'
  fs.readFile(filePath, function (err, data) {
    if (err) {
      return res.render('error', {
        title: 'Sorry. Can\'t load the pdf now...',
        specialMessage: 'There was a problem while loading this pdf. Please, <strong>send me an email</strong> and I\'ll send you the PDF and review the bug: jorge@ferreiro.me',
        error: {}
      })
    }
    res.contentType('application/pdf')
    res.send(data)
  })
} 

function about(req, res, next) {
  res.render('about', {
    title: 'About me',
    path: 'about',
    content: content.about
  })
}

function university(req, res, next) {
  res.render('university', {
    title: 'University curriculum',
    path: 'university',
    content: content.university
  })
}

function stats(req, res, next) {
  res.render('stats', {
    title: 'App statistics',
    path: 'stats',
    content: content.stats
  })
}
