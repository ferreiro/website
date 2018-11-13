import express from 'express'
import {
  getResume,
} from './resume.controller'

const router = express.Router()

router.get('/', getResume)

module.exports = router
