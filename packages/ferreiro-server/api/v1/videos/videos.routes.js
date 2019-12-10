const express = require("express")
const router = express.Router()

import cache from "../../../setup/setupCache"
import { fetchVideos, fetchTalks, responseHandler } from "./videos.controller"

/**
 * @api get /videos - Gets all the published videos given a
 */
router.get("/", cache.get, fetchVideos, cache.set, responseHandler)

/**
 * @api get /videos/talks - Gets all the conferences videos.
 */
router.get("/talks", cache.get, fetchTalks, cache.set, responseHandler)

module.exports = router
