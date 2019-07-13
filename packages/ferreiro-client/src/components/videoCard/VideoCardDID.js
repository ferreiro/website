import React from 'react'
import classNames from 'classnames'
import {Link} from '../link/Link';

import './VideoCard.scss';

export const VideoCardDID = ({
    id,
    type,
    title,
    subtitle,
    cta,
    companies = [],
    description,
    image,
    url,
}) => {
    const className = classNames('video', 'video--did')
    const ctaLinkClassName = classNames('video__link', 'video__link--did')

    return (
        <div className={className}>
            <div className="video__wrapper">
                <div className="video__aside">
                    <img
                        className="video__aside--did-image"
                        src={image}
                    />
                </div>
                <div className="video__content">
                    <Link url="https://devsindepth.com" target="_blank">
                        <img
                            className="video__program"
                            height="90px"
                            src="https://www.devsindepth.com/static/logo_developers_in_depth_by_jorge_ferreiro.svg"
                        />
                    </Link>

                    <div className="video__user">
                        <h2 className="video__title">
                            {title}
                        </h2>
                        <h3 className="video__subtitle">
                            {subtitle}
                        </h3>
                    </div>


                    <div className="video__companies">
                        {companies.map((src) => <img src={src} />)}
                    </div>
                    
                    <p className="video__description">
                        {description}
                    </p>

                    <Link
                        url={url}
                        target='_blank'
                        className={ctaLinkClassName}
                    >
                        {cta}
                    </Link>
                </div>
            </div>
        </div>
    );
}