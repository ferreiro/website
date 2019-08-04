import {
    PATH_ABOUT,
    PATH_VIDEOS,
    FILTER_MENU_KEY,
    PATH_CONTACT,
    PATH_CONTACT_TALK,
    PATH_TALKS
} from "../pages/constants";

export const PAGE_TITLE = 'title'
export const PAGE_SUBTITLE = 'subtitle'
export const PAGE_CATEGORIES = 'categories'
export const PAGE_CONTENT = 'content'
export const PAGE_COLORS = 'colors'
export const PAGE_SIDEBAR_MENU = 'sidebarMenu'
export const PAGE_SIDEBAR_MENU_ITEMS = 'sidebarMenuItems'
export const PAGE_ENTITIES = 'entities'

export const ABOUT_CAREER = 'about/career'

export const TALK_PROPERTY_LOCATION = 'location'
export const TALK_PROPERTY_COUNTRY = 'country'
export const TALK_PROPERTY_CITY = 'city'
export const TALK_PROPERTY_VENUE = 'venue'

export const TALK_COUNTRY_SPAIN = 'Spain'
export const TALK_COUNTRY_UK = 'United Kingdom'
export const TALK_COUNTRY_US = 'United States'
export const TALK_CITY_MADRID = 'Madrid'
export const TALK_CITY_MURCIA = 'Murcia'
export const TALK_CITY_LONDON = 'London'

export const VIDEO_CATEGORIES_ALL = 'all'
export const VIDEO_CATEGORIES_DID = 'developersInDepth'
export const VIDEO_CATEGORIES_CONFERENCES = 'conferences'

export const VIDEO_TYPE_DID = 'didVideo'
export const VIDEO_TYPE_REGULAR = 'regularVideo'

export const BUTTON_TYPE_SLIDES = 'slides'
export const BUTTON_TYPE_VIDEO = 'video'

export const getPageData = (path) => (
    content[path]
)

export const content = {
    [PATH_ABOUT]: {
        [PAGE_CONTENT]: {
            [PAGE_TITLE]: 'About',
            // [PAGE_SUBTITLE]: 'Jorge Ferreiro videos',
            [ABOUT_CAREER]: {
                eventbrite: {
                    id: 'eventbrite',
                    location: 'Madrid, Spain',
                    headline: 'Frontend Software Engineer at Eventbrite',
                    dates: {
                        start: 'Sep 2018',
                        end: null,
                    },
                    image: {
                        alt: 'Jorge Ferreiro Frontend Software Engineer at Eventbrite',
                        src: '/images/companies/eventbrite-dark.png',
                    }
                },
                amazon: {
                    id: 'amazon',
                    location: 'Luxembourg, Luxembourg',
                    headline: 'Backend Software Engineer Internship at Amazon',
                    dates: {
                        start: 'Jan 2018',
                        end: 'Jul 2018',
                    },
                    image: {
                        alt: 'Jorge Ferreiro Background Software Engineer Intern at Amazon',
                        src: '/images/companies/amazon-dark.png',
                    }
                },
                dailyfocus: {
                    id: 'dailyfocus',
                    location: 'Madrid, Spain',
                    headline: 'Creator and Full Stack Software Engineer at Dailyfocus',
                    dates: {
                        start: 'May 2016',
                        end: 'Dec 2017',
                    },
                    image: {
                        alt: 'Jorge Ferreiro creator and Full Stack Software Engineer at Dailyfocus',
                        src: '/images/companies/dailyfocus-dark.png',
                    }
                },
                huawei: {
                    id: 'huawei',
                    location: 'China',
                    headline: 'Summer Scholarship with Huawei',
                    dates: {
                        start: 'Jul 2016',
                        end: 'Jul 2016',
                    },
                    image: {
                        alt: 'Jorge Ferreiro Summer Scholarship at Huawei',
                        src: '/images/companies/huawei-dark.png',
                    }
                },
                music4deejays: {
                    id: 'music4deejays',
                    location: 'Madrid, Spain',
                    headline: 'Creator and Full Stack Software Engineer at Music4deejays',
                    dates: {
                        start: 'Dec 2013',
                        end: 'Dec 2015',
                    },
                    image: {
                        alt: 'Jorge Ferreiro creator and Full Stack Software Engineer at Music4deejays',
                        src: '/images/companies/music4deejays-dark.png',
                    }
                }
            }
        },
        [PAGE_COLORS]: {
            career: '#922dcc',
            talks: '#3f51b5',
            videos: '#f44336',
            writing: '#ff9800',
            mentoring: '#009688',
            photos: '#607d8b',
        },
    },
    [PATH_VIDEOS]: {
        [PAGE_CONTENT]: {
            [VIDEO_CATEGORIES_ALL]: {
                [PAGE_TITLE]: 'Videos',
                [PAGE_SUBTITLE]: 'Jorge Ferreiro videos',
            },
            [VIDEO_CATEGORIES_DID]: {
                [PAGE_TITLE]: 'Developers In Depth',
                [PAGE_SUBTITLE]: 'Youtube Show hosted by Jorge Ferreiro with interviews to top tech leaders ⚡ Propose the next interview or ask for an interview here: www.devsindepth.com',
            },
            [VIDEO_CATEGORIES_CONFERENCES]: {
                [PAGE_TITLE]: 'Conferences',
                [PAGE_SUBTITLE]: 'Jorge Ferreiro videos',
            },
        },
        [PAGE_SIDEBAR_MENU]: {
            title: 'Video categories',
            entities: {
                [VIDEO_CATEGORIES_ALL]: {
                    category: VIDEO_CATEGORIES_ALL,
                    text: 'All',
                    icon: 'home',
                    path: '/videos',
                },
                [VIDEO_CATEGORIES_DID]: {
                    category: VIDEO_CATEGORIES_DID,
                    text: 'Developers In Depth',
                    icon: 'home',
                    path: `/videos/${VIDEO_CATEGORIES_DID}`,
                },
                [VIDEO_CATEGORIES_CONFERENCES]: {
                    category: VIDEO_CATEGORIES_CONFERENCES,
                    text: 'Conferences',
                    icon: 'home',
                    path: `/videos/${VIDEO_CATEGORIES_CONFERENCES}`,
                },
            }
        },
        [PAGE_ENTITIES]: {
            ianDID: {
                id: 'ianDID',
                permalink: 'ian-fuller-cto-freetrade',
                type: VIDEO_TYPE_DID,
                title: 'Ian Fuller',
                subtitle: 'VP Engineering at Freetrade',
                categories: [VIDEO_CATEGORIES_ALL, VIDEO_CATEGORIES_DID],
                cta: 'Watch now',
                companies: [
                    {
                        alt: 'Freetrade, Invest in stocks and ETFs, commission-free, right from your phone. Simple, safe and secure. Trusted by tens of thousands.',
                        src: '/images/companies/freetrade.png',
                    },
                    {
                        alt: 'Snapchat lets you easily talk with friends, view Live Stories from around the world, and explore news in Discover. Life is more fun when you live in the moment!',
                        src: '/images/companies/snapchat.png',
                    },
                    {
                        alt: 'Amazon.com, Inc., is an American multinational technology company based in Seattle, Washington that focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
                        src: '/images/companies/amazon_comp.png',
                    },
                ],
                description: 'Join us in this interview by Jorge Ferreiro where we dicuss tips for junior sofware engineers, diversity and lessons learned.',
                image: {
                    alt: 'Ian Fuller CTO freetrade, formerly at Amazon, Snapchat and Nokia',
                    src: '/images/videos/ian_fuller_cto_freetrade_amazon_snapchat.jpg',
                },
                url: 'https://www.youtube.com/watch?v=8REUs0k_pVc&list=PLaN1b7vXPDt6f3jYSdFbVeeEixCxWSepj',
                iframe: null,
            },
            rahmaDid: {
                id: 'rahmaDid',
                permalink: 'rahma-javed-engineering-director-deliveroo',
                type: VIDEO_TYPE_DID,
                title: 'Rahma Javed',
                subtitle: 'Engineering Director at Deliveroo',
                categories: [VIDEO_CATEGORIES_ALL, VIDEO_CATEGORIES_DID],
                cta: 'Watch now',
                companies: [
                    {
                        alt: 'Deliveroo online food delivery company founded in 2013 by Will Shu and Greg Orlowski',
                        src: '/images/companies/deliveroo.png',
                    },
                    {
                        alt: 'Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington',
                        src: '/images/companies/microsoft.png',
                    },
                    {
                        alt: 'Wealthfront Inc. is an automated investment service firm based in Redwood City, California, founded by Andy Rachleff and Dan Carroll in 2008',
                        src: '/images/companies/wealthfront.png',
                    },
                ],
                description: 'Join us in this interview by Jorge Ferreiro where we dicuss tips for junior sofware engineers, diversity and lessons learned.',
                image: {
                    alt: 'Rahma Javed Director of Engineering at Deliveroo and alumni at Microsoft and Wealthfront',
                    src: '/images/videos/rahma_javed_director_of_engineering_deliveroo_and_alumni_microsoft_wealthfront.jpg',
                },
                url: 'https://www.youtube.com/watch?v=8REUs0k_pVc&list=PLaN1b7vXPDt6f3jYSdFbVeeEixCxWSepj',
                iframe: 'https://www.youtube.com/embed/videoseries?list=PLaN1b7vXPDt6f3jYSdFbVeeEixCxWSepj',
            },
            JSRoundaboutPerfomance: {
                id: 'JSRoundaboutPerfomance',
                permalink: 'jorge-ferreiro-js-roundabout',
                type: VIDEO_TYPE_REGULAR,
                title: 'Web Performance Expectations vs Reality',
                subtitle: 'Conference at Twitter London for JS Roundabout',
                categories: [VIDEO_CATEGORIES_ALL, VIDEO_CATEGORIES_CONFERENCES],
                cta: 'Watch now',
                companies: [],
                description: 'Join us in this interview by Jorge Ferreiro where we dicuss tips for junior sofware engineers, diversity and lessons learned.',
                image: {
                    alt: 'Jorge Ferreiro Web Perfomance Talk at JS Roundabout and Twitter London',
                    src: '/images/videos/jorge_ferreiro_web_perfomance_talk_js_roundabout_london_and_twitter_london.jpg',
                },
                url: 'https://www.youtube.com/watch?v=N-WinPoapaA&t=1261s',
                iframe: 'https://www.youtube.com/embed/N-WinPoapaA',
            }
        },
    },
    [PATH_TALKS]: {
        [PAGE_CONTENT]: {
            [PAGE_TITLE]: "Conferences",
            [PAGE_SUBTITLE]: "I love sharing what I know! I have given talks on <strong>technical</strong>, <strong>career growth</strong> and <strong>motivational</strong> topics, as well as conducting workshops.",
        },
        [PAGE_ENTITIES]: {
            github101: {
                "isPrivate": false,
                "title": "Github 101 by Jorge Ferreiro - Adalab Bootcamp",
                "summary": "Why I love Github? What makes your Github profile stands out? Roast my Github. How do I use Github?",
                "permalink": "https://speakerdeck.com/ferreiro/github-like-a-pro-jorge-ferreiro-adalab-bootcamp-at-google-campus-madrid",
                "type": "slides",
                "pic": "/images/talks/github_101_jorge_ferreiro.jpg",
                "language": {
                    "display": "English",
                    "icon": "icon-english"
                },
                "date": "May, 7th",
                "year": "2019",
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "Google for Startups",
                    [TALK_PROPERTY_CITY]: TALK_CITY_MADRID,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_SPAIN,
                },
                "event": "",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_SLIDES,
                        "url": "https://speakerdeck.com/ferreiro/github-like-a-pro-jorge-ferreiro-adalab-bootcamp-at-google-campus-madrid"
                    }
                ]
            },
            githubProp: {
                "isPrivate": false,
                "title": "Github Like a Pro by Jorge Ferreiro - Adalab bootcamp",
                "summary": "Why I ❤️ Github? What makes your Github profile stands out? Roast my Github. How do I use Github?",
                "permalink": "https://speakerdeck.com/ferreiro/github-like-a-pro-jorge-ferreiro-adalab-bootcamp-at-google-campus-madrid",
                "type": "slides",
                "pic": "/images/talks/jorge_ferreiro_creating_github_profile_like_pro.jpg",
                "language": {
                    "display": "English",
                    "icon": "icon-english"
                },
                "date": "May, 7th",
                "year": "2019",
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "Google for Startups",
                    [TALK_PROPERTY_CITY]: TALK_CITY_MADRID,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_SPAIN,
                },
                "event": "",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_SLIDES,
                        "url": "https://speakerdeck.com/ferreiro/github-like-a-pro-jorge-ferreiro-adalab-bootcamp-at-google-campus-madrid"
                    }
                ]
            },
            perfLondon: {
                "isPrivate": false,
                "title": "Web Perfomance: Expectations Vs Reality - JSRoundabout by Jorge Ferreiro - #TwitterPerf",
                "summary": "“Why is my website slow?”, “How can I improve the loading time?”, “How does the browser render a website?”, “What techniques can I apply to boost the speed of my website?”.",
                "permalink": "https://speakerdeck.com/ferreiro/web-performance-jorge-ferreiro-twitter-london-js-roundabout",
                "type": "slides",
                "pic": "/images/talks/jorge_ferreiro_web_perfomance_expectations_vs_reality.jpg",
                "language": {
                    "display": "English",
                    "icon": "icon-english"
                },
                "date": "April, 2th",
                "year": "2019",
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "Twitter Office",
                    [TALK_PROPERTY_CITY]: TALK_CITY_LONDON,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_UK,
                },
                "event": "",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_SLIDES,
                        "url": "https://speakerdeck.com/ferreiro/web-performance-jorge-ferreiro-twitter-london-js-roundabout"
                    }
                ]
            },
            fdi10Tips: {
                "isPrivate": false,
                "title": "Los 10 consejos para lanzar tu carrera en tecnología - #futuroFiumers",
                "summary": "Jorge Ferreiro comparte 10 consejos y lecciones aprendidas para conseguir tu primer trabajo en tecnología e impulsar tu carrera en tecnología. Además, comparte una serie de consejos para poder aprovechar al máximo las oportunidades profesionales que te encuentres. Jorge Ferreiro basa sus consejos en los años programando de manera autodidacta, así como su internship (prácticas) en Amazon y ahora como full time employee en Eventbrite donde es programador de frontend.",
                "permalink": "https://speakerdeck.com/ferreiro/los-10-consejos-para-triunfar-como-programador-en-el-mundo-del-software",
                "type": "slides",
                "pic": "/images/talks/jorge_ferreiro_codecamp_2019_murcia_consejos_para_junior_engineers.jpg",
                "language": {
                    "display": "Spanish",
                    "icon": "icon-spanish"
                },
                "date": "February, 23th",
                "year": "2019",
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "Codecamp",
                    [TALK_PROPERTY_CITY]: TALK_CITY_MURCIA,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_SPAIN,
                },
                "event": "",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_SLIDES,
                        "url": "https://speakerdeck.com/ferreiro/los-10-consejos-para-triunfar-como-programador-en-el-mundo-del-software"
                    }
                ]
            },
            fdi10GetJob: {
                "isPrivate": false,
                "title": "La Guía Definitiva para conseguir tu trabajo - #futuroFDI",
                "summary": "How does it work the interview process? How to get a job in tech? All the lessons learned and tips to get your first job in tech.",
                "permalink": "https://speakerdeck.com/ferreiro/la-guia-definitiva-para-conseguir-tu-trabajo",
                "type": "slides",
                "pic": "/images/talks/guia_para_encontrar_trabajo_jorge_ferreiro_fdi_ucm.jpg",
                "language": {
                    "display": "Spanish",
                    "icon": "icon-spanish"
                },
                "date": "February, 6th",
                "year": "2019",
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "FDI UCM",
                    [TALK_PROPERTY_CITY]: TALK_CITY_MADRID,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_SPAIN,
                },
                "event": "",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_SLIDES,
                        "url": "https://speakerdeck.com/ferreiro/la-guia-definitiva-para-conseguir-tu-trabajo"
                    },
                    {
                        "type": BUTTON_TYPE_VIDEO,
                        "url": "https://www.youtube.com/watch?v=Js-av-zysWs"
                    },
                ]
            },
            fdiCesar: {
                "isPrivate": false,
                "title": "Entrevista con César Puerta, Senior Staff en Twitter - #futuroFDI",
                "summary": "Jorge Ferreiro does a live video interview with César Puerta who is currently leading Twitter for Android application and who is Senior Staff Engineer.",
                "permalink": "https://speakerdeck.com/ferreiro/la-guia-definitiva-para-conseguir-tu-trabajo",
                "type": "slides",
                "pic": "/images/talks/entrevista_cesar_puerta_twitter_hq_por_jorge_ferreiro_fdi_ucm.jpg",
                "language": {
                    "display": "Spanish",
                    "icon": "icon-spanish"
                },
                "date": "February, 6th",
                "year": "2019",
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "FDI UCM",
                    [TALK_PROPERTY_CITY]: TALK_CITY_MADRID,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_SPAIN,
                },
                "event": "",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_VIDEO,
                        "url": "https://www.youtube.com/watch?v=-Di5O7dGKNc&t=17s"
                    }
                ]
            },
            fdiCv: {
                "isPrivate": false,
                "title": "El CV y Github: El momento de jugar como pros 2019 - #futuroFDI",
                "summary": "Tips, ideas and suggestions on how to get the most out of your Social Networks. Also, learn how to do the most amazing resumes.",
                "permalink": "https://speakerdeck.com/ferreiro/el-cv-y-github-es-momento-de-jugar-como-pros",
                "type": "slides",
                "pic": "/images/talks/critica_my_resume_jorge_ferreiro_fdi_ucm.jpg",
                "language": {
                    "display": "Spanish",
                    "icon": "icon-spanish"
                },
                "date": "February, 6th",
                "year": "2019",
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "FDI UCM",
                    [TALK_PROPERTY_CITY]: TALK_CITY_MADRID,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_SPAIN,
                },
                "event": "",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_SLIDES,
                        "url": "https://speakerdeck.com/ferreiro/el-cv-y-github-es-momento-de-jugar-como-pros"
                    },
                    {
                        "type": BUTTON_TYPE_VIDEO,
                        "url": "https://www.youtube.com/watch?v=evGZ2yGpqxk&t=45s"
                    },
                ]
            },
            fdiHistory: {
                "isPrivate": false,
                "title": "Mi historia hasta 2019 - #futuroFDI",
                "summary": "Comparto mi historia personal desde cuando comencé a programar con 10 años hasta la actualidad. Haciendou un repaso de las lecciones aprendidas en las diferentes empresas que he estado.",
                "permalink": "https://speakerdeck.com/ferreiro/mi-historia-hasta-2019",
                "type": "slides",
                "pic": "/images/talks/mi_historia_jorge_ferreiro.jpg",
                "language": {
                    "display": "Spanish",
                    "icon": "icon-spanish"
                },
                "date": "February, 6th",
                "year": "2019",
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "FDI UCM",
                    [TALK_PROPERTY_CITY]: TALK_CITY_MADRID,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_SPAIN,
                },
                "event": "",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_SLIDES,
                        "url": "https://speakerdeck.com/ferreiro/mi-historia-hasta-2019"
                    },
                    {
                        "type": BUTTON_TYPE_VIDEO,
                        "url": "https://www.youtube.com/watch?v=qgwNuMQJcjo"
                    },
                ]
            },
            djangoGirlsLearn: {
                "isPrivate": false,
                "title": "Learn and grow in the tech world - #DjangoGirlsMadrid 2018-11-17",
                "summary": "My personal story when I started programming, and 6 lessons learned during those years",
                "permalink": "https://www.slideshare.net/jgferreiro/learn-and-grow-in-the-tech-world-djangogirlsmadrid-20181117",
                "type": "slides",
                "pic": "/images/talks/jorge-ferreiro-learn-and-grow-in-the-tech-world-django-girls-madrid-2018.jpg",
                "language": {
                    "display": "English",
                    "icon": "icon-english"
                },
                "date": "November, 19th",
                "year": "2018",
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "spaces works",
                    [TALK_PROPERTY_CITY]: TALK_CITY_MADRID,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_SPAIN,
                },
                "event": "",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_SLIDES,
                        "url": "https://www.slideshare.net/jgferreiro/learn-and-grow-in-the-tech-world-djangogirlsmadrid-20181117"
                    },
                    {
                        "type": BUTTON_TYPE_VIDEO,
                        "url": "https://www.youtube.com/watch?v=gEfMsPIBC2Q&t=36s"
                    },
                ],
                "iframeSrc": "//www.slideshare.net/slideshow/embed_code/key/vhVVEX9yujQ8Kt"
            },
            djangoGirlsLearnSpanish: {
                "isPrivate": false,
                "title": "Aprende y crece en el mundo tech - Django girls madrid 2018 - #DjangoGirlsMadrid",
                "summary": "Mi historia personal cuando comencé a programar, y 6 lecciones aprendidas",
                "permalink": "https://www.slideshare.net/jgferreiro/aprende-y-crece-en-el-mundo-tech-django-girls-madrid-2018",
                "type": "slides",
                "pic": "/images/talks/jorge-ferreiro-aprende-y-crece-en-el-mundo-tech-django-girls-madrid-2018.jpg",
                "language": {
                    "display": "Spanish",
                    "icon": "icon-spanish"
                },
                "date": "November, 19th",
                "year": "2018",
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "Spaces works",
                    [TALK_PROPERTY_CITY]: TALK_CITY_MADRID,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_SPAIN,
                },
                "event": "",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_SLIDES,
                        "url": "https://www.slideshare.net/jgferreiro/aprende-y-crece-en-el-mundo-tech-django-girls-madrid-2018"
                    },
                    {
                        "type": BUTTON_TYPE_VIDEO,
                        "url": "https://www.youtube.com/watch?v=gEfMsPIBC2Q&t=36s"
                    },
                ],
                "iframeSrc": "//www.slideshare.net/slideshow/embed_code/key/aQZrpBjP6TJlOi"
            },
            introduingRedis: {
                "isPrivate": false,
                "title": "Introducing Redis by Jorge Ferreiro - NoSQL database course at UCM",
                "summary": "Introduced Redis, a key-value NoSQL database, to 30 college students. I talked about introductory concepts and features, and shared a practical case.",
                "permalink": "https://www.slideshare.net/jgferreiro/redis-76234580",
                "type": "slides",
                "pic": "/images/talks/introducing_redis_database_jorge_ferreiro_ucm.jpg",
                "language": {
                    "display": "English",
                    "icon": "icon-english"
                },
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "Universidad Complutense de Madrid",
                    [TALK_PROPERTY_CITY]: TALK_CITY_MADRID,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_SPAIN,
                },
                "date": "May 5",
                "year": "2017",
                "event": "",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_SLIDES,
                        "url": "https://www.slideshare.net/jgferreiro/redis-76234580"
                    }
                ],
                "iframeSrc": "//www.slideshare.net/slideshow/embed_code/key/7ccfv8oGwI8NUp"
            },
            dailyfocusDemo: {
                "isPrivate": false,
                "title": "Dailyfocus presentation (with DEMO! 🔥): 16 minutes - FDI UCM - #helloDailyfocus",
                "summary": "Presentation of my personal project Dailyfocus, where I explained the engineering, product design, business and my personal experience.",
                "permalink": "https://www.youtube.com/watch?v=qlDrZiwkrv0",
                "type": "video",
                "pic": "/images/talks/presentation_introducing_dailyfocus_project_jorge_ferreiro_ucm.jpg",
                "language": {
                    "display": "Spanish",
                    "icon": "icon-spanish"
                },
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "Universidad Complutense de Madrid",
                    [TALK_PROPERTY_CITY]: TALK_CITY_MADRID,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_SPAIN,
                },
                "date": "June 17",
                "year": "2017",
                "event": "",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_SLIDES,
                        "url": "https://www.slideshare.net/jgferreiro/dailyfocus"
                    },
                    {
                        "title": "Watch the video",
                        "type": BUTTON_TYPE_VIDEO,
                        "url": "https://www.youtube.com/watch?v=qlDrZiwkrv0"
                    },
                ],
                "iframeSrc": "https://www.youtube.com/embed/qlDrZiwkrv0?rel=0"
            },
            dailyfocusPresentation: {
                "isPrivate": false,
                "title": "Dailyfocus presentation (June 2017): Vision, product, tech and journey.",
                "summary": "Presentation made for an academic jury from my college. I mainly cover: Challenges, vision and goals, development process, lessons learned, etc.",
                "permalink": "https://www.slideshare.net/jgferreiro/dailyfocus",
                "type": "slides",
                "pic": "/images/talks/slides_introducing_dailyfocus_project_jorge_ferreiro_ucm.jpg",
                "language": {
                    "display": "English",
                    "icon": "icon-english"
                },
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "Universidad Complutense de Madrid",
                    [TALK_PROPERTY_CITY]: TALK_CITY_MADRID,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_SPAIN,
                },
                "date": "August 7",
                "year": "2017",
                "event": "",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_SLIDES,
                        "url": "https://www.slideshare.net/jgferreiro/dailyfocus"
                    }
                ],
                "iframeSrc": "//www.slideshare.net/slideshow/embed_code/key/9g2w6pw5BIfcb8"
            },
            lightningJSDay: {
                "isPrivate": false,
                "title": "Lightning talk - Dailyfocus at #JsDayEs 2017 - Jorge Ferreiro",
                "summary": "Brief introduction of Dailyfocus at JSDayEs (JavaScript event in Spain). Challenged by the organizer to prepare it in 5 minutes.",
                "permalink": "https://www.youtube.com/watch?v=vZI3iPdbOTk",
                "type": "video",
                "pic": "/images/talks/dailyfocus_project_by_jorge_ferreiro_at_jsdayes_2017_yellow.jpg",
                "language": {
                    "display": "Spanish",
                    "icon": "icon-spanish"
                },
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "Universidad Complutense de Madrid",
                    [TALK_PROPERTY_CITY]: TALK_CITY_MADRID,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_SPAIN,
                },
                "date": "May",
                "year": "2017",
                "event": "JS DAY ES 2017",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_VIDEO,
                        "url": "https://www.youtube.com/watch?v=vZI3iPdbOTk"
                    }
                ],
                "iframeSrc": "https://www.youtube-nocookie.com/embed/vZI3iPdbOTk?rel=0"
            },
            workshopHTML: {
                "isPrivate": false,
                "title": "Workshop: Your first professional website (sponsored by Github.com)",
                "summary": "I organized and ran this workshop for more than 50 students in my college. I taught the attendees how to create a professional website from scratch to deployment.",
                "permalink": "https://www.slideshare.net/jgferreiro/workshop-your-first-professional-website",
                "type": "slides",
                "pic": "/images/talks/github_workshop_your_first_professional_website.jpg",
                "language": {
                    "display": "English",
                    "icon": "icon-english"
                },
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "Universidad Complutense de Madrid",
                    [TALK_PROPERTY_CITY]: TALK_CITY_MADRID,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_SPAIN,
                },
                "date": "May",
                "year": "2016",
                "event": "",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_SLIDES,
                        "url": "https://www.slideshare.net/jgferreiro/workshop-your-first-professional-website"
                    },
                    {
                        "title": "See poster",
                        "url": "https://drive.google.com/file/d/0B5Fp53X_33RqV0V4T3JWNG1WX2s/view"
                    }
                ],
                "iframeSrc": "//www.slideshare.net/slideshow/embed_code/key/JbRpFBTuxKzK60"
            },
            fdiMachine: {
                "isPrivate": true,
                "title": "Machine Learning: online news prediction in Mashable",
                "summary": "As a college project, I created a presentation and a report with a ML analysis to predict when is the best time to publish news to gain popularity.",
                "permalink": null,
                "type": "slides",
                "pic": "/images/talks/mashable.png",
                "language": {
                    "display": "English",
                    "icon": "icon-english"
                },
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "Universidad Complutense de Madrid",
                    [TALK_PROPERTY_CITY]: TALK_CITY_MADRID,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_SPAIN,
                },
                "date": "Jan 20",
                "year": "2017",
                "event": "FDI ML",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_SLIDES,
                        "url": null
                    }
                ],
                "iframeSrc": null
            },
            webappsMedialab: {
                "isPrivate": false,
                "title": "Webapps: introduction and publishing on Firefox OS",
                "summary": "I was invited to a Firefox OS meetup to talk about: Webapps, how to create them and my experience creating Music4deejays, a streaming music app.",
                "permalink": "https://www.slideshare.net/jgferreiro/webapps-case-study-and-publishing-applications-on-firefox-os",
                "type": "slides",
                "pic": "/images/talks/jorge_ferreiro_mozilla_firefox_os_meetup.jpg",
                "language": {
                    "display": "English",
                    "icon": "icon-english"
                },
                [TALK_PROPERTY_LOCATION]: {
                    [TALK_PROPERTY_VENUE]: "Medialab Prado",
                    [TALK_PROPERTY_CITY]: TALK_CITY_MADRID,
                    [TALK_PROPERTY_COUNTRY]: TALK_COUNTRY_SPAIN,
                },
                "date": "Nov 28",
                "year": "2014",
                "event": "Mozilla Event",
                "buttons": [
                    {
                        "type": BUTTON_TYPE_SLIDES,
                        "url": "https://www.slideshare.net/jgferreiro/webapps-case-study-and-publishing-applications-on-firefox-os"
                    }
                ],
                "iframeSrc": "//www.slideshare.net/slideshow/embed_code/key/i6RWO4Nmrt0eQw"
            }
        }
    },
    portfolio: [
        {
            "title": "Clotim",
            "date": "Oct 2017 - Dec 2017",
            "type": [
                "backend",
                "frontend"
            ],
            "color": {
                "hex": "#f70143",
                "rgba_gradient_start": "rgba(60, 42, 63, 0.8)",
                "rgba_gradient_end": "rgba(60, 42, 63, 0)"
            },
            "avatar": "/images/projects/clotim/clotim_icon.png",
            "background": null,
            "about": [
                "<b>Clotim</b> is an android and web app that recommends clothes to wear based on the weather around you.",
                "I teamed up with a talented spanish icon designer to create our own icon pack for Clotim, and it was the first time I publiched an Android application in the <a href=\"https://play.google.com/store/apps/details?id=com.clotim\" target=\"_blank\">Play Store</a>"
            ],
            "images": [
                {
                    "small": "/images/projects/clotim/home.png",
                    "large": "/images/projects/clotim/home.png"
                },
                {
                    "small": "/images/projects/clotim/results.png",
                    "large": "/images/projects/clotim/results.png"
                },
                {
                    "small": "/images/projects/clotim/results_2.png",
                    "large": "/images/projects/clotim/results_2.png"
                },
                {
                    "small": "/images/projects/clotim/results_3.png",
                    "large": "/images/projects/clotim/results_3.png"
                },
                {
                    "small": "/images/projects/clotim/splash.png",
                    "large": "/images/projects/clotim/splash.png"
                }
            ],
            "highlights": [
                "Top Featured app in ProductHunt in November 23th 2017 <a href=\"https://twitter.com/JGFerreiro/status/933783472279302144\" target=\"_blank\">See Tweet</a>",
                "Reached 100 votes on ProductHunt page in less than 24 hours <a href=\"https://www.producthunt.com/posts/clotim\" target=\"_blank\">See Webpage</a>"
            ],
            "stack": [
                "phonegap",
                "nodejs",
                "javascript",
                "html5",
                "css3",
                "sass",
                "gulp"
            ],
            "people": {
                "hidden": false,
                "entries": [
                    {
                        "name": "Jorge Ferreiro",
                        "avatar": "/images/projects/people/jorge.jpg",
                        "url": "https://www.linkedin.com/in/jgferreiro/"
                    },
                    {
                        "name": "Angela Duarte",
                        "avatar": "/images/projects/people/angela_duarte.jpg",
                        "url": "https://www.linkedin.com/in/angeladuartepestana/"
                    }
                ]
            },
            "links": {
                "website": "https://www.clotim.com/",
                "code": null
            }
        },
        {
            "title": "Dailyfocus",
            "date": "May 2016 - Dec 2017",
            "type": [
                "backend",
                "frontend"
            ],
            "color": {
                "hex": "#6a4171",
                "rgba_gradient_start": "rgba(60, 42, 63, 0.8)",
                "rgba_gradient_end": "rgba(60, 42, 63, 0)"
            },
            "avatar": "/images/projects/dailyfocus/dailyfocus_icon.png",
            "background": null,
            "about": [
                "<b>Dailyfocus</b> is a web application that integrates all the services employees use regularly (Gmail, Facebook, etc). It enables them to organize their work and make effective decisions."
            ],
            "images": [
                {
                    "small": "/images/projects/dailyfocus/dailyfocus_splash_small.jpg",
                    "large": "/images/projects/dailyfocus/dailyfocus_splash.jpg"
                },
                {
                    "small": "/images/projects/dailyfocus/dailyfocus_home_small.jpg",
                    "large": "/images/projects/dailyfocus/dailyfocus_home.jpg"
                },
                {
                    "small": "/images/projects/dailyfocus/services_small.jpg",
                    "large": "/images/projects/dailyfocus/services.jpg"
                }
            ],
            "highlights": [
                "College capstone project with the maximum grade (10/10)",
                "Built in 5 months the Backend, Rest API and Frontend systems from scratch, using MVC architecture and creating an extensible modular application with plugins.",
                "Integrated the Gmail API and added new functionalities on top of it, such as converting all the email into chats and quick responses.",
                "Designed a responsive interface, took and fulfilled requirements of potential users."
            ],
            "stack": [
                "nodejs",
                "jquery",
                "javascript",
                "html5",
                "css3",
                "sass",
                "mongodb",
                "redis",
                "gulp"
            ],
            "people": {
                "hidden": true,
                "entries": [
                    {
                        "name": "Jorge Ferreiro",
                        "avatar": "/images/projects/people/jorge.jpg",
                        "url": "https://github.com/ferreiro"
                    }
                ]
            },
            "links": {
                "website": "http://test.dailyfocus.io",
                "code": null
            }
        },
        {
            "title": "Jorge Ferreiro Web",
            "date": "Mar 2016 - current",
            "type": [
                "backend",
                "frontend"
            ],
            "color": {
                "hex": "#d83902",
                "rgba_gradient_start": "rgba(109, 38, 13, 0.8)",
                "rgba_gradient_end": "rgba(109, 38, 13, 0)"
            },
            "avatar": "https://pbs.twimg.com/profile_images/1062169454413578243/z_WY3jdh_400x400.jpg",
            "background": "/images/projects/ferreiro_v2/ferreiro_back.jpg",
            "images": [
                {
                    "small": "/images/projects/ferreiro_v2/home_small.jpg",
                    "large": "/images/projects/ferreiro_v2/home.jpg"
                },
                {
                    "small": "/images/projects/ferreiro_v2/about_small.jpg",
                    "large": "/images/projects/ferreiro_v2/about.jpg"
                },
                {
                    "small": "/images/projects/ferreiro_v2/portfolio_small.png",
                    "large": "/images/projects/ferreiro_v2/portfolio.jpg"
                },
                {
                    "small": "/images/projects/ferreiro_v2/contact_small.jpg",
                    "large": "/images/projects/ferreiro_v2/contact.jpg"
                }
            ],
            "about": [
                "<b>#ferreiroV2:</b> In 2016, I decided to build from scratch my new personal website. I did everything in <b>6 days</b> and released it as an open source project.",
                "<b>#ferreiroV3:</b> In late 2017, I wanted to take my website to a whole new level, so I dedicated one week to re-think the vision, improve the design and add new features aligned with my goals.",
                "Read <a href='/blog/welcome-to-my-new-digital-space-welcome-to-jorge-ferreiro-blog' target='_blank'>my blog article</a> about what's new in version 3, how I rebuilt the website and the lessons learned."
            ],
            "features": [
                "New version created in just 7 days including programming my own blogging platform.",
                "Integrated third-party services such as AWS (Amazon), MailChimp, and Mailgun.",
                "Project available open source."
            ],
            "stack": [
                "nodejs",
                "javascript",
                "jquery",
                "bower",
                "sass",
                "mongodb"
            ],
            "people": {
                "hidden": true,
                "entries": [
                    {
                        "name": "Jorge Ferreiro",
                        "avatar": "/images/projects/people/jorge.jpg",
                        "url": "https://github.com/ferreiro"
                    }
                ]
            },
            "links": {
                "website": "http://ferreiro.me/",
                "code": "https://github.com/ferreiro/website"
            }
        },
        {
            "title": "Music4deejays",
            "date": "Dec 2013 - Dec 2015",
            "type": ["backend", "frontend"],
            "color": {
                "hex": "#962828",
                "rgba_gradient_start": "rgba(69, 19, 19, 0.8)",
                "rgba_gradient_end": "rgba(69, 19, 19, 0)"
            },
            "avatar": "/images/projects/music4deejays/m4d_icon.png",
            "background": null,
            "about": [
                "<b>Music4deejays</b> is a streaming music application for listening, sharing and downloading the best electronic music from emerging artists.",
                "This project started from a problem I identified: novel music producers are not discovered by the masses since the music industry only promotes the big artists. ",
                "I created the whole application: design, backend and frontend. I also designed a strategy to spread the project to our targeted audience."
            ],
            "images": [
                {
                    "small": "/images/projects/music4deejays/music4deejays_small.jpg",
                    "large": "/images/projects/music4deejays/music4deejays.jpg"
                }
            ],
            "highlights": [
                "Achieved more than <a href='stats/' target='_blank'><strong>56k downloads</strong></a> on mobile phones by creating a strategy to drive the product to massive reach.",
                "Reached Top #5 music application on FirefoxOS Marketplace.",
                "Built my own streaming music player using the Soundcloud Rest API."
            ],
            "stack": [
                "php",
                "javascript",
                "jquery",
                "html5",
                "css3"
            ],
            "people": {
                "hidden": true,
                "entries": [
                    {
                        "name": "Jorge Ferreiro",
                        "avatar": "/images/projects/people/jorge.jpg",
                        "url": "https://github.com/ferreiro"
                    }
                ]
            },
            "links": null
        },
        {
            "title": "SudoNotes",
            "date": "Nov 2015 - April 2016",
            "type": [
                "backend",
                "frontend"
            ],
            "color": {
                "hex": "#283196",
                "rgba_gradient_start": "rgba(19, 23, 68, 0.8)",
                "rgba_gradient_end": "rgba(19, 23, 68, 0)"
            },
            "avatar": "/images/projects/sudonotes/sudonotes.jpg",
            "background": "/images/projects/sudonotes/1.png",
            "about": [
                "<b>Sudonotes</b> is the easiest way to keep all your ideas, projects and notes together.",
                "I worked with other 2 international students (from Italy and Brazil) and we delivered the project in under 3 days.",
                "It's a <strong>Python</strong> application granted 10/10 (A) in the 'GIW' college course."
            ],
            "images": [
                {
                    "small": "/images/projects/sudonotes/signup_small.png",
                    "large": "/images/projects/sudonotes/signup.jpg"
                },
                {
                    "small": "/images/projects/sudonotes/welcome_small.png",
                    "large": "/images/projects/sudonotes/welcome.jpg"
                },
                {
                    "small": "/images/projects/sudonotes/profile.png",
                    "large": "/images/projects/sudonotes/profile.jpg"
                },
                {
                    "small": "/images/projects/sudonotes/quick_tipping_small.png",
                    "large": "/images/projects/sudonotes/quick_tipping.png"
                },
                {
                    "small": "/images/projects/sudonotes/first_note_small.png",
                    "large": "/images/projects/sudonotes/first_note.png"
                }
            ],
            "highlights": null,
            "stack": [
                "python",
                "html5",
                "css3",
                "jquery",
                "SQLite3"
            ],
            "people": {
                "hidden": false,
                "entries": [
                    {
                        "name": "Jorge Ferreiro",
                        "avatar": "/images/projects/people/jorge.jpg",
                        "url": "https://github.com/ferreiro"
                    },
                    {
                        "name": "Tommaso Innocenti",
                        "avatar": "images/projects/people/tommy.jpg",
                        "url": "https://www.linkedin.com/in/tommaso-innocenti-0450708b/"
                    },
                    {
                        "name": "Luis Felipe",
                        "avatar": "images/projects/people/luis.jpg",
                        "url": "https://www.linkedin.com/in/luisdeol/"
                    }
                ]
            },
            "links": {
                "website": "http://github.com/sudonotes",
                "code": "http://github.com/ferreiro/sudonotes"
            }
        }
    ],
    [PATH_CONTACT]: {
        [PAGE_CONTENT]: {
            [PAGE_TITLE]: "Contact",
            [PAGE_SUBTITLE]: "Do you have a project, job proposal or want to say hi? Just ping me in the form below or shoot an email at <a class='email openModalBox'>jorge at ferreiro dot me</a>",
        }
    },
    [PATH_CONTACT_TALK]: {
        [PAGE_CONTENT]: {
            [PAGE_TITLE]: "Bring me to your event",
            [PAGE_SUBTITLE]: "Do you want me to speak in your congress, event or company? Send me all the details below. I would really love to be part of your event!",
        }
    }   
}

