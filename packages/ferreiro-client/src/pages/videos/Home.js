import React, {PureComponent} from 'react'

import {ContentHeader} from '../../components/contentHeader/ContentHeader';
import {getQueryParamValue} from '../../common/getQueryParam';
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar';
import {PageLayout} from '../../components/layout/PageLayout';
import {SidebarMenu} from '../../components/sidebarMenu/SidebarMenu';
import {SidebarSeparator} from '../../components/sidebarSeparator/SidebarSeparator';
import {VideoCard, VideoCardDID} from '../../components/videoCard/VideoCardDID';

import {getPageData, VIDEO_CATEGORIES_ALL, VIDEO_TYPE_DID, PAGE_SIDEBAR_MENU, VIDEO_CATEGORIES_DID, PAGE_CONTENT} from '../../content/english';

import {
    PATH_VIDEOS,
} from '../constants'

export class VideosHome extends PureComponent {
    renderHeader = ({pageData, activeCategory}) => {
        const content = pageData[PAGE_CONTENT][activeCategory]
        const extraContent = <div>Subscribe to channel</div>

        return (
            <ContentHeader
                extraContent={extraContent}
                title={content.title}
                subtitle={content.subtitle}
            />
        )
    }

    // NB: Is this a factory? I wanna know this pattern :P
    renderVideoCard = (video) => {
        switch (video.type) {
            case VIDEO_TYPE_DID:
                return (
                    <VideoCardDID
                        {...video}
                    />
                )
        
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
        const categoryKey = getQueryParamValue({
            defaultValue : 'all',
            key: 'category',
            properties: properties,
        })
        
        return menuKeys.includes(categoryKey)
            ? categoryKey
            : defaultCategory
    }

    render() {
        // TODO: Create an abstraction over this?
        const pageData = getPageData(PATH_VIDEOS)

        const menu = pageData[PAGE_SIDEBAR_MENU]
        const menuKeys = Object.keys(menu.entities)
        const menuItems = Object.values(menu.entities)

        const activeCategory = this.getActiveCategory({
            defaultCategory: VIDEO_CATEGORIES_ALL,
            menuKeys,
            properties: this.props.location.search
        })

        const beforeContent = activeCategory === VIDEO_CATEGORIES_DID
            && (
                <div>
                    <img width="100%" src="https://yt3.ggpht.com/pNVRRJvvHM-jGbdUstBlJqj2zn3QRn0Fjo70RPGyAWC55-y8xGaJh0Pn0OACh0TpzByHwCaAvJk=w2560-fcrop64=1,00005a57ffffa5a8-nd-c0xffffffff-rj-k-no" />
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

                <SidebarSeparator />
            </div>
        )

        return (
            <PageLayout
                currentPath={PATH_VIDEOS}
                showHeader={true}
                isHeaderFix={false}
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
