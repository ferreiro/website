import React, {Component} from 'react'

import {ContactForm} from './ContactForm'
import {ContentHeader} from '../../components/contentHeader/ContentHeader'
import {PageLayout} from '../../components/layout/PageLayout'
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar'

import {getPageData, PAGE_CONTENT, PAGE_TITLE, PAGE_SUBTITLE} from '../../content/english'
import {PATH_CONTACT_TALK} from '../constants';

const pageData = getPageData(PATH_CONTACT_TALK)
const contentHeader = (
    <ContentHeader
        title={pageData[PAGE_CONTENT][PAGE_TITLE]}
        subtitle={pageData[PAGE_CONTENT][PAGE_SUBTITLE]}
    />
)

export class ContactTalk extends Component {
    render = () => (
        <PageLayout
            currentPath={PATH_CONTACT_TALK}
            showHeader={true}
            isHeaderFix={false}
        >
            <LayoutWithSidebar
                isHeaderFullWidth={true}
                contentHeader={contentHeader}
                content={<ContactForm />}
            />
        </PageLayout>
    )
}
