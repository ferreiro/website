import React, {PureComponent} from 'react'
import groupBy from 'lodash/groupBy'
import {StickyContainer, Sticky} from 'react-sticky'

import {CardTalk} from '../../components/cardTalks/CardTalk'
import {TalkListItem} from '../../components/talkListItem/TalkListItem'
import {ContentHeaderContrast} from '../../components/contentHeader/ContentHeaderContrast';
import {ConferenceAd} from '../../components/ads/ConferenceAd'
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar'
import {PageLayout} from '../../components/layout/PageLayout'
import {OneColumnLayout} from '../../components/oneColumnLayout/OneColumnLayout'

import {getPageData, PAGE_ENTITIES, PAGE_CONTENT, PAGE_TITLE, PAGE_SUBTITLE} from '../../content/english'

const pageData = getPageData(PATH_TALKS)

const title = pageData[PAGE_CONTENT][PAGE_TITLE]
const subtitle = pageData[PAGE_CONTENT][PAGE_SUBTITLE]
const items = pageData[PAGE_ENTITIES]

import {
    PATH_TALKS,
} from '../constants'

import './talks.scss'

const renderCardTalk = (talk) => (
    !talk.private
        ? <CardTalk key={talk.id} talk={talk} />
        : null
)

const renderTalk = (talk) => (
    !talk.private
        ? <TalkListItem talk={talk} />
        : null
)

export class TalksHome extends PureComponent {
    getTalksPerYear = ({
        items,
    }) => {
        const keyToGroupBy = 'year'

        return groupBy(items, keyToGroupBy)
    }

    renderTalksPerYear = ({
        ads,
        items,
        renderTalk,
    }) => {
        const talksPerYear = this.getTalksPerYear({items})
        const orderedTalksYears = Object.keys(talksPerYear).sort().reverse()

        return orderedTalksYears.map((year, index) => {
            const talks = talksPerYear[year]
            const Ad = ads[index]

            return (
                <StickyContainer>
                    <div className="talks-title__wrapper">
                        <Sticky>
                            {({style}) => (
                                <h3
                                    className="talks-title"
                                    style={{
                                        ...style,
                                        background: 'rgba(255, 255, 255, .98)',
                                        zIndex: 10,
                                    }}
                                >
                                    {year}
                                </h3>
                            )}
                        </Sticky>
                    </div>

                    <OneColumnLayout
                        items={talks}
                        renderingCallback={renderTalk}
                    />

                    {Ad && (
                        <Ad />
                    )}
                </StickyContainer>
            )
        })
    }

    render() {
        const header = (
            <ContentHeaderContrast
                title={title}
                subtitle={subtitle}
                backgroundColor='#130c49'
                backgroundImageUrl='/images/talks/jorge_ferreiro_software_engineer_and_public_speaker_on_technical_topics_and_motivational_topics.jpg'
            />
        )

        const content = (
            <div style={{marginTop: '-120px'}}>
                <ConferenceAd
                    extraClassNames="spacing-2-bot"
                />

                {this.renderTalksPerYear({
                    items,
                    renderTalk,
                    ads: {
                        // 0: ConferenceAd
                        4: ConferenceAd,
                    }
                })}
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
