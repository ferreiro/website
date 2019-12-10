import { css } from "emotion"

import { Page } from "../types/Page"

export const bios = {
    small: `👨‍💻 Frontend Engineer @Eventbrite *  Past: @Amazon<br />
    📸 Speaker, Blogger, Youtuber @devsindepth<br />
    ❤️ #React #PWA #JS #Perf #DJ #tennis<br /><br />
    ~ Love to ship products! 🚀`,
    intro:
        "Jorge is a fan of musicals, software engineer and entrepreneur born in Spain. He currently is a Software Engineer at Eventbrite and host at <a href='/videos/category/developersindepth'>DevsInDepth</a>. Jorge loves web dev, PWAs, and coaching junior software engineers."
}

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

export const containerMaxWidths = {
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
            instagram: {
                username: "@jgferreiro",
                url: "https://www.instagram.com/jgferreiro/"
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
        content: "",
        twitter: {
            normal: "#00acee",
            active: "#009cd8"
        },
        youtube: {
            normal: "#c4302b",
            active: "#2867b2"
        },
        facebook: {
            normal: "#2867b2",
            active: "#1b5294"
        },
        linkedin: {
            normal: "#3b5998",
            active: "#355088"
        }
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
    separatorTransparent: css`
        width: 100%;
        height: 2px;
        background: transparent;
    `,
    button: css`
        border: 2px solid ${config.colors.secondary};
        color: #000;
        padding: ${spacing4} ${spacing5};
        text-decoration: none;
    `,
    buttonNoFill: css`
        border: 2px solid transparent;
        color: #000;
        padding: ${spacing4} ${spacing3};
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

        &:hover {
            border-color: ${config.colors.primary};
            background: ${config.colors.primary};
        }
    `,
    buttonTwitter: css`
        background: ${config.colors.twitter.normal};

        &:hover {
            background: ${config.colors.twitter.active};
        }
    `,
    buttonLinkedin: css`
        background: ${config.colors.linkedin.normal};

        &:hover {
            background: ${config.colors.linkedin.active};
        }
    `,
    buttonFacebook: css`
        background: ${config.colors.facebook.normal};

        &:hover {
            background: ${config.colors.facebook.active};
        }
    `,
    iconTwitter: css`
        color: ${config.colors.twitter.normal};

        &:hover {
            color: ${config.colors.twitter.active};
        }
    `,
    iconYoutube: css`
        color: ${config.colors.youtube.normal};

        &:hover {
            color: ${config.colors.youtube.active};
        }
    `,
    iconLinkedin: css`
        color: ${config.colors.linkedin.normal};

        &:hover {
            color: ${config.colors.linkedin.active};
        }
    `,
    iconFacebook: css`
        color: ${config.colors.facebook.normal};

        &:hover {
            color: ${config.colors.facebook.active};
        }
    `,
    inputField: css`
        border: 2px solid ${config.colors.secondary};
        padding: ${spacing4} ${spacing5};
    `,
    inputFieldSmall: css`
        border: 1px solid ${config.colors.secondary};
        padding: ${spacing3} ${spacing4};
    `,
    textarea: css`
        width: calc(100% - 2 * ${spacing3});
        padding: ${spacing3};
    `,
    marginTop: (size: number) => css`
        margin-top: ${spacingMapper[size]};
    `,
    marginTop_md: (size: number) => css`
        ${mediumUp} {
            ${sharedStyles.marginTop(size)}
        }
    `,
    marginTop_lg: (size: number) => css`
        ${largeUp} {
            ${sharedStyles.marginTop(size)}
        }
    `,
    marginLeft: (size: number) => css`
        margin-left: ${spacingMapper[size]};
    `,
    marginLeft_lg: (size: number) => css`
        ${largeUp} {
            margin-left: ${spacingMapper[size]};
        }
    `,
    marginRight: (size: number) => css`
        margin-right: ${spacingMapper[size]};
    `,
    marginBottom: (size: number) => css`
        margin-bottom: ${spacingMapper[size]};
    `,
    marginVertical: (size: number) => css`
        margin-top: ${spacingMapper[size]};
        margin-bottom: ${spacingMapper[size]};
    `,
    marginHorizontal: (size: number, isNegative?: boolean) => css`
        ${isNegative
            ? `margin: 0 -${spacingMapper[size]};`
            : `margin: 0 ${spacingMapper[size]};`}
    `,
    marginHorizontal_md: (size: number, isNegative?: boolean) => css`
        ${mediumUp} {
            ${isNegative
                ? `margin: 0 -${spacingMapper[size]};`
                : `margin: 0 ${spacingMapper[size]};`}
        }
    `,
    marginHorizontal_lg: (size: number, isNegative?: boolean) => css`
        ${largeUp} {
            ${isNegative
                ? `margin: 0 -${spacingMapper[size]};`
                : `margin: 0 ${spacingMapper[size]};`}
        }
    `,
    notification: css``,
    notificationError: css`
        background: red;
        color: #fff;
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
        padding-top: ${spacingMapper[size]};
        padding-bottom: ${spacingMapper[size]};
    `,
    paddingVertical_md: (size: number) => css`
        ${mediumUp} {
            ${sharedStyles.paddingVertical(size)}
        }
    `,
    paddingVertical_lg: (size: number) => css`
        ${largeUp} {
            ${sharedStyles.paddingVertical(size)}
        }
    `,
    paddingHorizontal: (size: number) => css`
        padding-left: ${spacingMapper[size]};
        padding-right: ${spacingMapper[size]};
    `,
    paddingHorizontal_md: (size: number) => css`
        ${mediumUp} {
            ${sharedStyles.paddingHorizontal(size)}
        }
    `,
    paddingHorizontal_lg: (size: number) => css`
        ${largeUp} {
            ${sharedStyles.paddingHorizontal(size)}
        }
    `,
    paddingBoth: (size: number) => css`
        padding: ${spacingMapper[size]};
    `,
    paddingCustom: (sizeVertical: number, sizeHorizontal) => css`
        padding: ${spacingMapper[sizeVertical]} ${spacingMapper[sizeHorizontal]};
    `,
    circle: css`
        border-radius: 100%;
    `,
    rounded: css`
        border-radius: 2px;
    `,
    shadow: css`
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    `,
    shadowSm: css`
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
    `,
    shadowLg: css`
        box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
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
    col_5: css`
        flex: 0 0 41.666667%;
        max-width: 41.666667%;
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
    col_lg_9: css`
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
    embedResponsive: css`
        position: relative;
        display: block;
        width: 100%;
        padding: 0;
        overflow: hidden;

        &:before {
            content: "";
            padding-top: 56.25%;
            display: block;
        }
    `,
    embedResponsive16by9: css``,
    embedResponsiveItem: css`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
    `,
    responsiveImage: css`
        object-fit: cover;
        object-position: center;
    `,
    flex: css`
        display: flex !important;
    `,
    flexDirectionRow: css`
        flex-direction: row;
    `,
    flexDirectionColumn: css`
        flex-direction: column;
    `,
    flexWrap: css`
        flex-wrap: wrap-reverse !important;
    `,
    justifyContentStart: css`
        justify-content: flex-start !important;
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
