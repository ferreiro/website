import express from 'express'
import {
  getStats,
} from './stats.controller'

const router = express.Router()

router.get('/', getStats)

module.exports = router
