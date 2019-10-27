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
    pic,
    series,
    ...rest
}) => {
    const SEOTitle = `Jorge Ferreirto article ${title}`
    const summaryShortened = summary.substr(0, maxSummaryLength)

    console.log('Card')
    console.log(series)
    console.log(rest)
    console.log(pic)

    return (
        <Link
            to={permalink}
            title={SEOTitle}
        >
            <article className="card">
                <div className="card__image">
                    <LazyLoadImage
                        src={pic} 
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
{/* 
                    <Link url="https://devsindepth.com" target="_blank">
                        <img
                            height="60px"
                            src="https://www.devsindepth.com/static/logo_developers_in_depth_by_jorge_ferreiro.svg"
                        />
                    </Link> */}

                </div>
            </article>
        </Link>
    )
}
