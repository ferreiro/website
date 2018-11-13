import express from 'express'
import {
	getBlogPosts,
	getBlogSeries,
	getSingleBlogSeries,
	getPostByPermalink,
} from './blog.controller'

const router = express.Router()

router.get('/', getBlogPosts)
router.get('/series', getBlogSeries)
router.get('/series/:permalink', getSingleBlogSeries)
router.get('/category/:category', getBlogPosts)
router.get('/:permalink', getPostByPermalink)

module.exports = router
