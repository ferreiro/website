const content = require('../content/english.json') // TODO: Add multilanguage
const experience = require('../content/english/experience.json')
const blogRepository = require('../repository/blog')

export const getHomePage = (req, res, next) => {
  const viewTemplateName = req.query.v1 ? './home.view' : './home.view.v2'
  const homeContext = {
    title: 'Jorge Ferreiro - Software Engineer, Product Manager and Entrepreneur',
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
    res.render(viewTemplateName, homeContext)
  }).catch(error => {
    homeContext.error = error
    res.render(viewTemplateName, homeContext)
  })
}