export interface Video {
    channelId: string
    description: string
    id: string
    publishedAt: string
    title: string
    thumbnails: {
        default: {
            url: string
            width: number
            height: number
        }
        medium: {
            url: string
            width: number
            height: number
        }
        high: {
            url: string
            width: number
            height: number
        }
    }
}

export interface Videos {
    // Key is the video ID
    [key: string]: Video
}

export interface VideosPaginated {
    items: Videos
    pagination: VideosPagination
}

export interface VideosMultilanguagePaginated {
    englishVideos: {
        items: Videos
        pagination: VideosPagination
    }
    spanishVideos: {
        items: Videos
    }
}

export interface VideosPagination {
    totalResults: number
    resultsPerPage: number
}
