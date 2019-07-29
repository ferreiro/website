import React, {PureComponent} from 'react'
import {Waypoint} from 'react-waypoint'
import {Link} from 'react-router-dom'
import classnames from 'classnames'

import './ConferenceAd.scss'
import {translate} from '../../i18-me/i18-me';

export class ConferenceAd extends PureComponent {
    state = {
        isShown: false,
    }

    static defaultProps = {
        showMoreInfo: true,
    }

    onEnter = () => {
        if (this.state.isShown) {
            return
        }

        this.setState({isShown: true})
    }

    render = () => (
        <Waypoint
            onEnter={this.onEnter}
            // onLeave={}
        >
            <div
                className={classnames(
                    'conference-ad', {
                        [this.props.extraClassNames]: this.props.extraClassNames
                    }
                )}
            >
                <div className="conference-ad__wrapper">
                    <div className="conference-ad__content">
                        <h3 className="conference-ad__title">
                            Do you want me to speak in your congress, event or company?
                        </h3>
                        <div className="conference-ad__options">
                            <Link
                                title={translate('Contact Jorge Ferreiro to give a Conference. Frontend Software Engineer')}
                                className="conference-ad__button"
                                to="/contact/talk"
                            >
                                {translate('Contact me!')}
                            </Link>

                            {this.props.showMoreInfo &&
                                <Link
                                    title={translate('Contact Jorge Ferreiro to give a Conference. Frontend Software Engineer')}
                                    className="conference-ad__button conference-ad__button--more-info"
                                    to="/talks/info"
                                >
                                    {translate('More info')}
                                </Link>
                            }
                        </div>
                    </div>
                    <div className="conference-ad__image">
                        <img
                            alt="Jorge Ferreiro. Frontend Software Engineer and public speaker on technical and motivational topics."
                            src="/images/talks/jorge_ferreiro_frontend_software_engineer_andpublic_technical_speaker_blogger_writer_and_motivational_speaker.png"
                        />
                    </div>
                </div>
            </div>
        </Waypoint>
    )
}