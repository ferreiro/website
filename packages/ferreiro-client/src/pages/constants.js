import {getBlogCategoryPermalink} from './blog/get-blog-category-permalink'

export const BLOG_CATEGORY_TO_CONTENT = {
    'blog': {
        title: 'Blog',
        description: 'A blog by Jorge Ferreiro about Web Development, Career growth and life adventures.'
    },
    'web': {
        title: 'Web development',
        description: 'A blog by Jorge Ferreiro about Web Development, Career growth and life adventures.'
    },
    'career': {
        title: 'Career advices',
        description: 'A blog by Jorge Ferreiro about Web Development, Career growth and life adventures.'
    }
}

export const BLOG_NAVIGATION = [
    {
        category: 'blog',
        text: 'Home',
        icon: 'home',
        path: 'blog',
    },
    // {
    //     category: 'web',
    //     text: 'Web development',
    //     icon: 'web',
    //     path: getBlogCategoryPermalink('web'),
    // },
    // {
    //     category: 'career',
    //     text: 'Career',
    //     icon: 'career',
    //     path: getBlogCategoryPermalink('career'),
    // }
]