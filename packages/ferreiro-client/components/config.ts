import { Page } from "../types/Page"

export default {
    meta: {
        author: "Jorge Ferreiro",
        about: ""
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
