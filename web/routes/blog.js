const marked = require('marked')
const sanitizeHtml = require('sanitize-html')
const validator = require('validator')
const express = require('express')
const router = express.Router()

const MAX_PAGE_POSTS = 9
const blogRepository = require('../repository/blog')
const blog = require('../content/english/blog.json')

router.get('/', getBlogPosts)
router.get('/:permalink', getPostByPermalink)
router.get('/category/:category', getBlogPosts)

module.exports = router

/**
 * Returns a context object with data to feed the views.
 * This object can be updated before return it to view.
 */
function getBlogContext (req) {
  const disableAdmin = req.query.disableAdmin
  return {
    title: 'Jorge Ferreiro Blog',
    path: 'blog',
    blogCategory: 'all',
    config: blog.config,
    admin: req.user && !disableAdmin ? true : false,
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

  fetchPosts (query, opts, (error, result) => {
    if (error) {
      return next(new Error(error))
    }

    let blogContext = getBlogContext(req)
    blogContext.posts = result.docs
    blogContext.prevPageToken = (result.page - 1 >= 1 ? result.page - 1 : 'start') // getNextPageTokenFromPosts(posts)
    blogContext.nextPageToken = (result.page + 1 <= result.pages ? result.page + 1 : 'end') // getNextPageTokenFromPosts(posts)
    blogContext.blogCategory = category ? category : blogContext.blogCategory

    return res.render('blog', blogContext)
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
    return res.render('blogPost', blogContext)
  }

  const query = {
    permalink: postPermalink
  }
  blogRepository
    .findByPermalinkIncrementViews(query)
    .then(post => {
      if (!post) {
        blogContext.error = 'Post does not exist or you dont have permissions to view.'
        return res.render('blogPost', blogContext)
      }
      if (post.published || req.user) {
        generateRelatedPosts({
          permalinkToSkip: postPermalink,
          count: 3
        }).then(relatedPosts => {
          blogContext.post = post
          blogContext.post.html = markdownToHtml(post.body)  
          blogContext.relatedPosts = relatedPosts
          return res.render('blogPost', blogContext)
        })
      } else {
        return next(new Error('Post does not exist or you dont have permissions to view.'))
      }
    })
    .catch(error => {
      blogContext.error = error
      return res.render('blogPost', blogContext)
    })
}

function markdownToHtml (srcMarkdown) {
  const htmlBody = marked(srcMarkdown)
  const sanitizedHtml = sanitizeHtml(htmlBody, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
      'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
      'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre',
      'img'
    ],
    allowedAttributes: {
      '*': [ 'id', 'href', 'align', 'alt', 'center', 'bgcolor' ],
      div: [ 'class' ],
      a: [ 'href', 'name', 'target' ],
      img: [ 'src' , 'style' ],
      h1: [ 'id' ],
      h2: [ 'id' ]
    }
  })
  return sanitizedHtml
}

function generateRelatedPosts (opts) {
  return new Promise (resolve => {
    return blogRepository
      .getRandomPosts(opts)
      .then(posts => resolve(posts))
      .catch(posts => resolve([]))
  })
}
