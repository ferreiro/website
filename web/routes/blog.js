const sanitizeHtml = require('sanitize-html')
const marked = require('marked')
const express = require('express')
const router = express.Router()

const blogRepository = require('../repository/blog')
const blog = require('../content/english/blog.json')

router.get('/', getBlogHomepage)
router.get('/:permalink', getPostByPermalink)

module.exports = router

// Inner Functions to handle routes
function getBlogHomepage (req, res, next) {
  var admin = (req.user ? true : false)
  var locals = {
    title: 'Jorge Ferreiro Blog',
    path: 'blog',
    config: blog.config,
    admin: admin,
    posts: []
  }

  blogRepository.getAllPublished().then(posts => {
    locals.posts = posts
    res.render('blog', locals)
  }).catch(err => {
    locals.err = err
    res.render('blog', locals)
  })
}

/**
 * Returns a post entry if it's visible and published
 */
function getPostByPermalink (req, res, next) {
  const admin = (req.user ? true : false)
  const locals = {
    title: 'Blog',
    path: 'blog',
    admin: admin,
    config: blog.config
  }

  const postPermalink = req.params.permalink || ''
  blogRepository.findByPermalink({
    permalink: postPermalink,
    limit: 3
  }).then((post) => {
    if (post.published || req.user) {
      post.html = markdownToHtml(post.body)
      locals.post = post

      // Get related posts
      return blogRepository.getRandomPosts({
        postPermalinkToSkip: postPermalink,
        count: 4
      }).then(posts => {
        locals.relatedPosts = posts
        return res.render('blog_post', locals)
      }).catch(err => {
        locals.relatedPosts = []
        return res.render('blog_post', locals)
      })
    } else {
      locals.error = 'Post does not exist or you dont have permissions to view.'
      res.render('blog_post', locals)
    }
  }).catch(error => {
    locals.error = error
    return res.render('blog_post', locals)
  })
}

function markdownToHtml (srcMarkdown) {
  const htmlBody = marked(srcMarkdown)
  const sanitizedHtml = htmlBody /// sanitizeHtml(htmlBody)
  return sanitizedHtml
}
