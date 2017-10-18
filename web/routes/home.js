const express = require('express')
const router = express.Router()

const content = require('../content/english.json') // TODO: Add multilanguage

router.get('/', function (req, res, next) {
  const viewTemplateName = req.query.v1 ? 'home' : 'home_v2'
  const homeContext = {
    title: '',
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
})

module.exports = router
