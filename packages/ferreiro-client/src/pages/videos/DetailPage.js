import React, {PureComponent} from 'react'
import get from 'lodash/get'

import {ContentHeader} from '../../components/contentHeader/ContentHeader';
import {getUrlPath} from '../../utils/getUrlPath';
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar';
import {PageLayout} from '../../components/layout/PageLayout';
import {SidebarMenu} from '../../components/sidebarMenu/SidebarMenu';
import {VideoCard} from '../../components/videoCard/VideoCard';
import {VideoCardDID} from '../../components/videoCard/VideoCardDID';

import {getPageData, VIDEO_CATEGORIES_ALL, VIDEO_TYPE_DID, PAGE_SIDEBAR_MENU, VIDEO_CATEGORIES_DID, PAGE_CONTENT, VIDEO_TYPE_REGULAR, PAGE_ENTITIES} from '../../content/english';

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
import { RecentVideos } from '../../components/recentVideos/RecentVideos';

export class VideoDetailPage extends PureComponent {
    renderHeader = ({pageData}) => {
        // const content = pageData[PAGE_CONTENT]
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
                // title={content.title}
                // subtitle={content.subtitle}
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

    renderContent = ({pageData}) => {
        const permalink = get(this.props, 'match.params.permalink');

        return (
            <div>
                <div
                    style={{
                        // background: '#f4f4f4',
                        padding: '2em',
                        textAlign: 'center',
                    }}
                    className="spacing-4-bot"
                >
                    <h3>
                    🛎️ Don not miss any new video!
                    </h3>
                    <Button
                        text={translate('Subscribe youtube')}
                        size={BUTTON_SIZE_BIG}
                        style={BUTTON_STYLE_YOUTUBE}
                        target={TARGET_BLANK}
                        icon={<span style={{float: 'left', marginTop: '1.45px', marginRight: '16px'}} className="icon icon-youtube" />}
                        url='https://www.youtube.com/c/jgferreiro?sub_confirmation=1'
                    />
                </div>

                <RecentVideos />
            </div>
        )
    }

    render() {
        const title = 'SUPER PENE'

        // TODO: Create an abstraction over this?
        const pageData = getPageData(PATH_VIDEOS)

        const menu = pageData[PAGE_SIDEBAR_MENU]
        const menuItems = Object.values(menu.entities)

        const permalink = get(this.props, 'match.params.permalink');

        const videoEntities = getPageData(PATH_VIDEOS)[PAGE_ENTITIES]
        const videos = Object.values(videoEntities)
        const video = videos.filter((v) => v.permalink === permalink)
        
        if (video.length === 0) {
            return (
                <p>Not post found</p>
            )
        }

        const iframeUrlWithAutoplay = `${video[0].iframe}&autoplay=1`

        const beforeContent = (
            <iframe
                width="100%"
                height="600px"
                src={iframeUrlWithAutoplay}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                autoPlay="true"
            />
        )

        const panel = (
            <div className="">
                <SidebarMenu
                    title={menu.title}
                    onClick={this.changeCategory}
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
                    content={this.renderContent({pageData})}
                />
            </PageLayout>
        )
    }
}
