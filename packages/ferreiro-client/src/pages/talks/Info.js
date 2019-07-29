import React, {PureComponent} from 'react'

import { TalksVenuesLogos } from './TalksVenuesLogos';
import { SidebarSeparator } from '../../components/sidebarSeparator/SidebarSeparator';
import { BUTTON_STYLE_NEUTRAL, BUTTON_SIZE_MEDIUM, BUTTON_STYLE_FILL } from '../../components/constants';

import {AboutTalksBio} from '../about/AboutTalksBio';
import {TalksMetrics} from './TalksMetrics';
import {ContentHeaderContrast} from '../../components/contentHeader/ContentHeaderContrast';
import {ConferenceAd} from '../../components/ads/ConferenceAd'
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar'
import {PageLayout} from '../../components/layout/PageLayout'

import {getPageData, PAGE_CONTENT, PAGE_TITLE, PAGE_SUBTITLE} from '../../content/english'

const pageData = getPageData(PATH_TALKS)

const title = pageData[PAGE_CONTENT][PAGE_TITLE]
const subtitle = pageData[PAGE_CONTENT][PAGE_SUBTITLE]

import {
    PATH_TALKS, PATH_CONTACT_TALK,
} from '../constants'

import './talks.scss'
import { translate } from '../../i18-me/i18-me';
import { Button } from '../../components/buttons/Button';

export class TalksInfo extends PureComponent {
    render() {
        const header = (
            <ContentHeaderContrast
                title={title}
                afterContent={<TalksMetrics />}
                backgroundColor='#130c49'
                backgroundImageUrl='/images/talks/jorge_ferreiro_software_engineer_and_public_speaker_on_technical_topics_and_motivational_topics.jpg'
            />
        )

        const content = (
            <div style={{marginTop: '-120px'}}>
                <ConferenceAd
                    showMoreInfo={false}
                />

                <div style={{marginTop: '80px', borderTop: '1px solid transparent'}} />

                <AboutTalksBio />

                <div style={{marginTop: '80px', borderTop: '1px solid transparent'}} />

                <TalksVenuesLogos />

                <div style={{marginTop: '40px', borderTop: '1px solid transparent'}} />

                <div style={{textAlign: 'center'}}>
                    <Button
                        style={BUTTON_STYLE_NEUTRAL}
                        size={BUTTON_SIZE_MEDIUM}
                        text={translate('See talks')}
                        url={PATH_TALKS}
                    />

                    <Button
                        style={BUTTON_STYLE_FILL}
                        size={BUTTON_SIZE_MEDIUM}
                        text={translate('Bring me to your event')}
                        url={PATH_CONTACT_TALK}
                    />
                </div>

                <div style={{marginBottom: '120px', borderTop: '1px solid transparent'}} />
            </div>
        )

        return (
            <PageLayout
                currentPath={PATH_TALKS}
                showHeader={true}
                isHeaderFix={false}
            >
                <LayoutWithSidebar
                    header={header}
                    isHeaderFullWidth={true}
                    content={content}
                    wrapperClassName="talks-with-background"
                />
            </PageLayout>
        )
    }
}
