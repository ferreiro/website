import React, {PureComponent} from 'react'

import {Card} from '../../components/card/Card';
import {CardHighlight} from '../../components/cardHighlight/CardHighlight';

import {ContentHeader} from '../../components/contentHeader/ContentHeader';
import {getUrlPath} from '../../utils/getUrlPath';
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar';
import {PageLayout} from '../../components/layout/PageLayout';
import {SidebarMenu} from '../../components/sidebarMenu/SidebarMenu';
import {VideoCard} from '../../components/videoCard/VideoCard';
import {VideoCardDID} from '../../components/videoCard/VideoCardDID';

import {getPageData, VIDEO_CATEGORIES_ALL, VIDEO_TYPE_DID, PAGE_SIDEBAR_MENU, VIDEO_CATEGORIES_DID, PAGE_CONTENT, VIDEO_TYPE_REGULAR} from '../../content/english';

import {
    PATH_VIDEOS,
} from '../constants'
import {Button} from '../../components/buttons/Button';
import {
    BUTTON_SIZE_BIG,
    BUTTON_STYLE_YOUTUBE,
    TARGET_BLANK,
} from '../../components/constants';
import {translate} from '../../i18-me/i18-me'
import { getVideoPermalink } from '../../utils/getVideoPermalink';

// TODO: Create an abstraction over this?
const pageData = getPageData(PATH_VIDEOS)


const renderHighlight = ({
    permalink,
    image: {
        alt,
        src,
    },
    description,
    title,
}) => (
    <CardHighlight
        key={permalink}
        permalink={getVideoPermalink(permalink)}
        title={title}
        summary={description}
        image={src}      
    />
)

const renderPost = ({
    permalink,
    image: {
        alt,
        src,
    },
    description,
    title,
}) => (
    <Card
        key={permalink}
        permalink={getVideoPermalink(permalink)}
        title={title}
        summary={description}
        image={src}
    />
)

const renderVideoList = ({
    videos = [],
    // prevPageToken,
    // nextPageToken,
    // isLoading,
}) => {
    if (videos.length === 0) {
        return (
            <p>No more posts available</p>
        )
    }

    const [highlightVideo, ...restVideos] = videos;
    return (
        <div className="">
            <div>
                {renderHighlight(highlightVideo)}
            </div>

            <div>
                {restVideos.map(renderPost)}
            </div>

            {/* <Pagination
                prevPageToken={prevPageToken}
                nextPageToken={nextPageToken}
            /> */}
        </div>
    );
}

export class VideosHome extends PureComponent {
    renderHeader = ({pageData, activeCategory}) => {
        const pageTitle = pageData[PAGE_CONTENT][activeCategory].title
        const pageSubtitle = pageData[PAGE_CONTENT][activeCategory].subtitle

        const options = (
            <Button
                text={translate('Subscribe youtube')}
                size={BUTTON_SIZE_BIG}
                style={BUTTON_STYLE_YOUTUBE}
                target={TARGET_BLANK}
                icon={<span style={{float: 'left', marginTop: '1.45px', marginRight: '16px'}} className="icon icon-youtube" />}
                url='https://www.youtube.com/c/jgferreiro?sub_confirmation=1'
            />
        )

        return (
            <ContentHeader
                options={options}
                title={pageTitle}
                subtitle={pageSubtitle}
            />
        )
    }

    // NB: Is this a factory? I wanna know this pattern :P
    renderVideoCard = (video) => {
        switch (video.type) {
            case VIDEO_TYPE_DID:
                return <VideoCardDID {...video} />
            case VIDEO_TYPE_REGULAR:
                return <VideoCard {...video} />
            default:
                return null
        }
    }

    renderContent = ({pageData, activeCategory}) => {
        const entities = pageData.entities
        const filteredEntities = Object.values(entities).filter((entity) => {
            const categories = entity.categories

            return categories.includes(activeCategory)
        })

        return (
            <div>
                {this.renderHeader({pageData, activeCategory})}

                {renderVideoList({
                    videos: filteredEntities,
                })}

                {filteredEntities.length === 0 && (
                    <p>No videos available :(</p>
                )}

                {filteredEntities.map(this.renderVideoCard)}
            </div>
        )
    }

    getActiveCategory = ({
        properties,
        menuKeys = [],
        defaultCategory,
    }) => {
        const categoryKey = getUrlPath({
            props: this.props,
            path: 'category',
            defaultValue: VIDEO_CATEGORIES_ALL,
        })
        
        return menuKeys.includes(categoryKey)
            ? categoryKey
            : defaultCategory
    }

    render() {
        const menu = pageData[PAGE_SIDEBAR_MENU]
        const menuKeys = Object.keys(menu.entities)
        const menuItems = Object.values(menu.entities)

        const activeCategory = this.getActiveCategory({
            defaultCategory: VIDEO_CATEGORIES_ALL,
            menuKeys,
            properties: this.props.location.search
        })

        const title = pageData[PAGE_CONTENT][activeCategory].title

        const beforeContent = activeCategory === VIDEO_CATEGORIES_DID
            && (
                <div>
                    <img
                        alt="Jorge ferreiro software engineer entrepreneur eventbrite amazon youtube channel banner"
                        src="/images/videos/jorge_ferreiro_software_engineer_entrepreneur_eventbrite_amazon_youtube_channel_banner.jpg"
                        title="Jorge ferreiro software engineer entrepreneur eventbrite amazon youtube channel banner"
                        width="100%"
                    />
                </div>
            )

        const panel = (
            <div className="">
                <SidebarMenu
                    title={menu.title}
                    onClick={this.changeCategory}
                    selectedCategory={activeCategory}
                    items={menuItems}
                />

                {/* <SidebarSeparator /> */}
            </div>
        )

        return (
            <PageLayout
                currentPath={PATH_VIDEOS}
                showHeader={true}
                isHeaderFix={false}
                title={title}
            >
                <LayoutWithSidebar
                    beforeContent={beforeContent}
                    header={null}
                    isHeaderFullWidth={true}
                    panel={panel}
                    content={this.renderContent({pageData, activeCategory})}
                />
            </PageLayout>
        )
    }
}
