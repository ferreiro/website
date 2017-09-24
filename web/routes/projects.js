var express = require('express')
var router = express.Router()

var projects = require('../content/projects')

router.get('/', function(req, res) {
  res.render('projects', {
    path: 'projects',
    title: 'Portfolio',
    filtered: false, /* If projects are filtered by some category */
    projects: projects
  })
})

router.get('/:category', function(req, res) {
  var category = req.params.category
  var title = category + ' projects'
  var projectsFiltered;

  projectsFiltered = projects.filter(function(project) {
    var projectCategories = project.type
    var projectHasCategory = projectCategories.indexOf(category)
    return projectHasCategory >= 0
  })

  res.render('projects', {
    path: 'projects',
    title: 'Portfolio',
    filtered: true,
    filtered_by: category,
    projects: projectsFiltered
  })
})

module.exports = router
