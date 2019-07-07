import React from 'react'
import {Link} from 'react-router-dom'
import LazyLoad from 'react-lazy-load'

import './CardTalk.scss'

const DEFAULT_MAX_SUMMARY_LENGTH = 150

export const CardTalk = ({
    maxSummaryLength = DEFAULT_MAX_SUMMARY_LENGTH,
    talk,
}) => {
    const {
        permalink,
        pic,
        summary = '',
        title,
    } = talk

    const summaryShortened = summary.substr(0, maxSummaryLength)

    return (
        <Link
            to={permalink}
        >
            <div className="card-talk">
                <div className="card-talk__image">
                    <LazyLoad debounce={false}>
                        <img src={pic} alt={title} />
                    </LazyLoad>
                </div>
                <div className="card-talk__content">
                    <h2 className="card-talk__title">
                        {title}
                    </h2>
                    <p className="card-talk__summary">
                        {summaryShortened}
                    </p>
                </div>
            </div>
        </Link>
    )
}
