export const TARGET_BLANK = '_blank'
export const TARGET_SELF = '_self'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/jgferreiro/'
export const TWITTER_URL = 'https://twitter.com/JGFerreiro'
export const INSTAGRAM_URL = 'https://www.instagram.com/jgferreiro/'
export const GITHUB_URL = 'https://github.com/ferreiro'
export const SOCIAL_NETWORKS = [
    {
        url: LINKEDIN_URL,
        text: 'Linkedin',
        icon: 'icon-linkedin',
    },
    {
        url: TWITTER_URL,
        text: 'Twitter',
        icon: 'icon-twitter',
    },
    {
        url: INSTAGRAM_URL,
        text: 'Instagram',
        icon: 'icon-instagram',
    },
    {
        url: GITHUB_URL,
        text: 'Github',
        icon: 'icon-github',
    },
]

// BUTTON
export const BUTTON_STYLE_OUTLINE = 'link';
export const BUTTON_STYLE_FILL = 'fill';
export const BUTTON_STYLE_LINK = 'none';
export const BUTTON_STYLE_NEUTRAL = 'neutral';
export const BUTTON_STYLE_YOUTUBE = 'youtube';
export const BUTTON_SIZE_SMALL = 'small';
export const BUTTON_SIZE_MEDIUM = 'medium';
export const BUTTON_SIZE_BIG = 'big';

// MENU
export const MENU_ITEMS = [
    {
      "id": "about",
      "icon": null,
      "text" : "About",
      "path" : "/about",
      "target": "_self",
      "submenu": [
        {
          "id": "biography",
          "icon": null,
          "text" : "Biography",
          "path" : "/about",
          "target": "_self",
        },
        {
          "id": "portfolio",
          "icon": null,
          "text" : "Portfolio & Projects",
          "path" : "/portfolio",
          "target": "_self",
        },
        {
          "id": "resume",
          "icon": null,
          "text" : "Resume / CV",
          "path" : "/about/resume",
          "target": "_self",
        },
      ]
    },
    {
      "id": "blog",
      "icon": null,
      "text" : "Blog",
      "path" : "/blog",
      "target": "_self"
    },
    {
      "id": "videos",
      "icon": null,
      "text" : "Videos",
      "path" : "/videos",
      "target": "_self"
    },
    {
      "id": "talks",
      "icon": null,
      "text" : "Conferences",
      "path" : "/talks",
      "target": "_self"
    },
    // {
    //   "id": "portfolio",
    //   "icon": null,
    //   "text" : "Portfolio",
    //   "path" : "/portfolio",
    //   "target": "_self"
    // },
    {
      "id": "contact",
      "icon": null,
      "text" : "Contact",
      "path" : "/contact",
      "target": "_self"
    }
]

export const MOBILE_MENU_ITEMS = [
  {
    "id": "home",
    "hidden": false,
    "text" : "Home",
    "path" : "/",
    "target": "_self"
  },
  ...MENU_ITEMS
]