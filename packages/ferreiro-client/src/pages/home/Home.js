import React, {PureComponent} from 'react'

import {PageLayout} from '../../components/layout/PageLayout'
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar'

import {RecentArticles} from '../../components/recentArticles/RecentArticles'
import {RecentTalks} from '../../components/recentTalks/RecentTalks'
import {RecentVideos} from '../../components/recentVideos/RecentVideos'

import {content} from '../../content/english'
import {
    PATH_HOME,
} from '../constants'

export class Home extends PureComponent {

    render() {
        const beforeContent = (
            <h2>Splash</h2>
        )

        const content = (
            <div>
                <h2>Most recent videos</h2>
                <RecentVideos />

                <h2>Most recent articles</h2>
                <RecentArticles />

                <h2>Latest conferences</h2>
                <RecentTalks />
            </div>
        )

        // TODO: Extract the layout into AboutPageLayout
        return (
            <PageLayout
                currentPath={PATH_HOME}
                showHeader={true}
                isHeaderFix={false}
            >
                <LayoutWithSidebar
                    beforeContent={beforeContent}
                    header={null}
                    isHeaderFullWidth={true}
                    content={content}
                />
            </PageLayout>
        )
    }
}
