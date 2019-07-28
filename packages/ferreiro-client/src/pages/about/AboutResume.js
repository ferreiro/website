import React, {PureComponent} from 'react'

import {ContentHeader} from '../../components/contentHeader/ContentHeader';
import {SidebarMenu} from '../../components/sidebarMenu/SidebarMenu';
import {PageLayout} from '../../components/layout/PageLayout'
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar'
import {content} from '../../content/english'
import {
    ABOUT_CATEGORY_RESUME,
    ABOUT_NAVIGATION,
    RESUME_URL,
    SIDEBAR_MENU_ABOUT_TITLE,
    PATH_ABOUT,
    PATH_CONTACT,
} from '../constants'
import {Button} from '../../components/buttons/Button';
import {BUTTON_SIZE_BIG} from '../../components/constants';
import {GenericAd} from '../../components/ads/GenericAd';

export class AboutResume extends PureComponent {

    render() {
        const panel = (
            <div>
                <SidebarMenu
                    items={ABOUT_NAVIGATION}
                    onClick={null}
                    selectedCategory={ABOUT_CATEGORY_RESUME}
                    title={SIDEBAR_MENU_ABOUT_TITLE}
                />
            </div>
        )

        const contentHeader = (
            <ContentHeader
                title="Résume / CV"
                subtitle={null}
                // options={
                //     <Button
                //         size={BUTTON_SIZE_BIG}
                //         text="Download my Résume"
                //         url={RESUME_URL + '&ref=about-subscribe-cta'}
                //     />
                // }
            />
        )

        const content = (
            <div>
                <GenericAd
                    title="Would you like to download my resume?"
                    ctaText="Download"
                    link={RESUME_URL + '&ref=about-generic-ad-top'}
                    useExternalLink={true}
                />

                <iframe
                    src={RESUME_URL + '&ref=about-iframe'}
                    width="100%"
                    height="800px"
                    style={{border: 'none', marginBottom: '2em'}}
                />

                <GenericAd
                    title="Would you like to reach out to me?"
                    ctaText="Contact!"
                    link={PATH_CONTACT}
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
                    contentHeader={contentHeader}
                    header={null}
                    isHeaderFullWidth={true}
                    panel={panel}
                    content={content}
                />
            </PageLayout>
        )
    }
}
