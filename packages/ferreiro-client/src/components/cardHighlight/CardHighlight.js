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
    const SEOTitle = `Jorge Ferreirto article ${title}`
    const titleShortened = title.substr(0, maxTitleLength)
    const summaryShortened = summary.substr(0, maxSummaryLength)

    return (
        <Link
            className="card-highlight"
            to={permalink}
            title={SEOTitle}
        >
            <article className="card-highlight">
                <img
                    alt={SEOTitle}
                    className="card-highlight__image"
                    src={image}
                />
                <div className="card-highlight__content">
                    <h2 className="card-highlight__title">
                        <Link
                            to={permalink}
                            title={SEOTitle}
                        >
                            {titleShortened}
                            {titleShortened.length < title.length && '...'}
                        </Link>
                    </h2>
                    <p className="card-highlight__summary">
                        {summaryShortened}
                    </p>
                </div>
            </article>
        </Link>
    )
}
