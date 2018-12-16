import {createViewPath} from '../create-view-path'

const projects = require('../../content/english/portfolio')

export const getProjects = (req, res) => (
    res.render(createViewPath('portfolio', 'portfolio.pug'), {
        title: 'Portfolio and Projects - Jorge Ferreiro',
        headline: 'Portfolio',
        path: 'portfolio',
        filtered: false, /* If projects are filtered by some category */
        projects: projects
    })
)

export const getProjectsByCategory = (req, res) => {
    const title = category + ' projects'
    const category = req.params.category
  
    const projectsFiltered = projects.filter((project) => {
        const projectCategories = project.type
        const projectHasCategory = projectCategories.indexOf(category)

        return projectHasCategory >= 0
    })
  
    return res.render(createViewPath('portfolio', 'portfolio.pug'), {
        path: 'projects',
        title: 'Portfolio - Jorge Ferreiro',
        headline: 'Portfolio',
        filtered: true,
        filtered_by: category,
        projects: projectsFiltered
    })
}
