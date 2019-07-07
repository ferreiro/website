import React, {PureComponent} from 'react'

import {ContentHeader} from '../../components/contentHeader/ContentHeader';
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar';
import {PageLayout} from '../../components/layout/PageLayout';


import {
    BLOG_CATEGORY_TO_CONTENT,
} from '../constants'

const title = 'Videos'
const description = 'Youtube Show hosted by @jgferreiro with interviews to top tech leaders ⚡ Propose the next interview or ask for an interview here: www.devsindepth.com'

const extraContent = (
    <div>
        Subscribe to channel
    </div>
)

const header = (
    <ContentHeader
        extraContent={extraContent}
        title={title}
        subtitle={description}
    />
)

export class VideosHome extends PureComponent {
    state = {}

    render() {
        const content = (
            <div>
                <div style={{backgroundColor: '#000', padding: '2em', display: 'flex'}}>
                    <div style={{flex: '1 1 auto'}}>
                        <img height="120px" src="https://www.devsindepth.com/static/logo_developers_in_depth_by_jorge_ferreiro.svg" />
                        <br />
                        <img width="50%" src="/images/videos/rahma_javed_engineering_director_deliveroo_microsoft_wealthfront.png" />
                    </div>
                    <div style={{flex: '1 1 auto', color: 'white'}}>
                        <h1>Rahma Javed</h1>
                        <h2>Engineering Director at Deliveroo. Former @Microsoft, Wealthfront</h2>
                        <p>Poner logos</p>
                        <p>Algo mas description.</p>
                    </div>
                </div>

            </div>
        )

        return (
            <PageLayout
                currentPath='videos'
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
