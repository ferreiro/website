import React from 'react'

import {ButtonSubscribe} from '../buttons/ButtonSubscribe';
import {BUTTON_SIZE_BIG} from '../constants';

import './ContentHeader.scss'

export const ContentHeader = ({
    title,
    subtitle,
    showSubscribeButton = false,
}) => (
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
                style={{
                    fontFamily: 'aktiv-grotesk, sans-serif',
                }}
            >
                {subtitle}
            </h2>
        </div>

        {showSubscribeButton && (
            <ButtonSubscribe
                size={BUTTON_SIZE_BIG}
            />
        )}
    </div>
)
