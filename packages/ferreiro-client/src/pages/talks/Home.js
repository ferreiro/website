import React, {PureComponent} from 'react'

import {BUTTON_SIZE_BIG} from '../../components/constants';
import {ButtonSubscribe} from '../../components/buttons/ButtonSubscribe';
import {CardTalk} from '../../components/cardTalks/CardTalk';
import {ContentHeader} from '../../components/contentHeader/ContentHeader';
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar';
import {PageLayout} from '../../components/layout/PageLayout';
import {ThreeColumnLayout} from '../../components/threeColumnLayout/ThreeColumnLayout';

import {content} from '../../content/english';

const {
    title,
    subtitle,
    items = [],
} = content.talks;

import {
    BLOG_CATEGORY_TO_CONTENT,
} from '../constants'

const currentPath = 'talks'

const extraContent = (
    <ButtonSubscribe
        size={BUTTON_SIZE_BIG}
    />
)

const header = (
    <ContentHeader
        title={title}
        subtitle={subtitle}
        extraContent={extraContent}
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
        const content = (
            <ThreeColumnLayout
                items={items}
                renderingCallback={renderTalk}
            />
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
