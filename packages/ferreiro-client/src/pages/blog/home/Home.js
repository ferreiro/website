import React, {PureComponent} from 'react'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import {BUTTON_SIZE_BIG} from '../../../components/constants';
import {ButtonSubscribe} from '../../../components/buttons/ButtonSubscribe';
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
        isLoading: false,
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

        // TODO: Cache results and check that first.header
        this.setState({isLoading: true})
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
                this.setState({isLoading: false})
            })
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
        const extraContent = (
            <ButtonSubscribe
                size={BUTTON_SIZE_BIG}
            />
        )        
        const blogContentHeader = (
            <ContentHeader
                title={title}
                subtitle={description}
                extraContent={extraContent}
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
                currentPath="blog"
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
