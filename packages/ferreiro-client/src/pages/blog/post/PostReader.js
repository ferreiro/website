import React from 'react'
import DOMPurify from 'dompurify'

import {Link} from '../../../components/link/Link'
import {Button} from '../../../components/buttons/Button'

import {BUTTON_SIZE_SMALL, LINKEDIN_URL, TARGET_BLANK, TWITTER_URL} from '../../../components/constants'

import './PostReader.scss'

export const PostReader = ({
    body,
    html,
    timeAgo,
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

        <div className="post-reader__metadata">
            <div className="post-author">
                <div className="post-author__avatar">
                    <Link to={LINKEDIN_URL} target={TARGET_BLANK}>
                        <img
                            alt="Author pic"
                            className="post-author__image"
                            src="/images/blog/jorge_ferreiro_software_engineer_entrepreneur_avatar.jpg"
                        />
                    </Link>
                </div>
                <div className="post-author__info">
                    <span className="post-author__name">
                        <Link to={LINKEDIN_URL} target={TARGET_BLANK}>{authorName}</Link> (<Link to={TWITTER_URL} target={TARGET_BLANK}><u>@jgferreiro</u></Link>)
                    </span>
                    <span className="post-author__date">
                        Published {timeAgo}
                    </span>
                </div>
            </div>
            <div className="post-author__subscribe">
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
