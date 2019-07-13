import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import {Waypoint} from 'react-waypoint';

import {CardRelatedPost} from '../../../components/cardRelatedPost/CardRelatedPost';

import './RelatedPosts.scss'

export class RelatedPosts extends PureComponent {
    static propTypes = {
        permalink: PropTypes.string.isRequired,
    }

    state = {
        relatedPosts: [],
        isLoading: false,
    }

    onEnterWaypoint = () => {
        const {relatedPosts} = this.state
        
        if (isEmpty(relatedPosts)) {
            this.loadRelatedPosts()
        }
    }

    loadRelatedPosts = () => {
        const {permalink} = this.props

        this.setState({isLoading: true})
        fetch(`/api/v1/blog/post/${permalink}/related`)
            .then(res => res.json())
            .then(({relatedPosts}) => this.setState({relatedPosts}))
            .catch((error) => alert('error', error))
            .finally(() => this.setState({isLoading: false}))
    }

    renderRelatedPosts = (posts) => (
        posts.map((post) => (
            <div
                className="post-related__item"
                key={post.permalink}
            >
                <CardRelatedPost
                    post={post}
                />
            </div>
        ))
    )

    render() {
        const {relatedPosts, isLoading} = this.state

        return (
            <Waypoint
                onEnter={this.onEnterWaypoint}
            >
                <div>
                    {isLoading && (
                        <p>Loading...</p>
                    )}

                    {relatedPosts.length === 0 && (
                        <p>Currently we don't have more related posts.</p>
                    )}
                    
                    {relatedPosts.length > 0 && (
                        <div className="post-related">
                            <div className="layout-with-sidebar__content-wrapper">
                                <h3 className="post-share__title">
                                    Related posts
                                </h3>

                                <div className="post-related__items">
                                    {relatedPosts.length > 0 && (
                                        this.renderRelatedPosts(relatedPosts)
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Waypoint>
        )
    }
}
