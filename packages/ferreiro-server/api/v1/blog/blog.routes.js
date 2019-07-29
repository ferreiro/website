const express = require('express')
const router = express.Router()
import validator from 'validator'
import merge from 'deepmerge'
import isEmpty from 'lodash/isEmpty'

import {markdownToHtml} from "../../markdown-to-html";
import {isAuthenticated} from '../../../web/pages/admin/is-authenticated'
import seriesRepository from '../../../api/repository/series'
import blogRepository from '../../../api/repository/blog'
import {generateRelatedPosts} from "./generate-related-posts";

// TODO: Refactor and create specific response methods
const createBlogListJsonResponse = (posts) => ({
  title: 'Blog',
  intro: 'A blog by Jorge Ferreiro about Web Development, Career growth and life adventures.',
  posts,
})

// TODO: Move to a const file or something like that
const ERROR_NOT_POST_FOUND = {
    error: true,
    message: 'Not post found or you do not have permissions to see it'
}

const getJsonResponse = (data, extraDataProps, filterKeys = []) => {
    const dataWithExtraProps = merge(data, extraDataProps)

    return dataWithExtraProps
}

/**
 * @api get /blog/series - Retrieves the list of series (published and unpublished)
 * @required authentication
 */
router.get('/list', function (req, res) {
  // TODO: sanitize the req.body
  const opts = {
    maxPagePosts: req.body.postsCount
  }

  return blogRepository.getAllPublished({}, opts)
      .then((posts) => (
        res.json(
          createBlogListJsonResponse(posts.docs)
        )
      ))
      .catch(err => res.send(err))
})

router.get('/post/:permalink', function (req, res) {
  // TODO: Scape XSS on params
  const sanitizedPermalink = validator.blacklist(req.params.permalink, "<|>|&|\'|\"|'|,|/|")
  const query = {
    permalink: sanitizedPermalink
  }

  blogRepository
    .findByPermalinkIncrementViews(query)
    .then((response = {}) => {
        const post = response._doc

        // TODO: Also check if the user has permissions to see the post
        // like: if is published or securityKey matched. If the post
        // is only be visible by the admin, but not user. Then return
        // not found.

        if (isEmpty(post)) {
          return res.json(ERROR_NOT_POST_FOUND)
        }

        const extraReponseProps = {
            "html": markdownToHtml(post.body),
        }
        const filterOutKeys = ['body', 'html']

        const jsonResponse = getJsonResponse(post, extraReponseProps, filterOutKeys)

        return res.json(jsonResponse)
    })
    .catch(err => res.send(err))
})

// TODO: Protect this endpoint for bad users...
router.get('/post/:permalink/related', function (req, res) {
  // TODO: Scape XSS on params
  const sanitizedPermalink = validator.blacklist(req.params.permalink, "<|>|&|\'|\"|'|,|/|")

  return generateRelatedPosts({
    permalinkToSkip: sanitizedPermalink,
    count: 3
  }).then((relatedPosts) => (
    res.json({
      relatedPosts: relatedPosts
    })
  )).catch((error) => (
    res.json({error})
  ))
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
