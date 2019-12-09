import { formatUrl } from "url-lib"
import { TrackingOptions } from "../types/TrackingOptions"

export function getUrlWithTracking(
    permalink: string,
    trackingOptions: TrackingOptions
) {
    return formatUrl(permalink, {
        utm_source: trackingOptions.utm_source,
        utm_medium: trackingOptions.utm_medium,
        utm_campaign: trackingOptions.utm_campaign
    })
}

// NB: Do not used... Always force to use the getPostUrlWithTrack
function getPostUrl(permalink: string) {
    return `/blog/${permalink}`
}

export function getPostUrlWithTracking(
    permalink: string,
    trackingOptions: TrackingOptions
) {
    const postUrl = getPostUrl(permalink)
    return getUrlWithTracking(postUrl, trackingOptions)
}

export function getPostQualifiedUrl(permalink: string) {
    return `https://www.ferreiro.me${getPostUrl(permalink)}`
}

// NB: Do not used... Always force to use the getSeriesUrlWithTracking
function getSeriesUrl(permalink: string) {
    return `/series/${permalink}`
}

export function getSeriesUrlWithTracking(permalink: string, trackingOptions) {
    return getUrlWithTracking(getSeriesUrl(permalink), trackingOptions)
}

export function getSeriesUrlWithSubscription(
    permalink: string,
    trackingOptions: TrackingOptions
) {
    const seriesUrl = getSeriesUrl(permalink)
    const url = getUrlWithTracking(seriesUrl, trackingOptions)

    return formatUrl(url, {
        sub_confirmation: true
    })
}

/**
 *
 * https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/parameter-reference1
 *
 * @param props.url {String} - It must be a fully qualified URL (including https://)
 */
export function getLinkedinShareableUrl(props: {
    mini?: boolean
    url: string
    title: string
    trackingOptions: TrackingOptions
}) {
    const url = getUrlWithTracking(props.url, props.trackingOptions)
    const mini = props.mini || false

    return formatUrl("https://www.linkedin.com/shareArticle", {
        mini,
        url,
        title: props.title,
        source: "LinkedIn"
    })
}

/**
 *
 * https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/parameter-reference1
 *
 * @param props.url {String} - It must be a fully qualified URL (including https://)
 */
export function getTwitterShareableUrl(props: {
    url: string
    title: string
    trackingOptions: TrackingOptions
}) {
    const url = getUrlWithTracking(props.url, props.trackingOptions)

    return formatUrl("https://twitter.com/intent/tweet", {
        text: props.title,
        url,
        via: "jgferreiro"
    })
}

/**
 *
 * https://gist.github.com/apisandipas/74d396c7853b93f5f861091a2135d527
 *
 * @param props.url {String} - It must be a fully qualified URL (including https://)
 */
export function getFacebookShareableUrl(props: {
    url: string
    title: string
    trackingOptions: TrackingOptions
}) {
    const url = getUrlWithTracking(props.url, props.trackingOptions)

    return formatUrl("http://www.facebook.com/sharer.php", {
        u: url,
        "[title]": props.title
    })
}
