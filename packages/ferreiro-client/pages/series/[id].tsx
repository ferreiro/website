import React from "react"
import { fetchSerieApi, FetchSerieResponse } from "../../api/blog"
import { Layout } from "../../components/Layout"

import { Post } from "../../types/Post"
import { Serie } from "../../types/Serie"
import { cx } from "emotion"
import { sharedStyles } from "../../components/config"
import { BlogItem } from "../blog"

function RelatedSeries() {
    return (
        <div className={sharedStyles.row}>
            <div className={sharedStyles.col_4}>Serie 1. </div>
            <div className={sharedStyles.col_4}>Serie 2</div>
            <div className={sharedStyles.col_4}>Serie 3</div>
        </div>
    )
}

interface Props {
    posts: Post[]
    serie: Serie
}

export default function SeriePage(props: Props) {
    return (
        <Layout title="Serie">
            <h1
                className={cx(
                    sharedStyles.title,
                    sharedStyles.center,
                    sharedStyles.marginBottom(5)
                )}
            >
                {props.serie.title} serie
            </h1>

            <div className={sharedStyles.marginTop(8)}>
                <div className={sharedStyles.row}>
                    <div className={sharedStyles.col_lg_8}>
                        {props.posts.map((post: Post) => (
                            <BlogItem post={post} />
                        ))}
                    </div>
                    <div className={sharedStyles.col_lg_4}>
                        <div className={sharedStyles.marginLeft(6)}>
                            <img src={props.serie.pic} width="100%" />
                            <p className={sharedStyles.marginTop(6)}>
                                {props.serie.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={cx(
                    sharedStyles.separator,
                    sharedStyles.marginTop(5),
                    sharedStyles.marginBottom(5)
                )}
            />

            <h3>Other series</h3>

            <RelatedSeries />
        </Layout>
    )
}

SeriePage.getInitialProps = async function(context: any) {
    const seriePermalink = context.query.id
    const serieResponse: FetchSerieResponse = await fetchSerieApi({
        permalink: seriePermalink
    })

    console.log("feched serie", serieResponse)

    return {
        serie: serieResponse.serie,
        posts: serieResponse.posts
    }
}
