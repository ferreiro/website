import React from 'react'
import {LazyLoadImage} from 'react-lazy-load-image-component';

import './CardTalk.scss'
import { Link } from '../link/Link';
import { TARGET_BLANK } from '../constants';

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

    const SEOTitle = `Jorge Ferreirto article ${title}`
    const summaryShortened = summary.substr(0, maxSummaryLength)

    return (
        <Link
            href={permalink}
            target={TARGET_BLANK}
            title={SEOTitle}
        >
            <div className="card-talk">
                <div className="card-talk__image">
                    <LazyLoadImage
                        src={pic} 
                        alt={SEOTitle}
                        effect="blur"
                        placeholder={
                            <p>Loading... TODO: Replace with a facebook loader</p>
                        }
                    />
                </div>

                <div className="card-talk__content">
                    <h2 className="card-talk__title">
                        <Link
                            href={permalink}
                            target={TARGET_BLANK}
                            title={SEOTitle}
                        >
                            {title}
                        </Link>
                    </h2>
                    <p className="card-talk__summary">
                        {summaryShortened}
                    </p>
                </div>

                <ul className="card-talk__options">
                    {buttons.map(renderButton)}
                </ul>
            </div>
        </Link>
    )
}
