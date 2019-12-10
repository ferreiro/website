const env = require("../../../env")
const express = require("express")
const router = express.Router()

import merge from "lodash/merge"
import fetch from "isomorphic-unfetch"
import validator from "validator"
import { formatUrl } from "url-lib"

import cache from "../../../setup/setupCache"

const GOOGLE_API_KEY = env.GOOGLE_API_KEY
const GOOGLE_API_SEARCH = "https://www.googleapis.com/youtube/v3/search"
const GOOGLE_API_PLAYLIST =
    "https://www.googleapis.com/youtube/v3/playlistItems"
const PLAYLIST_CONFERENCES_ENGLISH_ID = "PLaN1b7vXPDt4TSlAPzqWsoJ4i46zst6ek"
const PLAYLIST_CONFERENCES_SPANISH_ID = "PLaN1b7vXPDt7QI4rcBZQ5TU0W3vzxhAnN"
const CHANNEL_ID = "UCA2Z3mQUqOj80M84vRu-3AQ"
const MAX_RESULTS = 30
const ORDER_BY_DATE = "date"
const TYPE_VIDEO = "video"

/**
 * @api get /blog/ - Retrieves the list of series (published and unpublished)
 * @required authentication
 */
router.get("/", cache.get, fetchVideos, cache.set, responseHandler)
router.get("/talks", cache.get, fetchTalks, cache.set, responseHandler)

// NB: Creates a JSON response
function responseHandler(_, res) {
    if (res.locals.errors) {
        return res.status(401).json({
            error: res.locals.errors
        })
    }

    return res.status(200).json(res.locals.data)
}

function fetchVideos(req, res, next) {
    const query = validator.escape(req.query.q || "")
    const endpoint = formatUrl(GOOGLE_API_SEARCH, {
        part: "snippet",
        channelId: CHANNEL_ID,
        maxResults: MAX_RESULTS,
        order: ORDER_BY_DATE,
        q: query,
        type: TYPE_VIDEO,
        key: GOOGLE_API_KEY
    })

    return fetch(endpoint)
        .then(response => response.json())
        .then(responseJson => {
            res.locals.data = {
                items: transformYoutubeVideos(responseJson.items),
                pagination: responseJson.pageInfo
            }
            return next()
        })
        .catch(error => {
            res.locals.errors = error
            return next()
        })
}

async function fetchTalks(_, res, next) {
    try {
        const englishVideos = await fetchVideosFromPlaylist(
            PLAYLIST_CONFERENCES_ENGLISH_ID
        )
        const spanishVideos = await fetchVideosFromPlaylist(
            PLAYLIST_CONFERENCES_SPANISH_ID
        )

        res.locals.data = {
            englishVideos,
            spanishVideos
        }

        return next()
    } catch (error) {
        res.locals.errors = {
            error,
            englishVideos: {
                items: {},
                pagination: {}
            },
            spanishVideos: {
                items: {},
                pagination: {}
            }
        }
        return next()
    }
}

function fetchVideosFromPlaylist(playlistId) {
    const endpoint = formatUrl(GOOGLE_API_PLAYLIST, {
        part: "snippet",
        playlistId,
        maxResults: MAX_RESULTS,
        order: ORDER_BY_DATE,
        type: TYPE_VIDEO,
        key: GOOGLE_API_KEY
    })

    return fetch(endpoint)
        .then(response => response.json())
        .then(responseJson => ({
            items: transformYoutubePlaylistVideos(responseJson.items),
            pagination: responseJson.pageInfo
        }))
}

function transformYoutubeVideos(videos = []) {
    return videos.reduce(
        (previousValue, video) =>
            merge({}, previousValue, {
                [video.id.videoId]: transformYoutubeVideo(video)
            }),
        {}
    )
}

function transformYoutubeVideo(video = {}) {
    return {
        id: video.id.videoId,
        channelId: video.snippet.channelId,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        title: video.snippet.title,
        thumbnails: video.snippet.thumbnails
    }
}

function transformYoutubePlaylistVideos(videos = []) {
    return videos.reduce((previousValue, video) => {
        const videoId = video.snippet.resourceId.videoId

        return merge({}, previousValue, {
            [videoId]: transformYoutubePlaylistVideo(video)
        })
    }, {})
}

function transformYoutubePlaylistVideo(video = {}) {
    return {
        id: video.snippet.resourceId.videoId,
        channelId: video.snippet.channelId,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        title: video.snippet.title,
        thumbnails: video.snippet.thumbnails
    }
}

module.exports = router
