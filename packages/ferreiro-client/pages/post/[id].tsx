import React from "react"
import Head from "next/head"

// https://www.creativebloq.com/how-to/build-an-seo-friendly-head-component-for-nextjsreact
// TODO: Copy this from the current .pug
function PostMeta(props: {
    // post
}) {
    const description = props.description || "TODO: Put default description"

    return (
        <Head>
            <title>Post!!!</title>
            <meta name="description" content="" />

            <meta property="og:title" content="" name="og:title" />
            <meta property="og:description" content="" name="og:description" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="" />
            <meta property="og:url" content="" />
            <meta property="og:image" content="" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="" />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:site" content="" />
            <meta name="twitter:creator" content="" />
            <meta name="twitter:image" content="" />

            <link
                rel="icon"
                type="image/png"
                href="/static/images/favicon.ico"
            />
            <link rel="apple-touch-icon" href="/static/images/favicon.ico" />
            <link rel="stylesheet" href="" />
        </Head>
    )
}

export default function Post() {
    return <div>Welcome to the post!!</div>
}
