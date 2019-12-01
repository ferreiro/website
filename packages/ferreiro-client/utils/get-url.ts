import { formatUrl } from "url-lib"

export function getLinkWithTracking(
    permalink: string,
    options: {
        utm_source?: string
        utm_medium?: string
        utm_campaign?: string
    }
) {
    return formatUrl(permalink, options)
}

export function createPostUrl(permalink: string) {
    return `/blog/${permalink}`
}

export function createSeriesUrl(permalink: string) {
    return `/series/${permalink}`
}

export function createSeriesUrlWithSubscription(
    permalink: string,
    options: {
        utm_source?: string
    }
) {
    return formatUrl(`/series/${permalink}`, {
        ...options,
        ...{ sub_confirmation: true }
    })
}

export function createShareablePostUrl(permalink: string) {
    return `https://www.ferreiro.me${createPostUrl(permalink)}`
}
