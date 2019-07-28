import React, {Component} from 'react'

import {ContactForm} from './ContactForm'
import {ContentHeader} from '../../components/contentHeader/ContentHeader'
import {PageLayout} from '../../components/layout/PageLayout'
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar'

import {ConferenceAd} from '../../components/ads/ConferenceAd'

import {getPageData, PAGE_CONTENT, PAGE_TITLE, PAGE_SUBTITLE} from '../../content/english'
import {PATH_CONTACT} from '../constants';

const pageData = getPageData(PATH_CONTACT)
const contentHeader = (
    <ContentHeader
        title={pageData[PAGE_CONTENT][PAGE_TITLE]}
        subtitle={pageData[PAGE_CONTENT][PAGE_SUBTITLE]}
    />
)

export class Contact extends Component {
    render = () => (
        <PageLayout
            currentPath={PATH_CONTACT}
            showHeader={true}
            isHeaderFix={false}
        >
            <LayoutWithSidebar
                header={null}
                isHeaderFullWidth={true}
                panel={null}
                contentHeader={contentHeader}
                content={
                    <div>
                        <ContactForm />
                        <ConferenceAd />
                    </div>
                }
            />
        </PageLayout>
    )
}
