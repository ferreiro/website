import React from "react"
import Head from "next/head"

import config from "./config"

import { LayoutContainer } from "./LayoutContainer"
import { LayoutHeader } from "./LayoutHeader"

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
            <LayoutHeader />
            <LayoutContainer>{props.children}</LayoutContainer>
        </div>
    )
}
