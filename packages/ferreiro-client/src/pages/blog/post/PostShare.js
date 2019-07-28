import React from 'react'

import {getPostPermalink} from '../get-post-permalink';

const SHARE_URL_LINKEDIN = 'https://www.linkedin.com/shareArticle'
const SHARE_URL_TWITTER = 'https://twitter.com/share'

const TwitterSharingButton = ({
    message,
    url,
}) => {
    const openTwitter = (event) => {
        event.preventDefault()

        return window.open(
            `${SHARE_URL_TWITTER}?text=${message}&via=jgferreiro&url=${url}`,
            'Share on Twitter',
            'width=500px,height=250px;'
        );
    }

    return (
        <button
            className="sharing-button sharing-button-twitter"
            onClick={openTwitter}
        >
            <span className="sharing-button__icon icon-twitter" />
        </button>
    )
}

const LinkedinSharingButton = ({
    mini=false,
    message,
    title,
    url,
}) => {
    // const mini = true
    // const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=${mini}&url=${url}&title=${title}&summary=${summary}&source=LinkedIn`
    // window.open(linkedinShareUrl, "Share on Twitter", "width=500px,height=250px;");

    const openLinkedin = (event) => {
        event.preventDefault()

        window.open(
            `${SHARE_URL_LINKEDIN}?mini=true&url=${url}&title=${title}&summary=${message}&source=LinkedIn`,
            "Share on Twitter",
            "width=500px,height=550px;"
        )
    }

    return (
        <button
            className="sharing-button sharing-button-linkedin"
            onClick={openLinkedin}
        >
            <span className="sharing-button__icon icon-linkedin2" />
        </button>
    )
}

const SubmitFeedbackButton = () => {
    const openTwitter = (event) => {
        event.preventDefault()

        window.open(
            '/contact/feedback',
            "Submit feedback",
            "width=500px,height=600px;"
        )
    }

    return (
        <button className="sharing-button sharing-button-feedback" onClick={openTwitter}>
            Send Feedback
        </button>
    )
}

export const PostShare = ({
    post
}) => {
    const postUrl = `https://www.ferreiro.me${getPostPermalink(post.permalink)}`

    const shareableItems = {
        twitter: {
            key: 'twitter-share',
            component: (
                <TwitterSharingButton
                    url={postUrl}
                    message={"👓 " + post.title}
                />
            )
        },
        linkedin: {
            key: 'linkedin-share',
            component: (
                <LinkedinSharingButton
                    url={postUrl}
                    message={post.summary}
                    mini={true}
                    title={post.title}
                /> 
            )
        },
        feedback: {
            key: 'submit-feedback',
            component: (
                <SubmitFeedbackButton
                    url={postUrl}
                />
            )
        }
    }

    return (
        <div className="post-share">
            <div className="layout-with-sidebar__content-wrapper">
                <h3 className="post-share__title">
                    Sharing is caring 🤗
                </h3>

                <ul className="post-share__links">
                    {Object.values(shareableItems).map(({key, component: Component}) => (
                        <li
                            className="post-share__link"
                            key={key}
                        >
                            {Component}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
