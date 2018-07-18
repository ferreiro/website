const express = require('express')
const router = express.Router()

const utils = require('../../../web/routes/admin/utils')
const seriesRepository = require('../../../web/repository/series')

/**
 * @api get /blog/series - Retrieves the list of series (published and unpublished)
 * @required authentication
 */
router.get('/series', utils.isAuthenticated, function (req, res) {
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
