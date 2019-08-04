import React from 'react'
import {Link} from 'react-router-dom'
import LazyLoad from 'react-lazy-load'

import {PlayButton} from '../buttons/PlayButton'
import {getVideoPermalink} from '../../utils/getVideoPermalink'

import './CardRelatedVideo.scss'

const DEFAULT_MAX_SUMMARY_LENGTH = 150

export const CardRelatedVideo = ({
    maxSummaryLength = DEFAULT_MAX_SUMMARY_LENGTH,
    video = {},
}) => {
    const {
        permalink,
        image = {},
        subtitle,
        title,
    } = video

    const {
        src,
        alt
    } = image

    return (
        <Link
            to={getVideoPermalink(permalink)}
        >
            <div className="card-related-video">
                <div className="card-related-video__image">
                    <PlayButton />
                    <LazyLoad debounce={false}>
                        <img
                            alt={alt}
                            src={src}
                            title={alt}
                        />
                    </LazyLoad>
                </div>
                <div className="card-related-video__content">
                    <h2 className="card-related-video__title">
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    )
}
