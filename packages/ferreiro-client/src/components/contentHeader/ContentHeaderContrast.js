import React from 'react'
import {Waypoint} from 'react-waypoint'

import './ContentHeader.scss'

const onEnterViewport = () => {
    console.log('On Enter')
}

const onLeaveViewport = () => {
    console.log('On leave')
}

export const ContentHeaderContrast = ({
    options = null,
    title,
    subtitle,
    backgroundImageUrl = '',
    backgroundColor,
}) => (
    <Waypoint
        onEnter={onEnterViewport}
        onLeave={onLeaveViewport}
    >
        <div
            className="content-header content-header--contrast"
            style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundColor,
            }}
        >
            <div style={{flex: '1 1 auto'}}>
                <h1
                    className="content-header__title content-header__title--contrast"
                    style={{
                        fontFamily: 'aktiv-grotesk, sans-serif',
                    }}
                >
                    {title}
                </h1>
                <h2
                    className="content-header__subtitle content-header__subtitle--contrast"
                    dangerouslySetInnerHTML={{
                        __html: subtitle,
                    }}
                    style={{
                        fontFamily: 'aktiv-grotesk, sans-serif',
                    }}
                />

                {options}
            </div>
        </div>
    </Waypoint>
)
