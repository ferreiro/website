import React, {PureComponent} from 'react'
import classNames from 'classnames'
import {Waypoint} from 'react-waypoint';

import {Link} from '../link/Link';
import {VideoCardContent} from './VideoCardContent';
import {PlayButton} from '../buttons/PlayButton';
import {getVideoPermalink} from '../../utils/getVideoPermalink';

import './VideoCard.scss';

export class VideoCardDID extends PureComponent {
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
        const className = classNames('video', 'video--did')
        const ctaLinkClassName = classNames('video__link', 'video__link--did')
        const {
            id,
            permalink,
            type,
            title,
            subtitle,
            cta,
            companies = [],
            description,
            image,
            iframe,
            url,
        } = this.props;

        return (
            <Waypoint
                onEnter={this.onEnterVideo}
            >
                <div className={className}>
                    <div className="video__wrapper">
                        <div className="video__aside">
                            <Link
                                to={getVideoPermalink(permalink)}
                            >
                                <PlayButton />
                                {this.state.isScrolled === true && (
                                    <VideoCardContent
                                        // iframe={iframe}
                                        image={image}
                                    />
                                )}
                            </Link>
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
                                {companies.map(({alt, src} = {}) =>
                                    <img
                                        title={alt}
                                        alt={alt}
                                        src={src}
                                    />
                                )}
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

