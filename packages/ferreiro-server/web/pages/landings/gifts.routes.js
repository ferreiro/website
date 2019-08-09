import express from 'express'
import {
    getGifts,
} from './gifts.controller'

const router = express.Router()

router.get('/', getGifts)

module.exports = router
