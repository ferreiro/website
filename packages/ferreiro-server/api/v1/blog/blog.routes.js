const express = require('express')
const router = express.Router()

import {isAuthenticated} from '../../../web/pages/admin/is-authenticated'
import seriesRepository from '../../../api/repository/series'
import blogRepository from '../../../api/repository/blog'

// TODO: Refactor and create specific methods
const createBlogListJsonResponse = (posts) => ({
  title: 'Blog',
  intro: 'A blog by Jorge Ferreiro about Web Development, Career growth and life adventures.',
  posts,
})

/**
 * @api get /blog/series - Retrieves the list of series (published and unpublished)
 * @required authentication
 */
router.get('/list', function (req, res) {
  blogRepository.getAllPublished()
      .then((posts) => (
        res.json(
          createBlogListJsonResponse(posts.docs)
        )
      ))
      .catch(err => res.send(err))
})


/**
 * @api get /blog/series - Retrieves the list of series (published and unpublished)
 * @required authentication
 */
router.get('/series', isAuthenticated, function (req, res) {
  seriesRepository.getAll()
      .then(series => res.json(series))
      .catch(err => res.send(err))
})

/**
 * @api get /blog/series/published - Retrieves the list of published series.
 * It doesn't require authentication
 */
router.get('/series/published', function (req, res) {
  seriesRepository.getAllPublished()
      .then(series => res.json(series))
      .catch(err => res.send(err))
})

/**
 * @api get /blog/series/:permalink - Retrieves the serie metadata and also the
 * list of articles associated with that series.
 */
router.get('/series/:permalink', function (req, res) {
  const query = {
    permalink: req.params.permalink
  }

  seriesRepository.findByPermalink(query)
      .then(series => res.json(series))
      .catch(err => res.send(err))
})

module.exports = router
