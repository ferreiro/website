const debug = require('debug')
const timestamp = require('unix-timestamp')
const validator = require('validator')
const sanitizeHtml = require('sanitize-html')
const marked = require('marked')
const express = require('express')
const router = express.Router()

const MAX_PAGE_POSTS = 9
const blogRepository = require('../repository/blog')
const blog = require('../content/english/blog.json')

router.get('/', getBlogPosts)
router.get('/:permalink', getPostByPermalink)

module.exports = router

function getBlogContext (req) {
  const admin = (req.user ? true : false)
  return {
    title: 'Jorge Ferreiro Blog',
    path: 'blog',
    config: blog.config,
    admin: admin,
    posts: []
  }
}

// Inner Functions to handle routes
function getBlogPosts (req, res, next) {
  var nextPage = null
  if (req.query.next && validator.isInt(req.query.next)) {
    const nextPageNum = parseInt(req.query.next)
    nextPage = nextPageNum < 0 ? 1 : nextPageNum
  }

  const opts = {
    maxPagePosts: MAX_PAGE_POSTS,
    nextPage: nextPage
  }
  let blogContext = getBlogContext(req)
  blogRepository.getAllPublished(opts)
    .then(result => {
      blogContext.posts = result.docs
      blogContext.prevPageToken = (result.page - 1 >= 1 ? result.page : 'start') // getNextPageTokenFromPosts(posts)
      blogContext.nextPageToken = (result.page + 1 <= result.pages ? result.page + 1 : 'end') // getNextPageTokenFromPosts(posts)
      return res.render('blog', blogContext)
    })
    .catch(error => {
      blogContext.error = error
      return res.render('blog', blogContext)
    })
}

/**
 * Returns a post entry if it's visible and published
 */
function getPostByPermalink (req, res, next) {
  let blogContext = getBlogContext(req)

  var postPermalink = null
  if (req.params.permalink) {
    postPermalink = validator.blacklist(req.params.permalink,
      "<|>|&|\'|\"|'|,|/|")
  } else {
    blogContext.error = 'Post not found or invalid url'
    return res.render('blog_post', blogContext)
  }

  const query = {
    permalink: postPermalink
  }

  blogRepository.findByPermalink(query).then((post) => {
    if (post.published || req.user) {
      blogContext.post = post
      blogContext.post.html = markdownToHtml(post.body)

      generateRelatedPosts({
        permalinkToSkip: postPermalink,
        count: 3
      }, (relatedPosts) => {
        blogContext.relatedPosts = relatedPosts
        return res.render('blog_post', blogContext)
      })
    } else {
      blogContext.error = 'Post does not exist or you dont have permissions to view.'
      res.render('blog_post', blogContext)
    }
  }).catch(error => {
    blogContext.error = error
    return res.render('blog_post', blogContext)
  })
}

function markdownToHtml (srcMarkdown) {
  const htmlBody = marked(srcMarkdown)
  const sanitizedHtml = htmlBody /// sanitizeHtml(htmlBody)
  return sanitizedHtml
}


function generateRelatedPosts (opts, next) {
  blogRepository
    .getRandomPosts(opts)
    .then(relatedPosts => {
      return next(relatedPosts)
    })
    .catch(error => {
      // Ignore Error: just return empty list of posts.
      return next([])
    })
}
