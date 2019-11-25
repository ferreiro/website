export function createPostUrl(permalink: string) {
    return `/blog/${permalink}`
}

export function createSeriesUrl(permalink: string) {
    return `/series/${permalink}`
}

export function createSeriesUrlWithSubscription(options: {
    permalink: string
    source?: string
}) {
    // TODO: Use url-lib for generating urls
    return `/series/${options.permalink}?subscribe=true&source=${options.source}`
}

export function createShareablePostUrl(permalink: string) {
    return `https://www.ferreiro.me${createPostUrl(permalink)}`
}
