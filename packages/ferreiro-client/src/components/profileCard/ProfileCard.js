import React from 'react'
import {Link} from '../link/Link'

import {
    SOCIAL_NETWORKS,
    TARGET_BLANK,
} from '../constants'

import './ProfileCard.scss'


export const ProfileCard = () => (
    <div className="profile-card">
        <img
            width="60px"
            className="profile-card__image"
            src="https://pbs.twimg.com/profile_images/1062169454413578243/z_WY3jdh_400x400.jpg"
        />

        <h3 className="profile-card__title">
            Jorge Ferreiro
        </h3>

        <p className="profile-card__subtitle">
            Software Engineer and Entrepreneur
        </p>

        <ul className="profile-card__links">
            {SOCIAL_NETWORKS.map(({icon, text, url}) => (
                <li
                    key={icon}
                    className="profile-card__link"
                >
                    <Link
                        url={url}
                        target={TARGET_BLANK}
                    >
                        <span className={icon} />
                        <p>{text}</p>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
)