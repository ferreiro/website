import fetch from "isomorphic-unfetch"

import { VideosPaginated, VideosMultilanguagePaginated } from "../types/Video"
import { formatUrl } from "url-lib"

export async function fetchVideosApi(options: {
    q?: string
}): Promise<VideosPaginated> {
    return fetch(formatUrl(`http://localhost:4000/api/v1/videos`, options))
        .then(r => r.json())
        .catch(error => error)
}

export async function fetchTalksVideosApi(): Promise<
    VideosMultilanguagePaginated
> {
    return fetch(formatUrl(`http://localhost:4000/api/v1/videos/talks`))
        .then(r => r.json())
        .catch(error => error)
}

// "" // "devsindepth}developers in depth|did"
