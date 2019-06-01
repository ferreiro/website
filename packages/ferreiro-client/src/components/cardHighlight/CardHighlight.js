import React from 'react'
import {Link} from 'react-router-dom'

import './CardHighlight.scss'

const DEFAULT_MAX_SUMMARY_LENGTH = 150
const DEFAULT_MAX_TITLE_LENGTH = 60

export const CardHighlight = ({
    permalink,
    title = '',
    summary = '',
    maxSummaryLength = DEFAULT_MAX_SUMMARY_LENGTH,
    maxTitleLength = DEFAULT_MAX_TITLE_LENGTH,
    image,
}) => {
    const titleShortened = title.substr(0, maxTitleLength)
    const summaryShortened = summary.substr(0, maxSummaryLength)

    return (
        <Link
            to={permalink}
        >
            <div className="card-highlight">
                <img className="card-highlight__image" src={image} alt={title} />
                <div className="card-highlight__content">
                    <h2 className="card-highlight__title">
                        {titleShortened}
                        {titleShortened.length < title.length && '...'}
                    </h2>
                    <p className="card-highlight__summary">
                        {summaryShortened}
                    </p>
                </div>
            </div>
        </Link>
    )
}
