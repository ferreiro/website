import React from 'react'

import './GenericAd.scss'
import {Link} from 'react-router-dom'

export const GenericAd = ({
    title,
    ctaText,
    link,
    useExternalLink = false,
}) => {
    const buttonCta = useExternalLink ? (
        <a
            href={link}
            className="generic-ad__button"
            target="_blank"
            rel="noopener noreferrer"
        >
            {ctaText}
        </a>
    ) : (
        <Link to={link} className="generic-ad__button">
            {ctaText}
        </Link>
    )

    return (
        <div className="generic-ad">
            <div className="generic-ad__wrapper">
                <div className="generic-ad__content">
                    <h3 className="generic-ad__title">
                        {title}
                    </h3>
                    {buttonCta}
                </div>
            </div>
        </div>
    );
}