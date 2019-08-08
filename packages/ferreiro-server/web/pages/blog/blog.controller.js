import validator from 'validator'
import {isEmpty} from 'lodash'

import blogRepository from '../../../api/repository/blog'
import seriesRepository from '../../../api/repository/series'
import {getCategories} from '../../../api/repository/categories'
import {createViewPath} from '../create-view-path'
import {markdownToHtml} from './markdown-to-html'

import {MAX_PAGE_POSTS} from './constants'
import blog from '../../content/english/blog.json'

/**
 * Returns a context object with data to feed the views.
 * This object can be updated before return it to view.
 */
export const getBlogContext = (req) => {
    const disableAdmin = req.query.disableAdmin

    return {
        title: 'Blog - Jorge Ferreiro',
        description: 'Personal blog written by Jorge Ferreiro about software engineering, product management, and entrepreneurship.',
        path: 'blog',
        blogCategory: 'all',
        config: blog.config,
        admin: !!(req.user && !disableAdmin),
        posts: [],
        categories: [],
    }
}

const createBlogContextBuilder = (req) => {
    let defaultContext = {
        title: 'Blog - Jorge Ferreiro',
        description: 'Personal blog written by Jorge Ferreiro about software engineering, product management, and entrepreneurship.',
        path: 'blog',
        blogCategory: 'all',
        config: blog.config,
        admin: false,
        posts: [],
        categories: [],
    }

    class BlogContextBuilder {
        constructor(req) {
            const disableAdmin = req.query.disableAdmin

            defaultContext.admin = !!(req.user && !disableAdmin)
        }

        get(key) {
            return defaultContext[key]
        }

        with(key, value) {
            if (!isEmpty(value)) {
                defaultContext[key] = value
            }
            return this
        }

        withNested(key1, key2, value) {
            if (!isEmpty(value)) {
                defaultContext[key1][key2] = value
            }
            return this
        }

        build() {
            return defaultContext
        }
    }

    return new BlogContextBuilder(req)
}

/**
 * Fetches and shows a list of posts.
 * This method can also filter by
 * categories (optional argument)
 * @param {*=} req.params.category - You can provide a post category to query
 */
export const getBlogPosts = (req, res, next) => {
    const {category} = req.params

    if (category && category.length === 0) {
        return next(new Error('No valid category'))
    }

    const fetchPostsPromise = new Promise((resolve, reject) => {
        const opts = getBlogPostsOptions(req)
        const query = isEmpty(category) ? {} : {category} 
  
        fetchPosts(query, opts, (error, result) => {
            if (error) {
                return reject(error)
            }
            return resolve(result)
        })
    })
    const fetchBlogCategoriesPromise = getCategories()
    const fetchBlogSeriesPromise = seriesRepository.getAllPublished()
  
    Promise.all([
        fetchPostsPromise,
        fetchBlogCategoriesPromise,
        fetchBlogSeriesPromise,
    ]).then(function(values) {
        const [postsResult, categories, series] = values
        const {docs, page, pages} = postsResult

        const blogContext =
      createBlogContextBuilder(req)
          .with('posts', docs)
          .with('prevPageToken', (page - 1 >= 1 ? page - 1 : 'start'))
          .with('nextPageToken', (page + 1 <= pages ? page + 1 : 'end'))
          .with('blogCategory', category)
          .with('categories', categories)
          .with('series', series)
          .build()

        return res.render(createViewPath('blog', 'blog.home.pug'), blogContext)
    }).catch((error) => {
        return next(error)
    })
}

export const getBlogSeries = (req, res, next) => {
    seriesRepository.getAllPublished()
        .then(publishedSeries => {
            let blogContext = getBlogContext(req)
            blogContext.series = publishedSeries

            return res.render(
                createViewPath('blog', 'blog.series.home.pug'),
                blogContext,
            )
        })
        .catch(error => next(error))
}

export const getSingleBlogSeries = (req, res, next) => {
    seriesRepository.findByPermalink({ permalink: req.params.permalink })
        .then(singleSeries => {
            let blogContext = getBlogContext(req)
            blogContext.series = singleSeries

            return res.render(
                createViewPath('blog', 'blog.series.detailPage.pug'),
                blogContext,
            )
        })
        .catch(error => next(error))
}

/**
 * Finds and returns a blog post if is valid
 * and the user has the right credentials.
 */
export const getPostByPermalink = (req, res, next) => {
    const blogContext = createBlogContextBuilder(req)

    const {permalink} = req.params

    if (isEmpty(permalink)) {
        blogContext.with('blogCategory', '')
        blogContext.with('error', 'Post not found or invalid url')

        return res.render(
            createViewPath('blog', 'blog.post.pug'),
            blogContext.build()
        )
    }

    const sanitizedPermalink =
    validator.blacklist(permalink, '<|>|&|\'|"|\'|,|/|')

    const query = {
        isAdmin: blogContext.get('admin'),
        permalink: sanitizedPermalink
    }

    blogRepository
        .findByPermalinkIncrementViews(query)
        .then((post) => {
            if (isEmpty(post)) {
                blogContext.with('blogCategory', '') // no menu selected
                blogContext.with('error', 'Post does not exist or you dont have permissions to view.')
        
                return res.render(
                    createViewPath('blog', 'blog.post.pug'),
                    blogContext.build()
                )
            }

            const isPostVisible =
        post.published
        || isValidSecretKey(req.query.secretKey, post.secretKey)
        || (isValidUser(req) && blogContext.get('admin'))

            if (isPostVisible) {
                generateRelatedPosts({
                    permalinkToSkip: sanitizedPermalink,
                    count: 3
                }).then(relatedPosts => {
                    post.html = markdownToHtml(post.body)

                    blogContext.with('post', post)
                    blogContext.with('relatedPosts', relatedPosts)

                  
                    return res.render(
                        createViewPath('blog', 'blog.post.pug'),
                        blogContext.build()
                    )
                })
            } else {
                return next(new Error('Post does not exist or you dont have permissions to view.'))
            }
        })
        .catch(error => {
            blogContext.with('error', error)
             
            return res.render(
                createViewPath('blog', 'blog.post.pug'),
                blogContext.build()
            )
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

// function isInvalidUser (req) {
//     return !req.user
// }

function isValidUser (req) {
    return !isEmpty(req.user)
}

function isValidSecretKey (srcSecretKey, validSecretKey) {
    if (isEmpty(srcSecretKey) || isEmpty(validSecretKey)) {
        return false
    }
    return srcSecretKey === validSecretKey
}

function generateRelatedPosts (opts) {
    return new Promise((resolve) => {
        return blogRepository
            .getRandomPosts(opts)
            .then(posts => resolve(posts))
            .catch(() => resolve([]))
    })
}
