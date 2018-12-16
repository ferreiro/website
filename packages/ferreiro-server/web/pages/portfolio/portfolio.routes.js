import express from 'express'
import {
    getProjects,
    getProjectsByCategory,
} from './portfolio.controller'

const router = express.Router()

router.get('/', getProjects)
router.get('/:category', getProjectsByCategory)

module.exports = router
