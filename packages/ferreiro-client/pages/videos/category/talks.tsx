import { cx } from "emotion"

import { AdConference } from "../../../components/Ads"
import { Layout } from "../../../components/Layout"
import { sharedStyles } from "../../../components/config"
import { Tabs } from "../../../components/Tabs"
import { VideoList } from "../../../components/VideoList"

import { fetchTalksVideosApi } from "../../../api/videos"

import { VIDEOS_TABS, VIDEOS_TALKS_URL } from "../constants"
import { Videos, VideosMultilanguagePaginated } from "../../../types/Video"

interface Props {
    englishVideos: Videos
    spanishVideos: Videos
}

export default function Talks(props: Props) {
    return (
        <Layout title="Developers In Depth videos ">
            <h1
                className={cx(sharedStyles.title, sharedStyles.marginBottom(5))}
            >
                Talks and conferences
            </h1>

            <Tabs activePath={VIDEOS_TALKS_URL} tabs={VIDEOS_TABS} />

            <div className={cx(sharedStyles.marginTop(7))} />

            <AdConference />

            <div className={sharedStyles.marginTop(7)}>
                <h2 className={sharedStyles.marginBottom(6)}>
                    Conferences in english
                </h2>

                <VideoList videos={props.englishVideos} />

                <h2
                    className={cx(
                        sharedStyles.marginTop(5),
                        sharedStyles.marginBottom(6)
                    )}
                >
                    Conferences in spanish
                </h2>
                <VideoList videos={props.spanishVideos} />
            </div>
        </Layout>
    )
}

Talks.getInitialProps = async function(context: any): Promise<Props> {
    const response: VideosMultilanguagePaginated = await fetchTalksVideosApi()

    console.log(response)

    return {
        englishVideos: response.englishVideos.items,
        spanishVideos: response.spanishVideos.items
    }
}
