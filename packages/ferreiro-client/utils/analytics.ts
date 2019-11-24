export function addTrackingUrl(
    url: string,
    options: {
        utmSource?: string
        utmCampaign?: string
        utmMedium?: string
    }
) {
    // TODO: Support the rest of the options
    return `${url}?utm-source=${options.utmSource}`
}
