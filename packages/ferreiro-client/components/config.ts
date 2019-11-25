import { css } from "emotion"

import { Page } from "../types/Page"

export const breakpoints = {
    sm: "400px",
    md: "840px",
    lg: "1100px"
}

export const smallUp = `
    @media all and (min-width: ${breakpoints.sm})
`

export const mediumUp = `
    @media all and (min-width: ${breakpoints.md})
`

export const largeUp = `
    @media all and (min-width: ${breakpoints.lg})
`

export const containterMaxWidths = {
    sm: "380px",
    md: "800px",
    lg: "1050px"
}

export const spacing1 = "2px"
export const spacing2 = "4px"
export const spacing3 = "8px"
export const spacing4 = "12px"
export const spacing5 = "16px"
export const spacing6 = "24px"
export const spacing7 = "32px"
export const spacing8 = "42px"
export const spacing9 = "64px"
export const spacing10 = "96px"

export const navBarLogoHeight = "48px"

const config = {
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
            },
            linkedin: {
                username: "@jgferreiro",
                url: "https://www.linkedin.com/in/jgferreiro/"
            },
            youtube: {
                username: "@jgferreiro",
                url: "https://www.youtube.com/c/jgferreiro/"
            }
        },
        title:
            "Jorge Ferreiro - Entrepreneur, Blogger, Speaker. Frontend Software Engineer at Eventbrite, Former Backend Software Engineer at Amazon and Entrepreneur",
        url: "https://www.ferreiro.me"
    },
    colors: {
        primary: "#d83902",
        secondary: "#2c2c2c",
        navBar: "#fff",
        link: "",
        title: "",
        text: "#464646",
        separator: "#e6e6e6",
        content: ""
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
            display: "About me",
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

const spacingMapper = {
    1: spacing1,
    2: spacing2,
    3: spacing3,
    4: spacing4,
    5: spacing5,
    6: spacing6,
    7: spacing7,
    8: spacing8,
    9: spacing9
}

export const sharedStyles = {
    title: css`
        color: ${config.colors.secondary};
        font-size: ${spacing8};
        margin: 0;
        padding: 0;
    `,
    text: css`
        color: ${config.colors.text};
    `,
    right: css`
        text-align: right;
    `,
    left: css`
        text-align: left;
    `,
    center: css`
        text-align: center;
    `,
    subtitle: css`
        color: ${config.colors.secondary};
        font-size: ${spacing6};
        margin: 0;
        padding: 0;
    `,
    separator: css`
        width: 100%;
        height: 2px;
        background: ${config.colors.separator};
    `,
    button: css`
        border: 2px solid ${config.colors.secondary};
        color: #000;
        padding: ${spacing4} ${spacing5};
        text-decoration: none;
    `,
    buttonActive: css`
        border-color: ${config.colors.primary};
        background: ${config.colors.primary};
        color: #fff;
    `,
    buttonSubmit: css`
        color: #fff;
        border: 2px solid ${config.colors.secondary};
        background: ${config.colors.secondary};
        padding: ${spacing4} ${spacing5};
    `,
    inputField: css`
        border: 2px solid ${config.colors.secondary};
        padding: ${spacing4} ${spacing5};
    `,
    textarea: css`
        width: calc(100% - 2 * ${spacing3});
        padding: ${spacing3};
    `,
    marginTop: (size: number) => css`
        margin-top: ${spacingMapper[size]};
    `,
    marginLeft: (size: number) => css`
        margin-left: ${spacingMapper[size]};
    `,
    marginRight: (size: number) => css`
        margin-right: ${spacingMapper[size]};
    `,
    marginBottom: (size: number) => css`
        margin-bottom: ${spacingMapper[size]};
    `,
    marginVertical: (size: number) => css`
        margin-bottom: ${spacingMapper[size]} 0;
    `,
    marginHorizontal: (size: number) => css`
        margin: 0 ${spacingMapper[size]};
    `,
    marginBoth: (size: number) => css`
        margin: ${spacingMapper[size]};
    `,
    paddingTop: (size: number) => css`
        padding-top: ${spacingMapper[size]};
    `,
    paddingLeft: (size: number) => css`
        padding-left: ${spacingMapper[size]};
    `,
    paddingRight: (size: number) => css`
        padding-right: ${spacingMapper[size]};
    `,
    paddingBottom: (size: number) => css`
        padding-bottom: ${spacingMapper[size]};
    `,
    paddingVertical: (size: number) => css`
        padding-bottom: ${spacingMapper[size]} 0;
    `,
    paddingHorizontal: (size: number) => css`
        padding: 0 ${spacingMapper[size]};
    `,
    paddingBoth: (size: number) => css`
        padding: ${spacingMapper[size]};
    `,
    paddingCustom: (sizeVertical: number, sizeHorizontal) => css`
        padding: ${spacingMapper[sizeVertical]} ${spacingMapper[sizeHorizontal]};
    `,
    row: css`
        display: flex;
        flex-wrap: wrap;
        max-width: 100%;
    `,
    rowFull: css`
        width: 100%;
    `,
    col: css`
        flex-basis: 0;
        flex-grow: 1;
        max-width: 100%;
    `,
    col_auto: css`
        flex: 0 0 auto;
        width: auto;
        max-width: 100%;
    `,
    col_12: css`
        flex: 0 0 100%;
        max-width: 100%;
    `,
    col_11: css`
        flex: 0 0 91.666667%;
        max-width: 91.666667%;
    `,
    col_10: css`
        flex: 0 0 83.333333%;
        max-width: 83.333333%;
    `,
    col_9: css`
        flex: 0 0 83.333333%;
        max-width: 83.333333%;
    `,
    col_8: css`
        flex: 0 0 66.666667%;
        max-width: 66.666667%;
    `,
    col_6: css`
        flex: 0 0 50%;
        max-width: 50%;
    `,
    col_4: css`
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
    `,
    col_3: css`
        flex: 0 0 25%;
        max-width: 25%;
    `,
    col_2: css`
        flex: 0 0 16.666667%;
        max-width: 16.666667%;
    `,
    col_1: css`
        flex: 0 0 8.333333%;
        max-width: 8.333333%;
    `,
    col_md_12: css`
        ${mediumUp} {
            flex: 0 0 100%;
            max-width: 100%;
        }
    `,
    col_md_10: css`
        ${mediumUp} {
            flex: 0 0 83.333333%;
            max-width: 83.333333%;
        }
    `,
    col_md_8: css`
        ${mediumUp} {
            flex: 0 0 66.666667%;
            max-width: 66.666667%;
        }
    `,
    col_md_6: css`
        ${mediumUp} {
            flex: 0 0 50%;
            max-width: 50%;
        }
    `,
    col_md_4: css`
        ${mediumUp} {
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
        }
    `,
    col_md_3: css`
        ${mediumUp} {
            flex: 0 0 25%;
            max-width: 25%;
        }
    `,
    col_md_2: css`
        ${mediumUp} {
            flex: 0 0 16.666667%;
            max-width: 16.666667%;
        }
    `,
    col_lg_12: css`
        ${largeUp} {
            flex: 0 0 100%;
            max-width: 100%;
        }
    `,
    col_lg_10: css`
        ${largeUp} {
            flex: 0 0 83.333333%;
            max-width: 83.333333%;
        }
    `,
    col_lg_8: css`
        ${largeUp} {
            flex: 0 0 66.666667%;
            max-width: 66.666667%;
        }
    `,
    col_lg_6: css`
        ${largeUp} {
            flex: 0 0 50%;
            max-width: 50%;
        }
    `,
    col_lg_4: css`
        ${largeUp} {
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
        }
    `,
    col_lg_3: css`
        ${largeUp} {
            flex: 0 0 25%;
            max-width: 25%;
        }
    `,
    col_lg_2: css`
        ${largeUp} {
            flex: 0 0 16.666667%;
            max-width: 16.666667%;
        }
    `,
    displayInlineFlex: css`
        display: inline-flex !important;
    `,
    flex: css`
        display: flex !important;
    `,
    flexWrap: css`
        flex-wrap: wrap-reverse !important;
    `,
    justifyContentEnd: css`
        justify-content: flex-end !important;
    `,
    justifyContentCenter: css`
        justify-content: center !important;
    `,
    alignItemsFlexEnd: css`
        align-items: flex-end !important;
    `,
    alignItemsCenter: css`
        align-items: center !important;
    `,
    alignSelfCenter: css`
        align-self: center !important;
    `
}

export default config
