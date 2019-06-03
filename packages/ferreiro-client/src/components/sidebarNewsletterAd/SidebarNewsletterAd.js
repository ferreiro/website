import React from 'react'
// import {Link} from 'react-router-dom'

// TODO: Substitute Link with react-router-dom
import {Link} from '../link/Link'

export const SidebarNewsletterAd = ({
    referrer = ''
}) => (
    <Link
        url={`/newsletter?referrer=${referrer}`}
        className="action_button openNewsletterSubscription margin-top-1"
        to={`/newsletter?referrer=${referrer}`}
    >
        <span
            className="icon ion-ios-paper-outline"
            style={{marginRight: '10px'}}
        />
        <span>
            Subscribe to the blog
        </span>
    </Link>
)
