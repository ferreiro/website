import React from 'react'
import {
    TARGET_BLANK,
    TARGET_SELF
} from '../constants'

export const Link = ({
    url,
    children,
    target = TARGET_SELF,
    className
}) => {
    const rel = target === TARGET_BLANK ? 'noopener noreferrer' : ''

    return (
        <a
            className={className}
            href={url}
            target={target}
            rel={rel}
        >
            {children}
        </a>
    )
}