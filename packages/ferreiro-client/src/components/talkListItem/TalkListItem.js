import React from 'react'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import isEmpty from 'lodash/isEmpty'
import {translate} from '../../i18-me/i18-me'

import {BUTTON_SIZE_MEDIUM, TARGET_BLANK, BUTTON_STYLE_LINK} from '../../components/constants'
import {Button} from '../../components/buttons/Button'

import {BUTTON_TYPE_SLIDES, BUTTON_TYPE_VIDEO} from '../../content/english'
import {Link} from '../link/Link'

import './TalkListItem.scss'

const renderButton = ({
    title,
    type,
    url
}) => {
    if (type === BUTTON_TYPE_SLIDES) {
        const text = translate('Read slides')
        // icon-stack
        const icon = (
            <span
                className="icon icon-newspaper talk-list-item__icon"
            />
        )

        return (
            <Button
                icon={icon}
                size={BUTTON_SIZE_MEDIUM}
                url={url}
                style={BUTTON_STYLE_LINK}
                target={TARGET_BLANK}
                text={text}
            />   
        )
    }

    if (type === BUTTON_TYPE_VIDEO) {
        const text = translate('Watch video')
        const icon = (
            <span
                className="icon icon-play talk-list-item__icon"
            />
        )

        return (
            <Button
                icon={icon}
                size={BUTTON_SIZE_MEDIUM}
                style={BUTTON_STYLE_LINK}
                target={TARGET_BLANK}
                text={text}
                url={url}
            />   
        )
    }
    
    return (
        <Button
            size={BUTTON_SIZE_MEDIUM}
            style={BUTTON_STYLE_LINK}
            target={TARGET_BLANK}
            text={title}
            url={url}
        />
    )
}

export const TalkListItem = ({
    talk,
}) => {
    const {
        buttons = [],
        date,
        year,
        permalink,
        pic,
        location = {},
        summary = '',
        title,
    } = talk

    return (
        <div
            className="talk-list-item"
            key={title}
        >
            <div className="talk-list-item__image">
                <LazyLoadImage
                    src={pic} 
                    alt={title}
                    effect="blur"
                    placeholder={
                        <p>{translate('Loading... TODO: Replace with a facebook loader')}</p>
                    }
                />
            </div>
            <div className="talk-list-item__content">
                <Link
                    url={permalink}
                    target={TARGET_BLANK}
                >
                    <h2 className="talk-list-item__title">
                        {title}
                    </h2>
                </Link>

                <div className="talk-list-item__metadata">
                    <li className="talk-list-item__metadata-entry">
                        <span className="icon icon-calendar" />
                        <span className="talk-list-item__metadata-text">
                            {date} {year}
                        </span>
                    </li>

                    {!isEmpty(location) && (
                        <li className="talk-list-item__metadata-entry">
                            <span className="icon icon-location" />
                            <span className="talk-list-item__metadata-text">
                                {Object.values(location).map((item) => (
                                    <span>{item}</span>
                                ))}
                            </span>
                        </li>
                    )}
                </div>

                <p className="talk-list-item__summary">
                    {summary}
                </p>

                <div className="talk-list-item__buttons">
                    {/* <span className="talk-list-item__buttons-title">
                        {translate('Resources:')}
                    </span> */}
                    <div className="talk-list-item__buttons-items">
                        {buttons.map((button, index) => (
                            <div
                                className="talk-list-item__button"
                                key={index}
                            >
                                {renderButton(button)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <div className="talk-list-item__options">
                Share
            </div> */}
        </div>
    )
}