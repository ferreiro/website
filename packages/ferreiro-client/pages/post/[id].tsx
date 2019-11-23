import React from "react"
import Head from "next/head"

// https://www.creativebloq.com/how-to/build-an-seo-friendly-head-component-for-nextjsreact
// TODO: Copy this from the current .pug
function PostMeta(props: {
    // post
}) {
    return (
        <Head>
            <title>Post!!!</title>
            <meta name="description" content="" />
            <meta property="og:type" content="website" />
            <meta name="og:title" property="og:title" content="" />
            <meta name="og:description" property="og:description" content="" />
            <meta property="og:site_name" content="" />
            <meta property="og:url" content="" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="" />
            <meta name="twitter:description" content={props.desc} />
            <meta name="twitter:site" content="" />
            <meta name="twitter:creator" content="" />
            <link
                rel="icon"
                type="image/png"
                href="/static/images/favicon.ico"
            />
            <link rel="apple-touch-icon" href="/static/images/favicon.ico" />
            <link rel="stylesheet" href="" />
            <meta property="og:image" content="" />
            <meta name="twitter:image" content="" />
            <link rel="canonical" href="" />
        </Head>
    )
}

export default function Post() {
    return <div>Welcome to the post!!</div>
}
