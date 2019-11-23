import { Page } from "../types/Page"

export const breakpoints = {
    small: "400px",
    medium: "840px",
    large: "1100px"
}

export const spacing1 = "2px"
export const spacing2 = "4px"
export const spacing3 = "8px"
export const spacing4 = "16px"
export const spacing5 = "24px"
export const spacing6 = "32px"
export const spacing7 = "42px"
export const spacing8 = "64px"
export const spacing9 = "96px"

export const headerLogoHeight = "48px"

export default {
    meta: {
        about: "",
        author: "Jorge Ferreiro",
        siteName: "Jorge Ferreiro",
        description:
            "Jorge Ferreiro is a Entrepreneur, Blogger and Speaker. Jorge is a Frontend Software Engineer at Eventbrite, Former Backend Software Engineer at Amazon and Entrepreneur with a solid experience in web development. Ferreiro uses the following technologies: Node, Javascript, Python, Java, MongoDB, Redis, HTML5, CSS3.",
        defaultImage: "",
        locale: "en_US",
        social: {
            twitter: {
                site: "@jgferreiro",
                creator: "@jgferreiro",
                username: "@jgferreiro",
                url: "https://twitter.com/JGFerreiro"
            }
        },
        title:
            "Jorge Ferreiro - Entrepreneur, Blogger, Speaker. Frontend Software Engineer at Eventbrite, Former Backend Software Engineer at Amazon and Entrepreneur",
        url: "https://www.ferreiro.me"
    },
    colors: {
        primary: "#d83902",
        secondary: "#2c2c2c",
        link: "",
        title: "",
        content: ""
    },
    menu: {
        [Page.home]: {
            display: "Home",
            order: 0,
            path: "/",
            type: Page.home
        },
        [Page.blog]: {
            display: "Blog",
            order: 1,
            path: "/blog",
            type: Page.blog
        },
        [Page.videos]: {
            display: "Videos",
            order: 22,
            path: "/videos",
            type: Page.videos
        },
        [Page.talks]: {
            display: "Talks",
            order: 3,
            path: "/talks",
            type: Page.talks
        },
        [Page.about]: {
            display: "About me",
            order: 4,
            path: "/about",
            type: Page.about,
            submenu: {
                [Page.biography]: {
                    order: 0,
                    display: "Biography",
                    path: "/about",
                    type: Page.biography
                },
                [Page.resume]: {
                    order: 1,
                    display: "Resume",
                    path: "/resume",
                    type: Page.resume
                },
                [Page.videocall]: {
                    order: 2,
                    display: "Videocall",
                    path: "/videocall",
                    type: Page.videocall
                }
            }
        },
        [Page.contact]: {
            display: "Contact",
            order: 5,
            path: "/contact",
            type: Page.contact
        }
    }
}
