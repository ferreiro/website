export function createPostUrl(permalink: string) {
    return `/blog/${permalink}`
}

export function createSeriesUrl(permalink: string) {
    return `/series/${permalink}`
}

export function createShareablePostUrl(permalink: string) {
    return `https://www.ferreiro.me${createPostUrl(permalink)}`
}