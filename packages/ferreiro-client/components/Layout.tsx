import React from "react"
import Head from "next/head"
import { injectGlobal, css } from "emotion"

import config, {
    breakpoints,
    spacing8,
    containerMaxWidths,
    sharedStyles
} from "./config"

import { LayoutNavbar } from "./LayoutNavbar"

injectGlobal(`
    body {
        font-family: Roobert, Helvetica Neue, Helvetica, Arial, sans-serif;
    }

    p, h1, h2, h3, h4 {
        margin: 0;
        padding: 0;
    }

    @font-face {
        font-family: Roobert;
        font-weight: 400;
        src: url(/fonts/Roobert-Regular-3fe213a3618624fd7b71.woff2) format("woff2"),url(/fonts/Roobert-Regular-014ea096b0f865fa4dd9.woff) format("woff")
    }

    @font-face {
        font-family: Roobert;
        font-weight: 600;
        src: url(/fonts/Roobert-SemiBold-df85158a0012c224b021.woff2) format("woff2"),url(/fonts/Roobert-SemiBold-48a406bf82c48cfaa849.woff) format("woff")
    }

    @font-face {
        font-family: Roobert;
        font-weight: 700;
        src: url(/fonts/Roobert-Bold-7fda562c82c09fbabec2.woff2) format("woff2"),url(/fonts/Roobert-SemiBold-48a406bf82c48cfaa849.woff) format("woff")
    }
`)

function LayoutHead(props: {
    title: string
    image?: string
    description?: string
}) {
    const title = `${props.title} ${config.meta.siteName}` || config.meta.title
    const description = props.description || config.meta.title
    const image = props.image || config.meta.defaultImage

    return (
        <Head>
            <title>{title}</title>

            <link rel="canonical" href={config.meta.url} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={config.meta.url} />
            <meta property="og:site_name" content={config.meta.siteName} />
            <meta property="og:locale" content={config.meta.locale} />
            <meta property="og:image" content={image} />
            <meta property="og:image:alt" content={title} />

            <meta
                name="twitter:site"
                content={config.meta.social.twitter.site}
            />
            <meta
                name="twitter:creator"
                content={config.meta.social.twitter.creator}
            />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
            />
        </Head>
    )
}

export function LayoutContainer(props: { children: object }) {
    return <div className={styles.containerContent}>{props.children}</div>
}

export function LayoutFooter() {
    return (
        <div className={styles.footerWrapper}>
            <div className={styles.footerContent}>
                <p>Super anuncio para subscribirse a la newsletter!</p>
                Amazing footer :)
            </div>
        </div>
    )
}

export function Layout(props: {
    children: object
    description?: string
    image?: string
    title: string
}) {
    return (
        <div>
            <LayoutHead
                title={props.title}
                image={props.image}
                description={props.description}
            />
            <LayoutNavbar />
            <main className={styles.containerWrapper}>
                <LayoutContainer>{props.children}</LayoutContainer>
            </main>
            <LayoutFooter />
        </div>
    )
}

export function LayoutFullwidth(props: {
    children: object
    description?: string
    image?: string
    title: string
}) {
    return (
        <div>
            <LayoutHead
                title={props.title}
                image={props.image}
                description={props.description}
            />
            <LayoutNavbar />
            <div className={styles.containerWrapper}>{props.children}</div>
            <LayoutFooter />
        </div>
    )
}

const styles = {
    containerWrapper: css`
        padding: ${spacing8} 0;
    `,
    containerContent: css`
        margin: 0 auto;
        max-width: ${containerMaxWidths.lg};
    `,
    footerWrapper: css`
        border-top: 1px solid #f1f1f1;
        padding-top: ${spacing8};
    `,
    footerContent: css`
        margin: 0 auto;
        max-width: ${containerMaxWidths.lg};
    `
}
