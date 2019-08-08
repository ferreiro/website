import {createViewPath} from '../create-view-path'
import blogRepository from '../../../api/repository/blog'

const content = require('../../content/english.json') // TODO: Add multilanguage
const experience = require('../../content/english/experience.json')

export const getHomePage = (req, res) => {
    const viewTemplateName = req.query.v1 ? 'home.pug' : 'home.v2.pug'
    const homeContext = {
        title: 'Jorge Ferreiro - Frontend Software Engineer at Eventbrite, Former Backend Software Engineer at Amazon and Entrepreneur',
        image: 'https://www.ferreiro.me/images/home/welcome_to_ferreiro_v3.jpg',
        path: 'home',
        content: content.about,
        recentPosts: [],
        experience,
    }

    // Get related posts
    return blogRepository.getMostRecentPosts({
        count: 3
    }).then(posts => {
        homeContext.recentPosts = posts
        return res.render(createViewPath('home', viewTemplateName), homeContext)
    }).catch(error => {
        homeContext.error = error
        return res.render(createViewPath('home', viewTemplateName), homeContext)
    })
}