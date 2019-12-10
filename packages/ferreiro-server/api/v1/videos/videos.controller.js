import merge from "lodash/merge"
import fetch from "isomorphic-unfetch"
import validator from "validator"
import { formatUrl } from "url-lib"

import env from "../../../env"

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

export function fetchVideos(req, res, next) {
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
            if (responseJson.error) {
                res.locals.errors = responseJson.error
                return next()
            }

            res.locals.data = {
                items: _transformYoutubeVideos(responseJson.items),
                pagination: responseJson.pageInfo
            }
            return next()
        })
        .catch(error => {
            res.locals.errors = error
            return next()
        })
}

export async function fetchTalks(_, res, next) {
    try {
        const englishVideos = await _fetchVideosFromPlaylist(
            PLAYLIST_CONFERENCES_ENGLISH_ID
        )
        const spanishVideos = await _fetchVideosFromPlaylist(
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

// NB: We use this method to create the response for the client.
// We set res.locals in every controller logic as a variable
// for the current request.
export function responseHandler(_, res) {
    console.log(res.locals.errors)
    if (res.locals.errors) {
        return res.status(401).json({
            error: res.locals.errors
        })
    }

    return res.status(200).json(res.locals.data)
}

function _fetchVideosFromPlaylist(playlistId) {
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
        .then(responseJson => {
            console.log(responseJson)

            return {
                items: transformYoutubePlaylistVideos(responseJson.items),
                pagination: responseJson.pageInfo
            }
        })
}

function _transformYoutubeVideos(videos = []) {
    return videos.reduce((previousValue, video) => {
        const videoId = video.id.videoId

        return merge({}, previousValue, {
            [videoId]: {
                id: video.id.videoId,
                channelId: video.snippet.channelId,
                description: video.snippet.description,
                publishedAt: video.snippet.publishedAt,
                title: video.snippet.title,
                thumbnails: video.snippet.thumbnails
            }
        })
    }, {})
}

function transformYoutubePlaylistVideos(videos = []) {
    return videos.reduce((previousValue, video) => {
        const videoId = video.snippet.resourceId.videoId

        return merge({}, previousValue, {
            [videoId]: {
                id: video.snippet.resourceId.videoId,
                channelId: video.snippet.channelId,
                description: video.snippet.description,
                publishedAt: video.snippet.publishedAt,
                title: video.snippet.title,
                thumbnails: video.snippet.thumbnails
            }
        })
    }, {})
}
