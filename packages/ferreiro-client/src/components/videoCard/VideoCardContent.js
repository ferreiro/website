import React from 'react'
import isEmpty from 'lodash/isEmpty'

export const VideoCardContent = ({
    iframe,
    image,
}) => {
    if (!isEmpty(iframe)) {
        return (
            <div style={{width: '560px', position: 'relative', height: '315px', display: 'flex'}}>
                <iframe
                    width="100%"
                    height="100%"
                    src={iframe}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullscreen
                />
            </div>
        )
    }

    const {
        alt,
        src,
    } = image

    if (!isEmpty(image)) {
        return (
            <img
                className="video__aside--did-image"
                src={src}
                alt={alt}
                title={alt}
            />
        )
    }

    return null;
}