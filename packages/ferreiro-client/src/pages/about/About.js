import React, {PureComponent} from 'react'
import {StickyContainer, Sticky} from 'react-sticky'

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
    PAGE_COLORS
} from '../../content/english'

const pageData = getPageData(PATH_ABOUT)


import './About.scss'

export class About extends PureComponent {
    state = {
        isShownIntersection: false,
    }

    toggleIntersection = () => {
        this.setState((prevState) => ({
            isShownIntersection: !prevState.isShownIntersection
        }))
    }

    generateSection = ({
        key,
        title,
        subtitle,
        content,
    }) => {
        const color = pageData[PAGE_COLORS][key]
        const hashId = title.replace(' ', '-')

        return (
            <StickyContainer>
                <section className="about-section">
                    <Sticky>
                        {({style}) => (
                            <h2
                                className="about-section__title"
                                id={hashId}
                                style={{
                                    ...style,
                                    background: 'rgba(255, 255, 255, .98)',
                                    zIndex: 10
                                }}
                            >
                                <a
                                    href={`#${hashId}`}
                                    style={{color}}
                                >
                                    {title}
                                </a>
                            </h2>
                        )}
                    </Sticky>

                    {subtitle && (
                        <h3 className="about-section__subtitle">
                            {subtitle}
                        </h3>
                    )}

                    <div className="about-section__content">
                        {content}
                    </div>
                </section>
            </StickyContainer>
        )
    }

    render() {
        const header = (
            <header className="about-header">
                <div className="about-header__background">
                    <img
                        alt="Jorge Ferreiro is a Frontend Software Engineer, entrepreneur, blogger and host of DevelopersInDepth"
                        src="/images/about/jorge_ferreiro_is_a_frontend_software_engineer_entrepreneur_blogger_wallpaper.jpg"
                    />
                </div>
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
                        <li>
                            <Button
                                style={BUTTON_STYLE_NEUTRAL}
                                icon={<span className="icon icon-twitter" />}
                                text={translate('Follow')}
                                url={SOCIAL_URL_TWITTER}
                                target={TARGET_BLANK}
                            />
                        </li>
                        <li>
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

        const bio = (
            <section className="about-bio">
                <div className="about-bio__description spacing-4-left">
                    <p>👋 I am Jorge Ferreiro, a <strong>Full-Stack Software Engineer</strong> who loves <Button url="/portfolio" style={BUTTON_STYLE_LINK} text={translate('building products')} /> designed to improve people’s lives. I have an entrepreneurial and creative mindset and thrive on interaction and collaboration with team members</p>
                    <p>I am currently focusing on 🤓 <strong>Frontend with React</strong> at <Button url="https://www.eventbritecareers.com/home" target={TARGET_BLANK} style={BUTTON_STYLE_LINK} text={translate('Eventbrite')} />, and I did <strong>Backend at Amazon</strong> with Java 8. I have a solid all-around background in building complex web software applications</p>
                    <p>I thrive on being at the intersection of four disciplines <Button onClick={this.toggleIntersection} style={BUTTON_STYLE_LINK} text={<strong>engineering, design, business and marketing</strong>} />. I am considered a strong 🗣️ communicator, 💡 ideas creator and innovator, and I am very passionate about the work I do</p>
                    {/* <img
                        width="100px"
                        alt="Jorge ferreiro intersection software engineering design business marketing"
                        src="/images/about/Jorge_ferreiro_intersection_software_engineering_design_business_marketing.png"
                    /> */}
                </div>
                <div className="about-bio__pic">
                    <img
                        width="100%"
                        alt="Jorge Ferreiro is a Frontend Software Engineer, entrepreneur, blogger and host of DevelopersInDepth"
                        src="/images/about/jorge_ferreiro_is_a_software_engineer_entrepreneur_blogger_collage.png"
                    />
                </div>
            </section>
        )

        const content = (
            <div>
                {this.generateSection({
                    title: translate('About me'),
                    // TODO: Move into const
                    key: 'me', 
                    subtitle: null,
                    content: (
                        <div className="about-me">
                            {bio}

                            {this.state.isShownIntersection && (
                                <div className="spacing-4-top">
                                    <JorgeIntersection />
                                </div>
                            )}
                        </div>
                    )
                })}

                {this.generateSection({
                    title: translate('Career'),
                    // TODO: Move into const
                    key: 'career', 
                    subtitle: null,
                    content: (
                        <div className="about-career">
                            <div className="about-career__list">
                                <div className="about-career__item about-career__item--active">
                                    <img
                                        className="about-career__avatar"
                                        alt="Jorge Ferreiro Frontend Software Engineer at Eventbrite"
                                        src="/images/companies/eventbrite-dark.png"
                                    />
                                    <p
                                        className="about-career__dates"
                                    >
                                        Sep 2018 - current
                                    </p>
                                    <h4
                                        className="about-career__title"
                                    >
                                        {translate('Frontend Software Engineer at Eventbrite')}
                                    </h4>
                                </div>
                                <div className="about-career__item">
                                    <img
                                        className="about-career__avatar"
                                        alt="Jorge Ferreiro Background Software Engineer Intern at Amazon"
                                        src="/images/companies/amazon-dark.png"
                                    />
                                    <p
                                        className="about-career__dates"
                                    >
                                        Jan 2018 - Jul 2018
                                    </p>
                                    <h4
                                        className="about-career__title"
                                    >
                                        {translate('Backend Software Engineer Internship at Amazon')}
                                    </h4>
                                </div>
                                <div className="about-career__item">
                                    <img
                                        className="about-career__avatar"
                                        alt="Jorge Ferreiro creator and Full Stack Software Engineer at Dailyfocus"
                                        src="/images/companies/dailyfocus-dark.png"
                                    />
                                    <p
                                        className="about-career__dates"
                                    >
                                        Jan 2018 - Jul 2018
                                    </p>
                                    <h4
                                        className="about-career__title"
                                    >
                                        {translate('Creator and Full Stack Software Engineer at Dailyfocus')}
                                    </h4>
                                </div>

                                <div className="about-career__item">
                                    <img
                                        className="about-career__avatar"
                                        alt="Jorge Ferreiro creator and Summer Scholarship with Huawei"
                                        src="/images/companies/huawei-dark.png"
                                    />
                                    <p
                                        className="about-career__dates"
                                    >
                                        Jan 2018 - Jul 2018
                                    </p>
                                    <h4
                                        className="about-career__title"
                                    >
                                        {translate('Summer Scholarship with Huawei')}
                                    </h4>
                                </div>

                                <div className="about-career__item">
                                    <img
                                        className="about-career__avatar"
                                        alt="Jorge Ferreiro creator and Full Stack Software Engineer at Dailyfocus"
                                        src="/images/companies/music4deejays-dark.png"
                                    />
                                    <p
                                        className="about-career__dates"
                                    >
                                        Jan 2018 - Jul 2018
                                    </p>
                                    <h4
                                        className="about-career__title"
                                    >
                                        {translate('Creator and Full Stack Software Engineer at Music4deejays')}
                                    </h4>
                                </div>
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
                                    icon={<span className="icon icon-linkedin" />}
                                    text={translate('Connect on Linkedin')}
                                    url={SOCIAL_URL_LINKEDIN}
                                    target={TARGET_BLANK}
                                />
                            </div>
                        </div>
                    )
                })}

                {this.generateSection({
                    // TODO: Move into const
                    key: 'talks', 
                    title: translate('Public speaking'),
                    subtitle: null,
                    content: (
                        <div className="about-talks">
                            <AboutTalksBio />

                            <div className="spacing-3-bot" style={{display: 'flex'}} />
                            <div className="spacing-3-bot" style={{display: 'flex'}} />
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
                })}

                {this.generateSection({
                    // TODO: Move into const
                    key: 'writing',
                    title: translate('Articles, blogs and interviews'),
                    subtitle: null,
                    content: (
                        <div className="about-articles">
                            <RecentArticles />

                            <div className="spacing-4-top" />

                            <Button
                                style={BUTTON_STYLE_NEUTRAL}
                                size={BUTTON_SIZE_MEDIUM}
                                text={translate('See all blog entries')}
                                url={PATH_BLOG}
                            />
                        </div>
                    )
                })}

                {this.generateSection({
                    // TODO: Move into const
                    key: 'videos',
                    title: translate('Videos and Youtube show'),
                    subtitle: null,
                    content: (
                        <div className="about-videos">
                            <RecentVideos />

                            <div className="spacing-4-top" />

                            <Button
                                style={BUTTON_STYLE_NEUTRAL}
                                size={BUTTON_SIZE_MEDIUM}
                                text={translate('See all videos')}
                                url={PATH_VIDEOS}
                            />
                        </div>
                    )
                })}

                {this.generateSection({
                    // TODO: Move into const
                    key: 'mentoring',
                    title: translate('Mentoring'),
                    content: (
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
                    )
                })}


                {this.generateSection({
                    // TODO: Move into const
                    key: 'photos',
                    title: translate('Photos and press'),
                    subtitle: translate('Some photos about me. Yay! :)'),
                    content: (
                        <div className="about-videos">
                            Poner fotos de conferencias, etc...
                            Tambien poner el caption para que se vea facil.
                        </div>
                    )
                })}

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
