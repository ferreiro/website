import React, {PureComponent} from 'react'
import {Waypoint} from 'react-waypoint'
import {Link} from 'react-router-dom'
import classnames from 'classnames'

import './ConferenceAd.scss'
import { translate } from '../../i18-me/i18-me';

export class ConferenceAd extends PureComponent {
    state = {
        isShown: false,
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
                        <Link to="/contact/talk" className="conference-ad__button">
                            {translate('Contact me!')}
                        </Link>
                    </div>
                    <div className="conference-ad__image">
                        <img src="/images/talks/talk.png" />
                    </div>
                </div>
            </div>
        </Waypoint>
    )
}