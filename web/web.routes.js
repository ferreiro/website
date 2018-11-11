import express from 'express'

import admin from './pages/admin/admin.routes'
import about from './pages/about/about.routes'
import home from './pages/home/home.routes'
import blog from './pages/blog/blog.routes'
import portfolio from './pages/portfolio/portfolio.routes'
import talks from './pages/talks/talks.routes'
import contact from './pages/contact/contact.routes'

const stats = require('./routes/stats')
const resume = require('./routes/resume')
const newsletter = require('./routes/newsletter')
const university = require('./routes/university')

const router = express.Router()
  
const comingSoon = function (req, res) {
  res.render('comingSoon')
}

const redirectProjectsToPortfolio = (req, res) => {
  res.redirect('/portfolio') // leave this, backwards compatibility
}

const redirectFeedbackToContact = (req, res) => {
  res.redirect('/contact/feedback')
}

// Mounting more subroutes.
router.get('/', home) // Home shows about page
router.get('/coming', comingSoon) // Home shows about page
router.use('/about', about)
router.use('/blog', blog)
router.use('/portfolio', portfolio)
router.get('/projects', redirectProjectsToPortfolio)
router.use('/talks', talks)
router.use('/newsletter', newsletter)
router.use('/contact', contact)
router.get('/feedback', redirectFeedbackToContact)
router.use('/admin', admin)
router.use('/stats', stats)
router.use('/university', university)
router.use('/resume/jorge_ferreiro_resume.pdf', resume)

module.exports = router
