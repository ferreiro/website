import React from 'react'

import {ButtonSubscribe} from '../buttons/ButtonSubscribe';

import './BlogHeader.scss'
import {BUTTON_SIZE_BIG} from '../constants';

export const BlogHeader = ({
    title,
    subtitle,
}) => {
    

    return (
        <div
            className="blog-header"
        >
            {/* if blogCategory !== 'all'
            h2.category__title.margin-bottom-1= blogCategory + ' posts' */}
            
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

            <ButtonSubscribe
                size={BUTTON_SIZE_BIG}
            />
        </div>
    )
}
