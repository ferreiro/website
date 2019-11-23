const express = require("express")
const router = express.Router()

import { isAuthenticated } from "../../../web/pages/admin/is-authenticated"
import seriesRepository from "../../../api/repository/series"
import blogRepository from "../../../api/repository/blog"

/**
 * @api get /blog/ - Retrieves the list of series (published and unpublished)
 * @required authentication
 */
router.get("/", function(req, res) {
    return blogRepository
        .getAllPublished()
        .then(paginatedResponse => res.json(paginatedResponse))
        .catch(err => res.json(err))
})

/**
 * @api get /blog/ - Retrieves the top most read posts (published)
 * @required authentication
 */
router.get("/featured", function(req, res) {
    // TODO: Sanitize  query param
    const limit = (req.query.limit && parseInt(req.query.limit)) || 10

    return blogRepository
        .getMostReadPosts({
            limit
        })
        .then(response => res.json(response))
        .catch(err => res.json(err))
})

router.get("/:permalink", function(req, res) {
    // TODO: sanitize permalink
    const permalink = req.params.permalink

    return blogRepository
        .findByPermalinkIncrementViews({
            permalink
        })
        .then(paginatedResponse => res.json(paginatedResponse))
        .catch(err => res.json(err))
})

/**
 * @api get /blog/series - Retrieves the list of series (published and unpublished)
 * @required authentication
 */
router.get("/series", isAuthenticated, function(req, res) {
    return blogRepoaitory
        .getAll()
        .then(series => res.json(series))
        .catch(err => res.json(err))
})

/**
 * @api get /blog/series/published - Retrieves the list of published series.
 * It doesn't require authentication
 */
router.get("/series/published", function(req, res) {
    return seriesRepository
        .getAllPublished()
        .then(series => res.json(series))
        .catch(err => res.json(err))
})

/**
 * @api get /blog/series/:permalink - Retrieves the serie metadata and also the
 * list of articles associated with that series.
 */
router.get("/series/:permalink", function(req, res) {
    const query = {
        permalink: req.params.permalink
    }

    return seriesRepository
        .findByPermalink(query)
        .then(series => res.json(series))
        .catch(err => res.json(err))
})

module.exports = router
