import { cx } from "emotion"

import { Layout } from "../../components/Layout"
import { sharedStyles } from "../../components/config"
import { Tabs } from "../../components/Tabs"
import { VideoList } from "../../components/VideoList"

import { fetchVideosApi } from "../../api/videos"

import { VIDEOS_TABS } from "./constants"
import { VideosPaginated, Videos, VideosPagination } from "../../types/Video"

interface Props {
    videos: Videos
    pagination: VideosPagination
}

export default function VideosPage(props: Props) {
    const videos = props.videos

    console.log("videos", videos)

    return (
        <Layout title="Videos of">
            <h1
                className={cx(sharedStyles.title, sharedStyles.marginBottom(5))}
            >
                Videos
            </h1>

            <Tabs activePath="/videos" tabs={VIDEOS_TABS} />

            <div className={sharedStyles.marginTop(8)}>
                <VideoList videos={videos} />
            </div>
        </Layout>
    )
}

VideosPage.getInitialProps = async function(context: any): Promise<Props> {
    const permalink = context.query.id

    const response: VideosPaginated = await fetchVideosApi({ q: "" })

    console.log("response", response)

    return {
        videos: response.items,
        pagination: response.pagination
    }
}
