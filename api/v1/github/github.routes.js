import express from 'express'
import {
    getGithubProfile,
    getGithubPublicRepositories,
} from './github.controller'

const router = express.Router();

router.get('/profile', getGithubProfile);
router.get('/public_repositories', getGithubPublicRepositories);

module.exports = router;