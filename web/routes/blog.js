const express = require('express')
const router = express.Router()

const blog = require('../content/english/blog.json')

router.get('/', getBlogHomepage)
router.get('/example', getSamplePostPage)

module.exports = router

// Inner Functions to handle routes

function getBlogHomepage (req, res, next) {
  const config = blog.config
  const posts = blog.posts

  res.render('blog', {
    title: 'Blog',
    path: 'blog',
    config: config,
    posts: posts
  })
}

function getSamplePostPage (req, res, next) {
  res.render('blog_entry', {
    title: 'Blog',
    path: 'blog',
    content: content.about
  })
}
