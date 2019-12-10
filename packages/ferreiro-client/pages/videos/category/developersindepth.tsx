import { cx, css } from "emotion"

import { AdSubscribe } from "../../../components/Ads"
import { Layout } from "../../../components/Layout"
import { Tabs } from "../../../components/Tabs"
import { sharedStyles } from "../../../components/config"
import { VideoList } from "../../../components/VideoList"

import { fetchVideosApi } from "../../../api/videos"

import { VIDEOS_TABS, VIDEOS_DEVS_IN_DEPTH_URL } from "../constants"
import { Videos, VideosPaginated, VideosPagination } from "../../../types/Video"

function DevsInDepthHeader() {
    return (
        <div className={styles.header}>
            <div
                className={cx(sharedStyles.embedResponsive, styles.headerImage)}
            >
                <img
                    className={cx(
                        sharedStyles.embedResponsiveItem,
                        sharedStyles.responsiveImage
                    )}
                    src="/images/videos/jorge_ferreiro_hosts_developers_in_depth_devs_in_depth.jpg"
                    alt="Jorge Ferreiro hosts Developers In Depth - DevsInDepth - a program for helping junior software engineers"
                />
            </div>
        </div>
    )
}

interface Props {
    videos: Videos
    pagination: VideosPagination
}

export default function DevelopersInDepthPage(props: Props) {
    return (
        <Layout title="Developers In Depth videos ">
            <h1
                className={cx(sharedStyles.title, sharedStyles.marginBottom(5))}
            >
                Developers In Depth
            </h1>

            <Tabs activePath={VIDEOS_DEVS_IN_DEPTH_URL} tabs={VIDEOS_TABS} />

            <div className={cx(sharedStyles.marginTop_lg(8))} />

            <DevsInDepthHeader />

            <AdSubscribe />

            <div className={sharedStyles.marginTop(8)}>
                <VideoList
                    videos={props.videos}
                    ad={
                        <div
                            className={cx(
                                sharedStyles.col,
                                sharedStyles.marginHorizontal(4)
                            )}
                        >
                            <AdSubscribe />
                        </div>
                    }
                    adIndex={6}
                />
            </div>
        </Layout>
    )
}

DevelopersInDepthPage.getInitialProps = async function(
    context: any
): Promise<Props> {
    const response: VideosPaginated = await fetchVideosApi({
        q: "did|developers in depth|devsindepth|360"
    })

    return {
        videos: response.items,
        pagination: response.pagination
    }
}

const styles = {
    header: css`
        background: #010123;
    `,
    headerImage: css`
        &:before {
            padding-top: 35%;
        }
    `
}
