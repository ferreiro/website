import fetch from "isomorphic-unfetch"

import { VideosPaginated, VideosMultilanguagePaginated } from "../types/Video"
import { formatUrl } from "url-lib"

/**
 * Gets all the public videos, mainly on youtube.
 *
 * @param {String} options.q - query to filter out the list of videos
 * @return {VideosPaginated} - combined response with a list of videos and
 *                             the paginated response to fetch more data
 */
export async function fetchVideosApi(options: {
    q?: string
}): Promise<VideosPaginated> {
    return fetch(formatUrl(`http://localhost:4000/api/v1/videos`, options))
        .then(r => r.json())
        .catch(error => error)
}

/**
 * Gets all the videos for my conferences.
 *
 * NB: For the talks, we get spanish as well as english talks.
 *
 * @return {VideosMultilanguagePaginated}
 */
export async function fetchTalksVideosApi(): Promise<
    VideosMultilanguagePaginated
> {
    return fetch(formatUrl(`http://localhost:4000/api/v1/videos/talks`))
        .then(r => r.json())
        .catch(error => error)
}
