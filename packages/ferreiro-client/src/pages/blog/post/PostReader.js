import React from 'react'
import DOMPurify from 'dompurify'

import {Button} from '../../../components/buttons/Button'
import {BUTTON_SIZE_SMALL} from '../../../components/constants'

import './PostReader.scss'

export const PostReader = ({
    body,
    html,
    author_name: authorName,
    author_pic: authorPic,
    permalink,
    pic,
    summary,
    title,
}) => (
    <article className="post-reader">
        <input id="canonicalUrl" type="hidden" value="https://www.ferreiro.me/" />

        <h1 className="post-reader__title">
            {title}
        </h1>

        {summary && (
            <h2 className="post-reader__subtitle">
                {summary}
            </h2>
        )}

        <div className="post-author">
            <div className="post-author__content">
                <img
                    alt="Author pic"
                    className="post-author__image"
                    src="https://pbs.twimg.com/profile_images/1062169454413578243/z_WY3jdh_400x400.jpg"
                />
                <span>
                    {authorName}
                </span>
            </div>
            <div className="post-author__options">
                <Button
                    text="Subscribe"
                    size={BUTTON_SIZE_SMALL}
                />
            </div>
        </div>
        
        {pic && (
            <img
                alt="blog post header image"
                className="post-reader__image"
                src={pic}
            />
        )}

        <div
            className="post-reader-content"
            dangerouslySetInnerHTML={{
                // We already get the HTML sanitized from the backend.
                // This is just to be extra safe...
                __html: DOMPurify.sanitize(html)
            }}
        />
    </article>
)
