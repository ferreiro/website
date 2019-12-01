import React, { useEffect } from "react"
import Error from "next/error"
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

function FollowSeries() {
    function onClick() {
        alert(
            "Implement. Open a modal to get the newsletter... I can also add the user to mailchimp inside a group for this series..."
        )
    }

    return (
        <div className={sharedStyles.row}>
            <button
                onClick={onClick}
                className={cx(
                    sharedStyles.col_12,
                    sharedStyles.marginTop(5),
                    sharedStyles.buttonSubmit
                )}
            >
                Follow the series
            </button>
        </div>
    )
}

interface Props {
    posts: Post[]
    serie: Serie
    serieSubConfirmation: boolean
}

export default function SeriePage(props: Props) {
    if (!props.serie) {
        return (
            <Error
                title="Series not found or you don't have permissions to see it"
                statusCode={404}
            />
        )
    }

    useEffect(() => {
        if (props.serieSubConfirmation && window) {
            window.alert(
                "TODO: Open popup, cause user wants to subscribe to the serie"
            )
        }
    })

    return (
        <Layout title="Serie">
            <h1
                className={cx(
                    sharedStyles.title,
                    sharedStyles.center,
                    sharedStyles.marginBottom(5)
                )}
            >
                {props.serie.title} series
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

                            <FollowSeries />

                            <h3 className={sharedStyles.marginTop(6)}>
                                About this series
                            </h3>
                            <p className={sharedStyles.marginTop(4)}>
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
    // NB: You can force prompting the user to show a popup modal for subscribing
    const serieSubConfirmation = context.query.sub_confirmation
    const serieResponse: FetchSerieResponse = await fetchSerieApi({
        permalink: seriePermalink
    })

    console.log("feched serie", serieResponse)

    return {
        serie: serieResponse.serie,
        serieSubConfirmation,
        posts: serieResponse.posts
    }
}
