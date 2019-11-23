import { Page } from "../types/Page"

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
        main: "",
        secondary: "",
        link: "",
        title: "",
        content: ""
    },
    breakpoints: {
        small: "400px",
        medium: "840px",
        large: "1100px"
    },
    menu: {
        [Page.home]: {
            display: "Home",
            path: "/",
            type: Page.home
        },
        [Page.blog]: {
            display: "Blog",
            path: "/blog",
            type: Page.blog
        },
        [Page.videos]: {
            display: "Videos",
            path: "/videos",
            type: Page.videos
        },
        [Page.talks]: {
            display: "Talks",
            path: "/talks",
            type: Page.talks
        },
        [Page.about]: {
            display: "About",
            path: "/about",
            type: Page.about,
            submenu: {
                [Page.biography]: {
                    display: "Biography",
                    path: "/about",
                    type: Page.biography
                },
                [Page.resume]: {
                    display: "Resume",
                    path: "/resume",
                    type: Page.resume
                },
                [Page.videocall]: {
                    display: "Videocall",
                    path: "/videocall",
                    type: Page.videocall
                }
            }
        },
        [Page.contact]: {
            display: "Contact",
            path: "/contact",
            type: Page.contact
        }
    }
}
