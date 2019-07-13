import React from 'react'

import './ConferenceAd.scss'
import {Link} from 'react-router-dom'

export const ConferenceAd = () => {

    return (
        <div className="conference-ad">
            <div className="conference-ad__wrapper">
                <div className="conference-ad__content">
                    <h3 className="conference-ad__title">
                        Do you want me to speak in your congress, event or company?
                    </h3>
                    <Link to="/contact/talk" className="conference-ad__button">
                        Book me!
                    </Link>
                </div>
                <div className="conference-ad__image">
                    <img src="/images/talks/talk.png" />
                </div>
            </div>
        </div>
    );
}