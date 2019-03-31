import express from 'express'
import {uriPathInHTMLData} from 'xss-filters';

const router = express.Router()

// TODO: Move this into a database and let the admin of ferreiro.me to
// create more urls as they need on the go
const SHORT_URL_TO_URL = {
    perfomance: 'https://www.ferreiro.me/blog/speed-up-your-website-frontend-8-practical-tips',
}

const MOVED_PERMANETLY_STATUS_CODE = 301

// TODO: Move this into the API repository.
const getShortenedUrl = (permalink) => (
    new Promise((resolve, reject) => {
        const url = SHORT_URL_TO_URL[permalink]

        if (!url) {
            return reject('No URL found')
        }   

        return resolve(url)
    })
)

router.get('/:permalink', async (req, res) => {
    // TODO: Get the permalink from the url.
    // TODO: Scape bad XSS guys from here.
    const permalink = uriPathInHTMLData(req.params.permalink)

    // TODO: Implement in the DB repository a read-only getter.
    getShortenedUrl(permalink)
        .then(url => res.redirect(MOVED_PERMANETLY_STATUS_CODE, url))
        .catch(error => res.render(error))
})

module.exports = router;