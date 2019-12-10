const express = require("express")
const router = express.Router()

import validator from "validator"

import blogRepository from "../../repository/blog"
import seriesRepository from "../../repository/series"
import { isAuthenticated } from "../../../web/pages/admin/is-authenticated"
import { MAX_PAGE_POSTS } from "../../../web/pages/blog/constants"
import { generateRelatedPosts } from "./generate-related-posts"

/**
 * @api get /blog/ - Retrieves the list of series (published and unpublished)
 * @required authentication
 */
router.get("/", function(req, res) {
    const extraQueryFields = {}
    const opts = {
        limit: req.query.limit ? parseInt(req.query.limit) : MAX_PAGE_POSTS,

        page: req.query.page && parseInt(req.query.page)
    }

    return blogRepository
        .getAllPublished(extraQueryFields, opts)
        .then(paginatedResponse => res.json(paginatedResponse))
        .catch(err => res.json(err))
})

/**
 * @api get /blog/ - Retrieves the top most read posts (published)
 * @required authentication
 */
router.get("/featured", function(req, res) {
    const defaultLimit = 10
    const sanitizedLimit = validator.blacklist(
        req.query.limit,
        "<|>|&|'|\"|'|,|/|"
    )
    const limit = sanitizedLimit ? parseInt(sanitizedLimit) : defaultLimit

    return blogRepository
        .getMostReadPosts({ limit })
        .then(response => res.json(response))
        .catch(err => {
            console.log("err", err)
            res.json(err)
        })
})

router.get("/:permalink", function(req, res) {
    const permalink = validator.blacklist(
        req.params.permalink,
        "<|>|&|'|\"|'|,|/|"
    )

    return blogRepository
        .findByPermalinkIncrementViews({
            permalink
        })
        .then(paginatedResponse => res.json(paginatedResponse))
        .catch(err => res.json(err))
})

// TODO: Protect this endpoint for bad users...
router.get("/:permalink/related", function(req, res) {
    const permalink = validator.blacklist(
        req.params.permalink,
        "<|>|&|'|\"|'|,|/|"
    )

    return generateRelatedPosts({
        permalinkToSkip: permalink,
        limit: 3
    })
        .then(relatedPosts =>
            res.json({
                relatedPosts: relatedPosts
            })
        )
        .catch(error => res.json({ error }))
})

/**
 * @api get /blog/series - Retrieves the list of series (published and unpublished)
 * @required authentication
 */
router.get("/series", isAuthenticated, function(req, res) {
    return blogRepository
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
    const permalink = validator.blacklist(
        req.params.permalink,
        "<|>|&|'|\"|'|,|/|"
    )
    const query = {
        permalink
    }

    return seriesRepository
        .findByPermalink(query)
        .then(series => res.json(series))
        .catch(err => res.json(err))
})

module.exports = router
