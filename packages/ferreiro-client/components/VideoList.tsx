import { cx, css } from "emotion"
import isEmpty from "lodash/isEmpty"
import Link from "next/link"

import config, { sharedStyles, spacing5, mediumUp } from "./config"
import { Sharing } from "./Sharing"
import { getVideoQualifiedUrl, getVideoUrl } from "../utils/get-url"

import { Video, Videos } from "../types/Video"
import { FaRegPlayCircle } from "react-icons/fa"

export function VideoItem(props: { video: Video }) {
    const video = props.video
    return (
        <div
            key={video.id}
            className={cx(
                sharedStyles.col_12,
                sharedStyles.col_md_6,
                sharedStyles.col_lg_4,
                sharedStyles.marginBottom(6)
            )}
        >
            <div className={sharedStyles.marginHorizontal_md(4)}>
                <Link href={getVideoUrl({ id: video.id })}>
                    <a className={styles.item} title={video.title}>
                        <div
                            className={cx(
                                styles.overlay,
                                sharedStyles.embedResponsive,
                                sharedStyles.shadowSm
                            )}
                            style={{ position: "relative" }}
                        >
                            <div className={styles.itemPlay}>
                                <FaRegPlayCircle />
                            </div>
                            <img
                                src={video.thumbnails.high.url}
                                className={cx(
                                    sharedStyles.embedResponsiveItem,
                                    sharedStyles.embedResponsive16by9,
                                    sharedStyles.responsiveImage
                                )}
                            />
                        </div>

                        <h2
                            className={cx(
                                styles.itemTitle,
                                sharedStyles.marginTop(5)
                            )}
                        >
                            {video.title}
                        </h2>
                    </a>
                </Link>

                <div
                    className={cx(sharedStyles.row, sharedStyles.marginTop(5))}
                >
                    <div className={sharedStyles.col} />
                    <div className={sharedStyles.col_auto}>
                        <Sharing
                            mini={false}
                            permalink={getVideoQualifiedUrl({
                                id: video.id
                            })}
                            summary={video.title}
                            title={video.title}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export function VideoList(props: {
    videos: Videos
    ad?: any
    adIndex?: number
}) {
    const videos = props.videos || []
    const ad = props.ad

    if (isEmpty(videos)) {
        return <p>No more videos available</p>
    }

    return (
        <div
            className={cx(
                styles.wrapper,
                sharedStyles.row,
                sharedStyles.marginHorizontal_md(4, true)
            )}
        >
            {Object.keys(videos).map((videoId: string, index: number) => {
                const video: Video = videos[videoId]

                return (
                    <>
                        <VideoItem video={video} />
                        {index === props.adIndex - 1 && ad}
                    </>
                )
            })}
        </div>
    )
}

const styles = {
    // spacing4 => 12px
    wrapper: css`
        ${mediumUp} {
            max-width: calc(100% + 24px);
        }
    `,
    item: css`
        text-decoration: none;
        &:hover {
            svg {
                opacity: 0.8 !important;
            }
        }
    `,
    itemPlay: css`
        height: 55px;
        color: #fff;
        font-size: 55px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -27.5px;
        margin-left: -27.5px;
        z-index: 1;

        svg {
            ${sharedStyles.shadowLg}
            background: rgba(0, 0, 0, 0.3);
            border-radius: 100%;
            opacity: 0;
        }
    `,
    itemTitle: css`
        color: ${config.colors.secondary};
        font-size: ${spacing5};
        line-height: 22px;
    `,
    overlay: css`
        &:after {
            width: 100%;
            height: 100%;
            content: "";
            position: absolute;
            top: 0;
            left: 0;

            &:hover {
                background: rgba(0, 0, 0, 0.1);
            }
        }
    `
}
