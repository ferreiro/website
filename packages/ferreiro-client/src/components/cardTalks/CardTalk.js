import React from 'react'
import {LazyLoadImage} from 'react-lazy-load-image-component';

import './CardTalk.scss'

const DEFAULT_MAX_SUMMARY_LENGTH = 150

const renderButton = ({
    url,
    title,
    type,
} = {}) => {
    switch (type) {
        case "video":
            return (
                <a
                    className="card-talk-button"
                    href={url}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span className="icon ion-ios-film-outline" />
                    <p className="legend">
                        Video
                    </p>
                </a>
            )
        case "slides":
            return (
                <a
                    className="card-talk-button"
                    href={url}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span className="icon ion-ios-browsers-outline" />
                    <p className="legend">
                        Slides
                    </p>
                </a>
            )
        case "image":
            return (
                <a
                    className="card-talk-button"
                    href={url}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span className="icon ion-image" />
                    <p className="legend">
                        {title}
                    </p>
                </a>
            )
        default:
            return null
    }
}

export const CardTalk = ({
    maxSummaryLength = DEFAULT_MAX_SUMMARY_LENGTH,
    talk,
}) => {
    const {
        buttons = [],
        permalink,
        pic,
        summary = '',
        title,
    } = talk

    const summaryShortened = summary.substr(0, maxSummaryLength)

    return (
        <a
            href={permalink}
            rel="noopener noreferrer"
            target="_blank"
        >
            <div className="card-talk">
                <div className="card-talk__image">
                    <LazyLoadImage
                        src={pic} 
                        alt={title}
                        effect="blur"
                        placeholder={
                            <p>Loading... TODO: Replace with a facebook loader</p>
                        }
                    />
                    {/* <LazyLoad debounce={false}>
                        <img src={pic} alt={title} />
                    </LazyLoad> */}
                </div>

                <div className="card-talk__content">
                    <h2 className="card-talk__title">
                        {title}
                    </h2>
                    <p className="card-talk__summary">
                        {summaryShortened}
                    </p>
                </div>

                <ul className="card-talk__options">
                    {buttons.map(renderButton)}
                </ul>
            </div>
        </a>
    )
}
