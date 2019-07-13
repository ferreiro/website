import express from 'express'
import {getVideos} from './videos.controller'

const router = express.Router()

router.get('/', getVideos)

module.exports = router