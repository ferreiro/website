import React, {PureComponent} from 'react'

import {PageLayout} from '../../components/layout/PageLayout'
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar'
import {content} from '../../content/english'
import {
    PATH_HOME,
} from '../constants'

export class Home extends PureComponent {

    render() {
        const header = (
            <h1>Hola</h1>
        )

        const content = (
            <div>
                <p>TODO: Put menu for mobile</p>
                <h1>About Content</h1>
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
                    header={null}
                    isHeaderFullWidth={true}
                    content={content}
                />
            </PageLayout>
        )
    }
}
