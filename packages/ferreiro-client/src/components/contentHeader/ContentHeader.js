import React from 'react'
import {Waypoint} from 'react-waypoint'

import './ContentHeader.scss'

const onEnterViewport = () => {
    console.log('On Enter')
}

const onLeaveViewport = () => {
    console.log('On leave')
}

export const ContentHeader = ({
    extraContent = null,
    title,
    subtitle,
    showSubscribeButton = false,
}) => (
    <Waypoint
        onEnter={onEnterViewport}
        onLeave={onLeaveViewport}
    >
        <div className="blog-header">
            <div
                style={{
                    flex: '1 1 auto'
                }}
            >
                <h1
                    className="blog-header__title"
                    style={{
                        fontFamily: 'aktiv-grotesk, sans-serif',
                    }}
                >
                    {title}
                </h1>
                <h2
                    className="blog-header__subtitle"
                    dangerouslySetInnerHTML={{
                        __html: subtitle,
                    }}
                    style={{
                        fontFamily: 'aktiv-grotesk, sans-serif',
                    }}
                />
            </div>

            {extraContent}
        </div>
    </Waypoint>
)
