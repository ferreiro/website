import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify'
import {Link} from 'react-router-dom'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import {RelatedPosts} from './RelatedPosts';
import {getPostPermalink} from '../get-post-permalink';
import {ButtonSubscribe} from '../../../components/buttons/ButtonSubscribe';
import {LayoutWithSidebar} from '../../../components/layout/LayoutWithSidebar';
import {ProfileCard} from '../../../components/profileCard/ProfileCard';
import {SidebarNewsletterAd} from '../../../components/sidebarNewsletterAd/SidebarNewsletterAd';
import {SidebarSeparator} from '../../../components/sidebarSeparator/SidebarSeparator';
import {BUTTON_SIZE_SMALL} from '../../../components/constants';
import {PostLoader} from './PostLoader';
import {PageLayout} from '../../../components/layout/PageLayout';

import './Post.scss'
import './PostReader.scss'

const PostNofFound = () => (
    <div className="post-not-found">
        <div className="post-not-found__icon">
            404
        </div>
        <p>The post is currently not available...</p>
    </div>
)

const renderPost = ({
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
                <ButtonSubscribe
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

const getAfterContent = ({
    post,
}) => {
    if (isEmpty(post)) {
        return null
    }

    return (
        <div>
            <SharePost post={post} />
            <PostDivider post={post} />
            <RelatedPosts
                permalink={post.permalink}
            />
        </div>
    )
}

const TwitterSharingButton = ({
    message,
    url,
}) => {
    const TWITTER_SHARE_URL = 'https://twitter.com/share'

    const openTwitter = (event) => {
        event.preventDefault()

        return window.open(
            `${TWITTER_SHARE_URL}?text=${message}&via=jgferreiro&url=${url}`,
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
    const LINKEDIN_SHARE_URL = 'https://www.linkedin.com/shareArticle'
    // const mini = true
    // const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=${mini}&url=${url}&title=${title}&summary=${summary}&source=LinkedIn`
    // window.open(linkedinShareUrl, "Share on Twitter", "width=500px,height=250px;");

    const openLinkedin = (event) => {
        event.preventDefault()

        window.open(
            `${LINKEDIN_SHARE_URL}?mini=true&url=${url}&title=${title}&summary=${message}&source=LinkedIn`,
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


const SharePost = ({
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

const PostDivider = () => (
    <div className="post-divider" />
)

const getBlogPanel = (post) => {
    return (
        <div>
            <Link
                to={'/blog'}
            >
                Go back
            </Link>

            <SidebarSeparator />

            <ProfileCard />

            <SidebarSeparator />

            <SidebarNewsletterAd
                referrer={`/blog/${post.permalink}`}
            />
        </div>
    )
}

const getBlogPostContent = ({
    post = {},
    isLoading,
}) => {
    if (isLoading === true) {
        return (
            <div className="post">
                <div className="post-reader">
                    <div className="post__loading">
                        <PostLoader />
                    </div>
                </div>
            </div>
        )
    }

    if (isEmpty(post)) {
        return (
            <div className="post__not-found">
                <PostNofFound />
            </div>
        )
    }

    return (
        <div className="post">
            {renderPost(post)}
        </div>
    );
}

export class BlogPost extends PureComponent {
    state = {
        post: {},
        isLoading: false,
    }

    reloadPost = (permalink) => {
        this.setState({isLoading: true})
        // TODO: Put the API url into a function
        fetch(`/api/v1/blog/post/${permalink}`)
            .then(res => res.json())
            .then(post => {
                this.setState({
                    post
                })
            })
            .catch((error) => {
                alert('error', error)
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }

    componentDidMount() {
        const permalink = get(this.props, 'match.params.permalink');

        this.reloadPost(permalink)
    }



    componentDidUpdate(prevProps, prevState) {
        const permalink = get(prevState, 'post.permalink', null)
        const newPermalink = get(this.props, 'match.params.permalink', null)

        // console.group('----- componentDidUpdate')
        // console.log('permalink', permalink)
        // console.log('permalinkProps', propsPermalink)
        // console.log('permalinkPrevProps', newUrl)

        if (!isEmpty(this.state.post) &&
            permalink !== newPermalink &&
            this.state.isLoading === false
        ) {
            console.log('---- reload...')
            this.reloadPost(newPermalink)
        }

        console.groupEnd('')

    //     if (!isEmpty(permalink) && !isEmpty(urlPermalink) && permalink !== urlPermalink) {
    //         console.log('refetch the post...')

    //         // TODO: Put into a variable
    //         fetch(`/api/v1/blog/post/${urlPermalink}`)
    //             .then(res => res.json())
    //             .then(post => {
    //                 this.setState({
    //                     post
    //                 })
    //             })
    //             .catch((error) => {
    //                 alert('error', error)
    //             })
    //             .finally(() => {
    //                 this.setState({
    //                     isLoading: false,
    //                 })
    //             })
    //     }
    }

    render() {
        const {isLoading, post} = this.state;

        const blogPanel = getBlogPanel(post);

        const blogContent = getBlogPostContent({
            isLoading: isLoading,
            post: post
        })
    
        const afterContent = getAfterContent({
            post,
        });

        return (
            <PageLayout
                currentPath="blog"
                showHeader={true}
                isHeaderFix={false}
            >
                <LayoutWithSidebar
                    afterContent={afterContent}
                    header={null}
                    isHeaderFullWidth={true}
                    panel={null}
                    contentHeader={null}
                    content={blogContent}
                />
            </PageLayout>
        )
    }
}
