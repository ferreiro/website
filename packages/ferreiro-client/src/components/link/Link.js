import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {
    TARGET_BLANK,
    TARGET_SELF
} from '../constants'

export const Link = ({
    // TODO: Delete url, and only use to
    url,
    to,
    children,
    target = TARGET_SELF,
    onClick,
    className,
    title,
}) => {
    const rel = target === TARGET_BLANK ? 'noopener noreferrer' : ''
    const LinkComponent = target === TARGET_SELF
        ? RouterLink
        : 'a';

    return (
        <LinkComponent
            onClick={onClick}
            className={className}
            href={url || to}
            target={target}
            rel={rel}
            title={title}
        >
            {children}
        </LinkComponent>
    )
}