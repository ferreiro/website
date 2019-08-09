import express from 'express'
import {
    getImageUploader,
    postImageUploader
} from './imageUploader.controller'
import {upload} from './upload'

const router = express.Router()

router.get('/', getImageUploader)
router.post('/', upload.array('image', 1), postImageUploader)

module.exports = router
