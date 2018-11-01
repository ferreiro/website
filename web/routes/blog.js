const validator = require('validator')
const express = require('express')
const router = express.Router()

const MAX_PAGE_POSTS = 9
const {markdownToHtml} = require('../utils/markdownToHtml')
const blogRepository = require('../repository/blog')
const seriesRepository = require('../repository/series')
const blog = require('../content/english/blog.json')

router.get('/', getBlogPosts)
router.get('/series', getBlogSeries)
router.get('/series/:permalink', getSingleBlogSeries)
router.get('/category/:category', getBlogPosts)
router.get('/:permalink', getPostByPermalink)

module.exports = router

/**
 * Returns a context object with data to feed the views.
 * This object can be updated before return it to view.
 */
function getBlogContext (req) {
  const disableAdmin = req.query.disableAdmin
  return {
    title: 'Blog - Jorge Ferreiro',
    description: 'Personal blog written by Jorge Ferreiro about software engineering, product management, and entrepreneurship.',
    path: 'blog',
    blogCategory: 'all',
    config: blog.config,
    admin: !!(req.user && !disableAdmin),
    posts: []
  }
}

/**
 * Fetches and shows a list of posts.
 * This method can also filter by
 * categories (optional argument)
 * @param {*=} req.params.category - You can provide a post category to query
 */
function getBlogPosts (req, res, next) {
  const opts = getBlogPostsOptions(req)

  let category = req.params.category || null
  if (category && category.length === 0) {
    return next(new Error('No valid category'))
  }

  const query = category ? { category } : {}

  fetchPosts(query, opts, (error, result) => {
    if (error) {
      return next(new Error(error))
    }

    let blogContext = getBlogContext(req)
    blogContext.posts = result.docs
    blogContext.prevPageToken = (result.page - 1 >= 1 ? result.page - 1 : 'start') // getNextPageTokenFromPosts(posts)
    blogContext.nextPageToken = (result.page + 1 <= result.pages ? result.page + 1 : 'end') // getNextPageTokenFromPosts(posts)
    blogContext.blogCategory = category || blogContext.blogCategory

    return res.render('blog/home', blogContext)
  })
}

function getBlogSeries (req, res, next) {
  seriesRepository.getAllPublished()
      .then(publishedSeries => {
        let blogContext = getBlogContext(req)
        blogContext.series = publishedSeries

        return res.render('blog/series/home', blogContext)
      })
      .catch(error => next(error))
}

function getSingleBlogSeries (req, res, next) {
  seriesRepository.findByPermalink({ permalink: req.params.permalink })
      .then(singleSeries => {
        let blogContext = getBlogContext(req)
        blogContext.series = singleSeries

        return res.render('blog/series/detail', blogContext)
      })
      .catch(error => next(error))
}

/**
 * Finds and returns a blog post if is valid
 * and the user has the right credentials.
 */
function getPostByPermalink (req, res, next) {
  let blogContext = getBlogContext(req)
  blogContext.blogCategory = '' // no menu selected

  let postPermalink = null
  if (req.params.permalink) {
    postPermalink = validator.blacklist(
      req.params.permalink, "<|>|&|\'|\"|'|,|/|")
  } else {
    blogContext.error = 'Post not found or invalid url'
    return res.render('blog/post', blogContext)
  }

  const query = {
    isAdmin: blogContext.admin,
    permalink: postPermalink
  }
  blogRepository
    .findByPermalinkIncrementViews(query)
    .then(post => {
      if (!post) {
        blogContext.error = 'Post does not exist or you dont have permissions to view.'
        return res.render('blog/post', blogContext)
      }

      if (post.published || !isInvalidUser(req) || isValidSecretKey(req.query.secretKey, post.secretKey)) {
        generateRelatedPosts({
          permalinkToSkip: postPermalink,
          count: 3
        }).then(relatedPosts => {
          blogContext.post = post
          blogContext.post.html = markdownToHtml(post.body)
          blogContext.relatedPosts = relatedPosts
          return res.render('blog/post', blogContext)
        })
      } else {
        return next(new Error('Post does not exist or you dont have permissions to view.'))
      }
    })
    .catch(error => {
      blogContext.error = error
      return res.render('blog/post', blogContext)
    })
}

/**
 * Generic options object that it's use
 * when fetching results from database.
 */
function getBlogPostsOptions (req) {
  let nextPage = null
  if (req.query.next && validator.isInt(req.query.next)) {
    const nextPageNum = parseInt(req.query.next)
    nextPage = nextPageNum < 0 ? 1 : nextPageNum
  }
  return {
    nextPage,
    maxPagePosts: MAX_PAGE_POSTS
  }
}

/**
 * Makes a call to the database to fetch
 * a list of posts.
 * @param {String=} query.category - (optional) fetches posts from this category
 * @param {String=} opts.maxPagePosts - (optional) limit of results from database
 * @param {String=} opts.nextPage - (optional) Page from database to get results from. (use with pagination)
 * @param {*} callback.error - notifies any error to the caller.
 * @param {*} callback.result - Database generic result (see method in repository)
 */
function fetchPosts (query, opts, callback) {
  blogRepository.getAllPublished(query, opts)
    .then(result => {
      return callback(null, result)
    })
    .catch(error => {
      return callback(error, null)
    })
}

function isInvalidUser (req) {
  return !req.user
}

function isValidSecretKey (srcSecretKey, validSecretKey) {
  if (!srcSecretKey || !validSecretKey) {
    return false
  }
  return srcSecretKey === validSecretKey
}

function generateRelatedPosts (opts) {
  return new Promise(resolve => {
    return blogRepository
      .getRandomPosts(opts)
      .then(posts => resolve(posts))
      .catch(posts => resolve([]))
  })
}
