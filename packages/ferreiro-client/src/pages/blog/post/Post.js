import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import {getUrlPath} from '../../../utils/getUrlPath';

import {LayoutWithSidebar} from '../../../components/layout/LayoutWithSidebar';
import {PageLayout} from '../../../components/layout/PageLayout';
import {ProfileCard} from '../../../components/profileCard/ProfileCard';
import {SidebarNewsletterAd} from '../../../components/sidebarNewsletterAd/SidebarNewsletterAd';
import {SidebarSeparator} from '../../../components/sidebarSeparator/SidebarSeparator';

import {PostReader} from './PostReader';
import {PostShare} from './PostShare';
import {PostLoader} from './PostLoader';
import {RelatedPosts} from './RelatedPosts';

import './Post.scss'

const PostNofFound = () => (
    <div className="post-not-found">
        <div className="post-not-found__icon">
            404
        </div>
        <p>The post is currently not available...</p>
    </div>
)

const getAfterContent = ({
    post,
}) => {
    if (isEmpty(post)) {
        return null
    }

    return (
        <div>
            <PostShare post={post} />
            <PostDivider post={post} />
            <RelatedPosts
                permalink={post.permalink}
            />
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
            <PostReader {...post} />
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

    componentDidUpdate(_, prevState) {
        const permalink = get(prevState, 'post.permalink', null)
        const newPermalink = getUrlPath({
            props: this.props,
            path: 'permalink',
            defaultValue: null
        })

        if (!isEmpty(this.state.post) &&
            permalink !== newPermalink &&
            this.state.isLoading === false
        ) {
            this.reloadPost(newPermalink)
        }
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
