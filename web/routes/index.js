const fs = require('fs')
const express = require('express')
const router = express.Router()

const content = require('../content/english.json') // TODO: Add multilanguage
const blogRepository = require('../repository/blog')

// Mounting more subroutes.
const projects = require('./projects')
const talks = require('./talks')
const social = require('./social')
const contact = require('./contact')
const newsletter = require('./newsletter')

const projectsRedirect = function (req, res) {
  res.redirect('/portfolio') // leave this, backwards compatibility
}
const feedbackRedirect = function (req, res) {
  res.redirect('/contact/feedback')
}

router.get('/', home) // Home shows about page
router.get('/coming', (req, res) => { res.render('comingSoon') }) // Home shows about page
router.use('/about', require('./about'))
router.use('/blog', require('./blog'))
router.use('/portfolio', projects)
router.get('/projects', projectsRedirect)
router.use('/talks', talks)
router.use('/newsletter', newsletter)
router.use('/contact', contact)
router.use('/feedback', feedbackRedirect)
router.use('/social', social)
router.use('/admin', require('./admin'))
router.get('/stats', stats)
router.get('/university', university)
router.get('/resume/jorge_ferreiro_resume.pdf', resume)

module.exports = router

// FUNCTIONS
function home (req, res, next) {
  const viewTemplateName = req.query.v1 ? 'home' : 'home_v2'
  const homeContext = {
    title: 'Home',
    path: 'home',
    content: content.about,
    recentPosts: []
  }

  // Get related posts
  return blogRepository.getMostRecentPosts({
    count: 3
  }).then(posts => {
    homeContext.recentPosts = posts
    res.render(viewTemplateName, homeContext)
  }).catch(error => {
    homeContext.error = error
    res.render(viewTemplateName, homeContext)
  })
}

function stats (req, res, next) {
  res.render('stats', {
    title: 'App statistics',
    path: 'stats',
    content: content.stats
  })
}

function university (req, res, next) {
  res.render('university', {
    title: 'University curriculum',
    path: 'university',
    content: content.university
  })
}

function resume (req, res, next) {
  var filePath = __dirname + '/../public/dst/pdf/13_july_2017_final.pdf'

  if (req.query.download) {
    return res.download(filePath)
  }

  renderResume(filePath, res)
}

function renderResume (filePath, res) {
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

