import React from "react"
import Head from "next/head"
import isEmpty from "lodash/isEmpty"
import { cx } from "emotion"
import { useRouter } from "next/router"

import { Layout } from "../../components/Layout"
import { sharedStyles } from "../../components/config"

import { Post } from "../../types/Post"

// https://www.creativebloq.com/how-to/build-an-seo-friendly-head-component-for-nextjsreact
// TODO: Copy this from the current .pug
function PostMeta(props: {
    // post
    description?: string
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

interface Props {
    post?: Post
}

function PostDetail(props: Props) {
    if (!props.post || isEmpty(props.post)) {
        return (
            <Layout title="Videos of">
                <p>Post not found or does not exist</p>
            </Layout>
        )
    }
    return (
        <Layout title="Videos of">
            <PostMeta />
            <h1
                className={cx(sharedStyles.title, sharedStyles.marginBottom(5))}
            >
                {props.post.title}
            </h1>

            <div className={sharedStyles.marginTop(8)}>
                <div className={sharedStyles.row}>This is a post</div>
            </div>
        </Layout>
    )
}

PostDetail.getInitialProps = async function(context: any): Promise<Props> {
    const permalink = context.query.id
    const paginatedResponse = await fetch(
        `http://localhost:4000/api/v1/blog/${permalink}`,
        { method: "GET", mode: "no-cors" }
    )
    const post = await paginatedResponse.json()

    console.log(`Post fetched. Count: ${post.length}`)

    return {
        post
    }
}

export default PostDetail
