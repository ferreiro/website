import React, {PureComponent} from 'react'
import classNames from 'classnames'
import {Waypoint} from 'react-waypoint'

import {Link} from '../link/Link'
import {VideoCardContent} from './VideoCardContent';

import './VideoCard.scss';

export class VideoCard extends PureComponent {
    state = {
        isScrolled: false,
    }

    onEnterVideo = () => {
        if (this.state.isScrolled === true) {
            return;
        }

        this.setState({isScrolled: true})
    }

    render() {
        const className = classNames('video', 'video--regular')
        const ctaLinkClassName = classNames('video__link')
        const {
            id,
            type,
            title,
            subtitle,
            cta,
            companies = [],
            description,
            iframe,
            image,
            url,
        } = this.props;

        return (
            <Waypoint
                onEnter={this.onEnterVideo}
            >
                <div className={className}>
                    <div className="video__wrapper">
                        <div className="video__aside">
                            {this.state.isScrolled === true && (
                                <VideoCardContent iframe={iframe} image={image} />
                            )}
                        </div>
                        <div className="video__content">
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
            </Waypoint>
        );
    }
}

