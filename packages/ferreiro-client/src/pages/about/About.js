import React, {PureComponent} from 'react'

import {GenericAd} from '../../components/ads/GenericAd';
import {SidebarMenu} from '../../components/sidebarMenu/SidebarMenu';
import {PageLayout} from '../../components/layout/PageLayout'
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar'
import {
    getPageData,
    PAGE_CONTENT,
    PAGE_TITLE,
    PAGE_SUBTITLE
} from '../../content/english'
import {ContentHeader} from '../../components/contentHeader/ContentHeader'
import {
    ABOUT_CATEGORY_BIO,
    PATH_RESUME,
    SIDEBAR_MENU_ABOUT_TITLE,
    ABOUT_NAVIGATION,
    PATH_ABOUT,
} from '../constants'

const pageData = getPageData(PATH_ABOUT)
const contentHeader = (
    <ContentHeader
        title={pageData[PAGE_CONTENT][PAGE_TITLE]}
        subtitle={pageData[PAGE_CONTENT][PAGE_SUBTITLE]}
    />
)

export class About extends PureComponent {

    render() {
        const panel = (
            <div>
                <SidebarMenu
                    onClick={null}
                    selectedCategory={ABOUT_CATEGORY_BIO}
                    items={ABOUT_NAVIGATION}
                    title={SIDEBAR_MENU_ABOUT_TITLE}
                />
            </div>
        )

        const content = (
            <div>
                <GenericAd
                    title="Would you like to check my Resume?"
                    ctaText="See Résume"
                    link={PATH_RESUME}
                />
            </div>
        )

        // TODO: Extract the layout into AboutPageLayout
        return (
            <PageLayout
                currentPath={PATH_ABOUT}
                showHeader={true}
                isHeaderFix={false}
            >
                <LayoutWithSidebar
                    header={null}
                    isHeaderFullWidth={true}
                    panel={panel}
                    contentHeader={contentHeader}
                    content={content}
                />
            </PageLayout>
        )
    }
}
