import React, {PureComponent} from 'react'
import {StickyContainer, Sticky} from 'react-sticky'
import classnames from 'classnames'

import {GenericAd} from '../../components/ads/GenericAd'
import {SidebarMenu} from '../../components/sidebarMenu/SidebarMenu'
import {PageLayout} from '../../components/layout/PageLayout'
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar'
import {translate} from '../../i18-me/i18-me'

import {AboutTalksBio} from './AboutTalksBio';
import {Button} from '../../components/buttons/Button'
import {JorgeIntersection} from './JorgeIntersection';
import {RecentArticles} from '../../components/recentArticles/RecentArticles'
import {RecentVideos} from '../../components/recentVideos/RecentVideos'
import {TalksMetrics} from '../talks/TalksMetrics';
import {TalksVenuesLogos} from '../talks/TalksVenuesLogos';

import {
    BUTTON_STYLE_LINK,
    BUTTON_STYLE_NEUTRAL,
    BUTTON_SIZE_SMALL,
    TARGET_BLANK,
    BUTTON_STYLE_FILL,
    BUTTON_SIZE_MEDIUM,
    BUTTON_STYLE_OUTLINE,
} from '../../components/constants'

import {
    ABOUT_CATEGORY_BIO,
    PATH_CONTACT,
    SIDEBAR_MENU_ABOUT_TITLE,
    ABOUT_NAVIGATION,
    PATH_ABOUT,
    SOCIAL_URL_TWITTER,
    SOCIAL_URL_LINKEDIN,
    PATH_BLOG,
    PATH_VIDEOS,
    PATH_TALKS,
    PATH_CONTACT_TALK,
} from '../constants'

import {
    getPageData,
    PAGE_COLORS,
    PAGE_CONTENT,
    ABOUT_CAREER
} from '../../content/english'

const pageData = getPageData(PATH_ABOUT)
const careerList = pageData[PAGE_CONTENT][ABOUT_CAREER]


import './About.scss'
import { Link } from '../../components/link/Link';
import { AboutGallery } from './AboutGallery';

const Section = ({
    title,
    subtitle,
    children,
}) => {
    return (
        <section className="about-section">
            {title && (
                <h2
                    className="about-section__title"
                    style={{
                        background: 'rgba(255, 255, 255, .98)',
                        zIndex: 10,
                    }}
                >
                    {title}
                </h2>
            )}

            {subtitle && (
                <h3 className="about-section__subtitle">
                    {subtitle}
                </h3>
            )}

            <div className="about-section__content">
                {children}
            </div>
        </section>
    )
}

export class About extends PureComponent {
    state = {
        isShownIntersection: false,
    }

    toggleIntersection = () => {
        this.setState((prevState) => ({
            isShownIntersection: !prevState.isShownIntersection
        }))
    }

    renderBiography = () => (
        <section className="about-me">
            <div className="about-bio">
                <div className="about-bio__description">
                    <p>👋 I am Jorge Ferreiro, a <strong>Full-Stack Software Engineer</strong> who loves <Button url="/portfolio" style={BUTTON_STYLE_LINK} text={translate('building products')} /> designed to improve people’s lives. I have an entrepreneurial and creative mindset and thrive on interaction and collaboration with team members</p>
                    <p>I am currently focusing on 🤓 <strong>Frontend with React</strong> at <Button url="https://jobs.lever.co/eventbrite?lever-via=LxHg4Lg84K" target={TARGET_BLANK} style={BUTTON_STYLE_LINK} text={translate('Eventbrite')} />, and I did <strong>Backend at Amazon</strong> with Java 8. I have a solid all-around background in building complex web software applications</p>
                    <p>I thrive on being at the intersection of four disciplines <Button onClick={this.toggleIntersection} style={BUTTON_STYLE_LINK} text={<strong>engineering, design, business and marketing</strong>} />. I am considered a strong 🗣️ communicator, 💡 ideas creator and innovator, and I am very passionate about the work I do</p>
                </div>
                {/* <div className="about-bio__pic">
                    <img
                        width="100%"
                        alt="Jorge Ferreiro is a Frontend Software Engineer, entrepreneur, blogger and host of DevelopersInDepth"
                        src="/images/about/jorge_ferreiro_is_a_software_engineer_entrepreneur_blogger_collage.png"
                    />
                </div> */}
            </div>

            {this.state.isShownIntersection && (
                <div className="spacing-6-top">
                    <JorgeIntersection />
                </div>
            )}
        </section>
    )

    renderCareerList = () => {
        return (
            <div className="about-career">
                <div className="about-career__list">
                    {Object.values(careerList).map(({
                        id,
                        location,
                        headline,
                        dates = {},
                        image = {},
                    }) => {
                        const {
                            start: startDate,
                            end: endDate,
                        } = dates

                        const {
                            alt,
                            src,
                        } = image

                        return (
                            <div
                                key={id}
                                className={classnames(
                                    'about-career__item',
                                    {'about-career__item--active': !endDate},
                                )}
                            >
                                <img
                                    className="about-career__avatar"
                                    alt={alt}
                                    src={src}
                                />
                                <p
                                    className="about-career__dates"
                                >
                                    {startDate} - {endDate ? endDate : translate('current')}
                                </p>
                                <h4
                                    className="about-career__title"
                                >
                                    {headline}
                                </h4>
                            </div>  
                        )
                    })}
                </div>

                <div className="about-career__options">
                    <Button
                        style={BUTTON_STYLE_NEUTRAL}
                        size={BUTTON_SIZE_MEDIUM}
                        text={translate('Read Résume')}
                        url='about/resume'
                    />

                    <Button
                        style={BUTTON_STYLE_NEUTRAL}
                        icon={<span className="icon icon-linkedin spacing-2-right" />}
                        text={translate('Connect on Linkedin')}
                        url={SOCIAL_URL_LINKEDIN}
                        target={TARGET_BLANK}
                    />
                </div>
            </div>
        )
    }

    renderPublicSpeaking = () => (
        <div className="about-talks">
            <AboutTalksBio />

            <div className="spacing-5-bot" style={{display: 'flex'}} />
            <div className="spacing-5-bot" style={{display: 'flex'}} />
            <TalksMetrics />

            <TalksVenuesLogos />

            <div className="about-talks__cta">
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
        </div>
    )

    render() {
        const header = (
            <header className="about-header">
                {/* <div className="about-header__background">
                    <img
                        alt="Jorge Ferreiro is a Frontend Software Engineer, entrepreneur, blogger and host of DevelopersInDepth"
                        src="/images/about/jorge_ferreiro_is_a_frontend_software_engineer_entrepreneur_blogger_wallpaper.jpg"
                    />
                </div> */}
                <div className="about-header__data">
                    <div className="about-header__avatar">
                        <img
                            alt="Jorge Ferreiro is a Frontend Software Engineer, entrepreneur, blogger and host of DevelopersInDepth"
                            src="/images/about/jorge_ferreiro_frontend_software_engineer_blogger_entrepreneur_public_speaker_and_host_of_developers_in_depth_youtube_show.jpg"
                        />
                    </div>
                    <h1 className="about-header__name">
                        Jorge Ferreiro
                    </h1>
                    <p className="about-header__headline">
                        Frontend Software Engineer, Entrepreneur, Blogger and host of DevelopersInDepth
                    </p>
                    <ul className="about-header__options">
                        <li className="about-header__option">
                            <Button
                                style={BUTTON_STYLE_NEUTRAL}
                                icon={<span className="icon icon-twitter" />}
                                text={translate('Follow')}
                                url={SOCIAL_URL_TWITTER}
                                target={TARGET_BLANK}
                            />
                        </li>
                        <li className="about-header__option">
                            <Button
                                style={BUTTON_STYLE_NEUTRAL}
                                icon={<span className="icon icon-linkedin" />}
                                text={translate('Connect')}
                                url={SOCIAL_URL_LINKEDIN}
                                target={TARGET_BLANK}
                            />
                        </li>
                    </ul>
                </div>
            </header>
        )

        const panel = (
            <div>
                <SidebarMenu
                    onClick={null}
                    selectedCategory={ABOUT_CATEGORY_BIO}
                    items={ABOUT_NAVIGATION}
                    title={SIDEBAR_MENU_ABOUT_TITLE}
                />
            </div>
        )

        const content = (
            <div>
                <Section
                    key='me'
                >
                    {this.renderBiography()}
                </Section>

                <Section
                    title={translate('Career')}
                    key='career'
                >
                    {this.renderCareerList()}
                </Section>

                <Section
                    title={translate('Public speaking')}
                    key='talks'
                >
                    {this.renderPublicSpeaking()}
                </Section>

                <Section
                    title={translate('Articles, blogs and interviews')}
                    key='writing'
                >
                    <div className="about-articles">
                        <RecentArticles />

                        <div className="spacing-6-top" />

                        <Button
                            style={BUTTON_STYLE_NEUTRAL}
                            size={BUTTON_SIZE_MEDIUM}
                            text={translate('See all blog entries')}
                            url={PATH_BLOG}
                        />
                    </div>
                </Section>

                <Section
                    title={translate('Videos and Youtube show')}
                    key='videos'
                >
                    <div className="about-videos">
                        <RecentVideos />

                        <div className="spacing-6-top" />

                        <Button
                            style={BUTTON_STYLE_NEUTRAL}
                            size={BUTTON_SIZE_MEDIUM}
                            text={translate('See all videos')}
                            url={PATH_VIDEOS}
                        />
                    </div>
                </Section>

                <Section
                    title={translate('Mentoring')}
                    key='mentoring'
                >
                    <div className="about-mentoring">
                        I have mentored more than 30 students and junior engineers.
                        If you wanna have a mentoring session with me... Go here.

                        <Button
                            style={BUTTON_STYLE_FILL}
                            size={BUTTON_SIZE_MEDIUM}
                            text={translate('Request mentory')}
                            url={PATH_CONTACT}
                        />
                    </div>
                </Section>

                <Section
                    title={translate('Photos and press')}
                    subtitle={translate('Here are some photos and press articles of me. Feel free to download or see them :)')}
                    key='photos'
                >
                    <AboutGallery />
                </Section>

                <GenericAd
                    title="Would you like to contact me?"
                    ctaText="Text me!"
                    link={PATH_CONTACT}
                />
            </div>
        )

        // TODO: Extract the layout into AboutPageLayout
        return (
            <PageLayout
                currentPath={PATH_ABOUT}
                showHeader={true}
                isHeaderFix={false}
            >
                <LayoutWithSidebar
                    beforeContent={header}
                    panel={panel}
                    content={content}
                />
            </PageLayout>
        )
    }
}
