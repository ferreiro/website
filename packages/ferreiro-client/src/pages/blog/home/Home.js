import React, {PureComponent} from 'react'
import get from 'lodash/get'

import {PageLayout} from '../../../components/layout/PageLayout';
import {LayoutWithSidebar} from '../../../components/layout/LayoutWithSidebar';
import {BlogHeader} from '../../../components/blogHeader/BlogHeader';
import {Card} from '../../../components/card/Card';
import {CardHighlight} from '../../../components/cardHighlight/CardHighlight';
import {Pagination} from '../../../components/pagination/Pagination';
import {ProfileCard} from '../../../components/profileCard/ProfileCard';
import {SidebarMenu} from '../../../components/sidebarMenu/SidebarMenu';
import {SidebarNewsletterAd} from '../../../components/sidebarNewsletterAd/SidebarNewsletterAd';
import {SidebarSeparator} from '../../../components/sidebarSeparator/SidebarSeparator';
import {getPostPermalink} from '../get-post-permalink'
import {LoadingPlaceholderCard} from '../../../components/loadingPlaceholder/LoadingPlaceholderCard'

import {
    BLOG_CATEGORY_TO_CONTENT,
    BLOG_NAVIGATION,
} from '../../constants'

const DEFAULT_CATEGORY = 'blog'


const renderHighlight = ({
    permalink,
    pic,
    summary,
    title,
}) => (
    <CardHighlight
        key={permalink}
        permalink={getPostPermalink(permalink)}
        title={title}
        summary={summary}
        image={pic}      
    />
)

const renderPost = ({
    permalink,
    pic,
    summary,
    title,
}) => (
    <Card
        key={permalink}
        permalink={getPostPermalink(permalink)}
        title={title}
        summary={summary}
        image={pic}
    />
)

const getBlogContent = ({
    posts = [],
    prevPageToken,
    nextPageToken,
    isLoading,
}) => {
    if (isLoading === true) {
        return (
            <div>
                <LoadingPlaceholderCard />
                <LoadingPlaceholderCard />
                <LoadingPlaceholderCard />
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <p>No more posts available</p>
        )
    }

    const [highlightPost, ...nonFeaturePosts] = posts;
    return (
        <div className="">
            <div>
                {renderHighlight(highlightPost)}
            </div>

            <div>
                {nonFeaturePosts.map(renderPost)}
            </div>

            <Pagination
                prevPageToken={prevPageToken}
                nextPageToken={nextPageToken}
            />
        </div>
    );
}

export class BlogHome extends PureComponent {
    state = {
        posts: [],
        category: 'blog',
        intro: null,
        isLoading: true,
    }

    componentDidUpdate() {
        const category = get(this.props, 'match.params.category', DEFAULT_CATEGORY);

        this.setState({category})
    }

    componentDidMount() {
        // TODO: Cache results and check that first.header

        fetch('/api/v1/blog/list')
            .then(res => res.json())
            .then(({title, intro, posts}) => (
                this.setState({
                    title,
                    intro,
                    posts,
                })
            ))
            .catch((error) => {
                alert('error', error)
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }

    render() {
        const nextPageToken = '2'
        const prevPageToken = '1'

        const blogPanel = (
            <div className="">
                <SidebarMenu
                    onClick={null}
                    selectedCategory={this.state.category}
                    items={BLOG_NAVIGATION}
                />

                <SidebarSeparator />

                <ProfileCard />

                <SidebarSeparator />

                <SidebarNewsletterAd />
            </div>
        );

        const {title, description} = BLOG_CATEGORY_TO_CONTENT[this.state.category]
        const blogContentHeader = (
            <BlogHeader
                title={title}
                subtitle={description}
            />
        )

        const blogContent = getBlogContent({
            isLoading: this.state.isLoading,
            posts: this.state.posts,
            nextPageToken,
            prevPageToken,
        })
    
        return (
            <PageLayout
                showHeader={true}
                isHeaderFix={false}
            >
                <LayoutWithSidebar
                    header={null}
                    isHeaderFullWidth={true}
                    panel={blogPanel}
                    contentHeader={blogContentHeader}
                    content={blogContent}
                />
            </PageLayout>
        )
    }
}
