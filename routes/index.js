var express = require('express')
var content = require('../public/content/english.json') // TODO: Add multilanguage
var router = express.Router()

router.get('/', home) // Home shows about page
router.get('/about', about)
router.get('/university', university)
router.get('/stats', stats)

module.exports = router;

// FUNCTIONS

function home(req, res, next) {
  res.render('home', {
    title: 'Home',
    path: 'featured',
    content: content.about
  });
}

function about(req, res, next) {
  res.render('about', {
    title: 'About me',
    path: 'about',
    content: content.about
  });
}

function university(req, res, next) {
  res.render('university', {
    title: 'University curriculum',
    path: 'university',
    content: content.university
  });
}

function stats(req, res, next) {
  res.render('stats', {
    title: 'App statistics',
    path: 'stats',
    content: content.stats
  });
}
