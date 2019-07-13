import React, {PureComponent} from 'react'

import {GenericAd} from '../../components/ads/GenericAd';
import {SidebarMenu} from '../../components/sidebarMenu/SidebarMenu';
import {PageLayout} from '../../components/layout/PageLayout'
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar'
import {content} from '../../content/english'
import {
    ABOUT_CATEGORY_BIO,
    PATH_RESUME,
    SIDEBAR_MENU_ABOUT_TITLE,
    ABOUT_NAVIGATION,
    PATH_ABOUT,
} from '../constants'

const {
    title,
    subtitle,
} = content.contact

export class About extends PureComponent {

    render() {
        const header = (
            <h1>Hola</h1>
        )

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
                <p>TODO: Put menu for mobile</p>
                <h1>About Content</h1>

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
                    content={content}
                />
            </PageLayout>
        )
    }
}
