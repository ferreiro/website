import React, {PureComponent} from 'react'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import {BUTTON_SIZE_BIG, BUTTON_STYLE_FILL} from '../../../components/constants';
import {Button} from '../../../components/buttons/Button';
import {ContentHeader} from '../../../components/contentHeader/ContentHeader';
import {Card} from '../../../components/card/Card';
import {CardHighlight} from '../../../components/cardHighlight/CardHighlight';
import {getPostPermalink} from '../get-post-permalink'
import {LayoutWithSidebar} from '../../../components/layout/LayoutWithSidebar';
import {LoadingPlaceholderCard} from '../../../components/loadingPlaceholder/LoadingPlaceholderCard'
import {PageLayout} from '../../../components/layout/PageLayout';
import {Pagination} from '../../../components/pagination/Pagination';
import {ProfileCard} from '../../../components/profileCard/ProfileCard';
import {SidebarMenu} from '../../../components/sidebarMenu/SidebarMenu';
import {SidebarNewsletterAd} from '../../../components/sidebarNewsletterAd/SidebarNewsletterAd';
import {SidebarSeparator} from '../../../components/sidebarSeparator/SidebarSeparator';

import {
    BLOG_CATEGORY_TO_CONTENT,
    BLOG_NAVIGATION,
    SIDEBAR_MENU_BLOG_TITLE,
} from '../../constants'
import {fetchApi} from '../../../utils/fetchApi';
import {ERROR_FETCHING_CONTENT} from '../../../types/enums';

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

const renderBlogPostsList = ({
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

const getBlogContent = ({
    error,
    isLoading,
    posts,
    retryFetchPosts,
    nextPageToken,
    prevPageToken,
}) => {
    const blogPosts = renderBlogPostsList({
        isLoading,
        posts,
        nextPageToken,
        prevPageToken,
    });

    return (
        <div>
            {renderError({
                error,
                retryFetchPosts,
            })}
            {blogPosts}
        </div>
    )
}

const renderError = ({
    error,
    retryFetchPosts,
}) => {
    if (isEmpty(error)) {
        return null
    }

    switch (error) {
        case ERROR_FETCHING_CONTENT:
            return (
                <p>
                    Sorry. There was an error loading the list of posts...

                    <Button
                        onClick={retryFetchPosts}
                        style={BUTTON_STYLE_FILL}
                    >
                        Try again! :)
                    </Button>
                </p>
            )
    
        default:
            break;
    }
}

export class BlogHome extends PureComponent {
    state = {
        posts: [],
        category: 'blog',
        intro: null,
        isLoading: false,
        error: '',
    }

    componentDidUpdate() {
        const category = get(this.props, 'match.params.category', DEFAULT_CATEGORY);

        this.setState({category})
    }

    componentDidMount() {
        if (!isEmpty(this.state.posts)) {
            // NB: Skip loading posts if they are already loaded.
            return
        }

        this.fetchPosts();
    }

    startFetchingPosts = () => {
        this.setState({
            isLoading: true,
            error: null,
        })
    }

    stopFetchingPosts = () => {
        this.setState({
            isLoading: false,
        })
    }

    fetchPosts = () => {
        // TODO: Cache results first, so avoid re-fetching
        // posts lists in the same session.
        // TODO: Put the url in CONSTANT
        fetchApi('/api/v1/blog/list', {
            onStart: () => {
                this.startFetchingPosts()
            },
            onSuccess: ({
                title,
                intro,
                posts
            }) => {
                this.cachePosts({
                    title, intro, posts,
                })
                this.setState({
                    title, intro, posts,
                })
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

    retryFetchPosts = () => {
        console.log('retrying to fetch posts')
        this.fetchPosts()
    }

    cachePosts = ({}) => {
        console.log('Catching posts...')
    }

    getCachedPosts = ({}) => {
        console.log('Catching posts...')
    }

    render() {
        const nextPageToken = '2'
        const prevPageToken = '1'

        const blogPanel = (
            <div className="">
                <SidebarMenu
                    title={SIDEBAR_MENU_BLOG_TITLE}
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
        const options = (
            <Button
                size={BUTTON_SIZE_BIG}
            />
        )
        const blogContentHeader = (
            <ContentHeader
                title={title}
                subtitle={description}
                options={options}
            />
        )

        const blogContent = getBlogContent({
            error: this.state.error,
            isLoading: this.state.isLoading,
            posts: this.state.posts,
            retryFetchPosts: this.retryFetchPosts,
            nextPageToken,
            prevPageToken,
        })
    
        return (
            <PageLayout
                currentPath="blog"
                showHeader={true}
                isHeaderFix={false}
                title={title}
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
