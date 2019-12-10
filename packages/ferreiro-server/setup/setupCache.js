const NodeCache = require("node-cache")

const THREE_HOURS_IN_SECONDS = 3 * 3600

const cache = new NodeCache({ stdTTL: THREE_HOURS_IN_SECONDS })

function getUrlFromRequest(req) {
    const url = req.protocol + "://" + req.headers.host + req.originalUrl
    return url
}

function get(req, res, next) {
    const url = getUrlFromRequest(req)
    const content = cache.get(url)

    if (content) {
        return res.status(200).send(content)
    }
    return next()
}

function set(req, res, next) {
    const url = getUrlFromRequest(req)

    cache.set(url, res.locals.data)
    return next()
}

module.exports = { get, set }
