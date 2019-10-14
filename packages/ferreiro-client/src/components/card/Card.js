import React from 'react'
import {Link} from 'react-router-dom'
import LazyLoad from 'react-lazy-load'
import { LazyLoadImage } from 'react-lazy-load-image-component';

// import {Link} from '../atoms/link/Link'

import './Card.scss'
const DEFAULT_MAX_SUMMARY_LENGTH = 150

export const Card = ({
    permalink,
    title,
    summary = '',
    maxSummaryLength = DEFAULT_MAX_SUMMARY_LENGTH,
    image,
    series,
}) => {
    const SEOTitle = `Jorge Ferreirto article ${title}`
    const summaryShortened = summary.substr(0, maxSummaryLength)

    console.log(series)

    return (
        <Link
            to={permalink}
            title={SEOTitle}
        >
            <article className="card">
                <div className="card__image">
                    <LazyLoadImage
                        src={image} 
                        alt={SEOTitle}
                        effect="blur"
                    />
                </div>
                <div className="card__content">
                    <h2 className="card__title">
                        <Link
                            to={permalink}
                            title={SEOTitle}
                        >
                            {title}
                        </Link>
                    </h2>
                    <p className="card__summary">
                        {summaryShortened}
                    </p>
                    {series && (
                        <p>
                            This post belongs to {series.title.substr(0, 50)} series
                        </p>
                    )}
                </div>
            </article>
        </Link>
    )
}
