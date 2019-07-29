import React from 'react'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'

import './Button.scss'

import {Link as ExternalLink} from '../link/Link';
import {Link as InternalLink} from 'react-router-dom';

import {
    BUTTON_STYLE_OUTLINE,
    BUTTON_STYLE_FILL,
    BUTTON_STYLE_NEUTRAL,
    BUTTON_SIZE_SMALL,
    BUTTON_SIZE_MEDIUM,
    BUTTON_SIZE_BIG,
    TARGET_SELF,
    BUTTON_STYLE_YOUTUBE,
    BUTTON_STYLE_LINK
} from '../constants'

const BASE_CLASSNAME = 'button-subscribe'

const STYLE_TO_CLASSNAME = {
    [BUTTON_STYLE_LINK]: `${BASE_CLASSNAME}--style-link`,
    [BUTTON_STYLE_OUTLINE]: `${BASE_CLASSNAME}--style-outline`,
    [BUTTON_STYLE_FILL]: `${BASE_CLASSNAME}--style-fill`,
    [BUTTON_STYLE_NEUTRAL]: `${BASE_CLASSNAME}--style-neutral`,
    [BUTTON_STYLE_YOUTUBE]: `${BASE_CLASSNAME}--style-youtube`,
}

const SIZE_TO_CLASSNAME = {
    [BUTTON_SIZE_SMALL]: `${BASE_CLASSNAME}--size-small`,
    [BUTTON_SIZE_MEDIUM]: `${BASE_CLASSNAME}--size-medium`,
    [BUTTON_SIZE_BIG]: `${BASE_CLASSNAME}--size-big`,
}

const getClassName = (style, size) => {
    const styleClassName = STYLE_TO_CLASSNAME[style]
    const sizeClassName = SIZE_TO_CLASSNAME[size]

    return classNames({
        [BASE_CLASSNAME]: true,
        [styleClassName]: true,
        [sizeClassName]: true,
    })
}

// TODO: Rename into ButtonCta or something like that.
// This is not only used for subscribe
export const Button = ({
    onClick,
    // TODO: Migrate into to, to be consistent with the link module
    url = '/newsletter',
    style = BUTTON_STYLE_NEUTRAL,
    size = BUTTON_SIZE_MEDIUM,
    target = TARGET_SELF,
    text = 'Subscribe Newsletter',
    title,
    icon,
}) => {
    const className = getClassName(style, size)
    const _onClick = (event) => {
        if (onClick === undefined) {
            return
        }

        event.preventDefault()
        onClick()
    }

    const LinkComponent = target === TARGET_SELF
        ? InternalLink
        : ExternalLink

    // TODO: Instead of opening a new tab
    // open a modal.
    return (
        <LinkComponent
            className={className}
            onClick={_onClick}
            to={url}
            target={target}
            title={title}
        >
            {icon && icon}

            {text}
        </LinkComponent>
    )
}

