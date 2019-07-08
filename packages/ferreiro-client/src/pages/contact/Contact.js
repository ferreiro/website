import React, {Component} from 'react'


import {ContactForm} from './ContactForm'

import {ContentHeader} from '../../components/contentHeader/ContentHeader'
import {PageLayout} from '../../components/layout/PageLayout'
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar'
import {content} from '../../content/english'

const {
    title,
    subtitle,
} = content.contact

export class Contact extends Component {

    render() {
        const contentHeader = (
            <ContentHeader
                title={title}
                subtitle={subtitle}
            />
        )

        return (
            <PageLayout
                showHeader={true}
                isHeaderFix={false}
            >
                <LayoutWithSidebar
                    header={null}
                    isHeaderFullWidth={true}
                    panel={null}
                    contentHeader={contentHeader}
                    content={<ContactForm />}
                />
            </PageLayout>
        )
    }
}
