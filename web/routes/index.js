const express = require('express')
const router = express.Router()

const content = require('../content/english.json') // TODO: Add multilanguage

const admin = require('./admin')
const about = require('../about.routes')
const home = require('../home.routes')
const blog = require('../blog.routes')
const stats = require('./stats')
const talks = require('./talks')
const social = require('./social')
const resume = require('./resume')
const contact = require('./contact')
const projects = require('./projects')
const newsletter = require('./newsletter')
const university = require('./university')

const comingSoon = function (req, res) {
  res.render('comingSoon')
}

const projectsRedirect = function (req, res) {
  res.redirect('/portfolio') // leave this, backwards compatibility
}

const feedbackRedirect = function (req, res) {
  res.redirect('/contact/feedback')
}

// Mounting more subroutes.

router.get('/', home) // Home shows about page
router.get('/coming', comingSoon) // Home shows about page
router.use('/about', about)
router.use('/blog', blog)
router.use('/portfolio', projects)
router.get('/projects', projectsRedirect)
router.use('/talks', talks)
router.use('/newsletter', newsletter)
router.use('/contact', contact)
router.get('/feedback', feedbackRedirect)
router.use('/social', social)
router.use('/admin', admin)
router.use('/stats', stats)
router.use('/university', university)
router.use('/resume/jorge_ferreiro_resume.pdf', resume)

module.exports = router
