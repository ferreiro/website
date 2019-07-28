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
    options = null,
    title,
    subtitle,
}) => (
    <Waypoint
        onEnter={onEnterViewport}
        onLeave={onLeaveViewport}
    >
        <div className="content-header">
            <div
                style={{
                    flex: '1 1 auto'
                }}
            >
                <h1
                    className="content-header__title"
                    style={{
                        fontFamily: 'aktiv-grotesk, sans-serif',
                    }}
                >
                    {title}
                </h1>
                <h2
                    className="content-header__subtitle"
                    dangerouslySetInnerHTML={{
                        __html: subtitle,
                    }}
                    style={{
                        fontFamily: 'aktiv-grotesk, sans-serif',
                    }}
                />
            </div>

            {options}
        </div>
    </Waypoint>
)
