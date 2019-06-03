import React from 'react'
import {Link} from 'react-router-dom'
import LazyLoad from 'react-lazy-load'

import './CardRelatedPost.scss'

const DEFAULT_MAX_SUMMARY_LENGTH = 150

export const CardRelatedPost = ({
    maxSummaryLength = DEFAULT_MAX_SUMMARY_LENGTH,
    post,
}) => {
    const {
        permalink,
        pic,
        summary,
        title,
    } = post

    const summaryShortened = summary.substr(0, maxSummaryLength)

    return (
        <Link
            to={permalink}
        >
            <div className="card-related-post">
                <LazyLoad debounce={false}>
                    <img className="card-related-post__image" src={pic} alt={title} />
                </LazyLoad>
                <div className="card-related-post__content">
                    <h2 className="card-related-post__title">
                        {title}
                    </h2>
                    <p className="card-related-post__summary">
                        {summaryShortened}
                    </p>
                </div>
            </div>
        </Link>
    )
}
