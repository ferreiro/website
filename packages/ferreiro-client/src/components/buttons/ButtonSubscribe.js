import React from 'react'
import classNames from 'classnames'

import './ButtonSubscribe.scss'

import {
    BUTTON_STYLE_LINK,
    BUTTON_STYLE_FILL,
    BUTTON_STYLE_NEUTRAL,
    BUTTON_SIZE_SMALL,
    BUTTON_SIZE_MEDIUM,
    BUTTON_SIZE_BIG
} from '../constants'

const BASE_CLASSNAME = 'button-subscribe'

const STYLE_TO_CLASSNAME = {
    [BUTTON_STYLE_LINK]: `${BASE_CLASSNAME}--style-link`,
    [BUTTON_STYLE_FILL]: `${BASE_CLASSNAME}--style-fill`,
    [BUTTON_STYLE_NEUTRAL]: `${BASE_CLASSNAME}--style-neutral`,
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
export const ButtonSubscribe = ({
    onClick,
    url = '/newsletter',
    text = 'Subscribe Newsletter',
    style = BUTTON_STYLE_NEUTRAL,
    size = BUTTON_SIZE_MEDIUM,
}) => {
    const className = getClassName(style, size)

    // TODO: Instead of opening a new tab
    // open a modal.
    return (
        <a
            className={className}
            href={url}
        >
            {text}
        </a>
    )
}

