import {getBlogCategoryPermalink} from './blog/get-blog-category-permalink'

export const PATH_HOME = '/'
export const PATH_ABOUT = '/about'
export const PATH_BLOG = '/blog'
export const PATH_RESUME = '/about/resume'
export const PATH_CONTACT = '/contact'
export const PATH_CONTACT_TALK = '/contact/talk'
export const PATH_PORTFOLIO = 'portfolio'
export const PATH_TALKS = '/talks'
export const PATH_VIDEOS = '/videos'

export const SOCIAL_URL_TWITTER = 'https://twitter.com/JGFerreiro'
export const SOCIAL_URL_LINKEDIN = 'https://www.linkedin.com/in/jgferreiro/'

// TODO: Deprecating and put this into content/english.js
export const SIDEBAR_MENU_ABOUT_TITLE = 'About'
export const SIDEBAR_MENU_BLOG_TITLE = 'Blog categories'

export const RESUME_URL = '/resume/jorge_ferreiro_resume.pdf?pdf=resume'

export const ABOUT_CATEGORY_BIO = 'bio'
export const ABOUT_CATEGORY_PORTFOLIO = 'portfolio'
export const ABOUT_CATEGORY_RESUME = 'resume'
// TODO: Add typescript and make this item list a type.
export const ABOUT_NAVIGATION = [
    {
        category: ABOUT_CATEGORY_BIO,
        text: 'Biography',
        icon: 'home',
        path: '/about',
    },
    {
        category: ABOUT_CATEGORY_PORTFOLIO,
        text: 'Portfolio & projects',
        icon: null,
        path: '/portfolio',
    },
    {
        category: ABOUT_CATEGORY_RESUME,
        text: 'Résume',
        icon: null,
        path: '/about/resume',
    },
]

// TODO: deprecate and use content/english.js instead
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

// TODO: Add typescript and make this item list a type.
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