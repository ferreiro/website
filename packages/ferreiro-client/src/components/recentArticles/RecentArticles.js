import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import {Waypoint} from 'react-waypoint';

import {CardRelatedPost} from '../cardRelatedPost/CardRelatedPost';
import {fetchApi} from '../../utils/fetchApi';

import './RecentArticles.scss'

export class RecentArticles extends PureComponent {
    static propTypes = {
        permalink: PropTypes.string.isRequired,
    }

    state = {
        posts: [],
        isLoading: false,
        error: {},
    }

    onEnterWaypoint = () => {
        const {posts} = this.state
        
        if (isEmpty(posts)) {
            this.loadposts()
        }
    }

    startFetchingPosts = () => {
        this.setState({isLoading: true})
    }

    stopFetchingPosts = () => {
        this.setState({isLoading: false})
    }

    loadposts = () => {
        // TODO: Cache results first, so avoid re-fetching
        // posts lists in the same session.
        // TODO: Put the url in CONSTANT
        fetchApi('/api/v1/blog/list', {
            body: {
                postsCount: 3,
            },
            onStart: () => {
                this.startFetchingPosts()
            },
            onSuccess: ({posts}) => {
                this.setState({posts})
            },
            onError: (_) => {
                this.setState({
                    error: ERROR_FETCHING_CONTENT
                })
            },
            onFinish: () => {
                this.stopFetchingPosts()
            }
        })
    }

    renderPosts = (posts) => (
        posts.map((post) => (
            <div
                className="recent-article__item"
                key={post.permalink}
            >
                <CardRelatedPost
                    post={post}
                />
            </div>
        ))
    )

    render() {
        const {posts, isLoading} = this.state

        return (
            <Waypoint
                onEnter={this.onEnterWaypoint}
            >
                <div>
                    {isLoading && (
                        <p>Loading...</p>
                    )}

                    {posts.length === 0 && (
                        <p>Currently we don't have more related posts.</p>
                    )}
                    
                    {posts.length > 0 && (
                        <div className="recent-article">
                            <div className="recent-article__items">
                                {posts.length > 0 && (
                                    this.renderPosts(posts)
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Waypoint>
        )
    }
}
