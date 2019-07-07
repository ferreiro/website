import React, {PureComponent} from 'react'

import {ContentHeader} from '../../components/contentHeader/ContentHeader';
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar';
import {PageLayout} from '../../components/layout/PageLayout';
import {CardTalk} from '../../components/cardTalks/CardTalk';

import {
    BLOG_CATEGORY_TO_CONTENT,
} from '../constants'

const currentPath = 'talks'
const description = 'Foo'
const title = 'Conferences'

const header = (
    <ContentHeader
        title={title}
        subtitle={description}
        showSubscribeButton={true}
    />
)

const renderTalk = (talk) => (
    <CardTalk
        key={talk.id}
        talk={talk}
    />
)

export class TalksHome extends PureComponent {
    state = {}

    render() {
        const talks = [
            {
                
            }
        ]
        const content = (
            <div>
                {talks.map(renderTalk)}
            </div>
        )

        return (
            <PageLayout
                currentPath={currentPath}
                showHeader={true}
                isHeaderFix={false}
            >
                <LayoutWithSidebar
                    header={null}
                    isHeaderFullWidth={true}
                    panel={null}
                    contentHeader={header}
                    content={content}
                />
            </PageLayout>
        )
    }
}
