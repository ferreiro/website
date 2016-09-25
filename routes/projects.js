var express = require('express')
var content = require('../public/content/english.json') // TODO: Add multilanguage
var router = express.Router()

var title = 'Portfolio'

router.get('/projects', function(req, res) {
  res.render('projects', {
    title: 'Portfolio',
    filtered: false, /* If projects are filtered by some category */
    path: 'projects',
    content: content.projects
  })
})

router.get('/projects/:category', function(req, res) {
  var category = req.params.category
  var title = category + ' projects'
  var projects = content.projects

  projects.list = (projects.list).filter(function(project) {
    var projectCategories = project.type
    var projectHasCategory = projectCategories.indexOf(category)
    return projectHasCategory >= 0
  })

  res.render('projects', {
    title: 'Portfolio',
    filtered: true,
    filtered_by: category,
    path: 'projects',
    content: projects
  })
})

module.exports = router
