import React, {PureComponent} from 'react'
import {StickyContainer, Sticky} from 'react-sticky'

import {GenericAd} from '../../components/ads/GenericAd'
import {SidebarMenu} from '../../components/sidebarMenu/SidebarMenu'
import {PageLayout} from '../../components/layout/PageLayout'
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar'

import {ContentHeader} from '../../components/contentHeader/ContentHeader'
import {RecentArticles} from '../../components/recentArticles/RecentArticles'
import {RecentTalks} from '../../components/recentTalks/RecentTalks'
import {RecentVideos} from '../../components/recentVideos/RecentVideos'
import {Button} from '../../components/buttons/Button'
import {translate} from '../../i18-me/i18-me'
import {getTalksMetrics} from '../talks/get-talks-metrics'

import {
    BUTTON_STYLE_NEUTRAL,
    BUTTON_SIZE_SMALL,
    TARGET_BLANK,
    BUTTON_STYLE_FILL,
    BUTTON_SIZE_MEDIUM
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
    PAGE_CONTENT,
    PAGE_TITLE,
    PAGE_SUBTITLE,
    PAGE_COLORS
} from '../../content/english'

const pageData = getPageData(PATH_ABOUT)

import './About.scss'


export class About extends PureComponent {
    generateSection = ({
        key,
        title,
        subtitle,
        content,
    }) => {
        const color = pageData[PAGE_COLORS][key]

        return (
            <StickyContainer>
                <section className="about-section">
                    <Sticky>
                        {({style}) => (
                            <h2
                                className="about-section__title"
                                style={{
                                    ...style,
                                    background: 'rgba(255, 255, 255, .98)',
                                    zIndex: 10,
                                    color
                                }}
                            >
                                {title}
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

    // TODO: Possibly moving to its own component, so we can
    // use this inside talks
    renderTalksMetrics = () => {
        const {
            countries,
            cities,
            talksCount,
        } = getTalksMetrics()

        return (
            <div>
                <li>
                    <span className="">{countries.length}</span>
                    <span className="">Countries</span>
                </li>
                <li>
                    <span className="">{talksCount}</span>
                    <span className="">Talks</span>
                </li>
                <li>
                    <span className="">{cities.length}</span>
                    <span className="">Cities</span>
                </li>
            </div>
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
                                size={BUTTON_SIZE_SMALL}
                                icon={<span className="icon icon-twitter" />}
                                text={translate('Follow')}
                                url={SOCIAL_URL_TWITTER}
                                target={TARGET_BLANK}
                            />
                        </li>
                        <li>
                            <Button
                                style={BUTTON_STYLE_NEUTRAL}
                                size={BUTTON_SIZE_SMALL}
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
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
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
                <ContentHeader
                    title={pageData[PAGE_CONTENT][PAGE_TITLE]}
                    subtitle={pageData[PAGE_CONTENT][PAGE_SUBTITLE]}
                />

                {bio}

                {this.generateSection({
                    title: translate('Career'),
                    // TODO: Move into const
                    key: 'career', 
                    subtitle: null,
                    content: (
                        <div className="about-career">
                            <div className="about-carrer__list">
                                <div className="about-carrer__item">
                                </div>
                            </div>

                            <Button
                                style={BUTTON_STYLE_FILL}
                                size={BUTTON_SIZE_MEDIUM}
                                text={translate('Read Résume')}
                                url='about/resume'
                            />
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
                            {this.renderTalksMetrics()}

                            <img width="100%" src="https://www.martagarcia.tv/wp-content/uploads/2016/02/logos-tv-marta-OPC2-1.jpg" />
                            twitter
                            JSRoundAbout
                            Adalab
                            FDI,
                            Logo Murcia
                            Logo Codecamp
                            Medialab prado
                            FirefoxOS

                            <RecentTalks />


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
                    )
                })}

                {this.generateSection({
                    // TODO: Move into const
                    key: 'writing',
                    title: translate('Articles, blogs and interviews'),
                    subtitle: null,
                    content: (
                        <div className="about-articles">
                            Poner articulos de xataka,
                            Poner articulos de terceros.
                            Poner articulos propios.

                            <RecentArticles />

                            <Button
                                style={BUTTON_STYLE_NEUTRAL}
                                size={BUTTON_SIZE_MEDIUM}
                                text={translate('See blog')}
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
                            Lista de videos...
                            Enlace a seccion

                            <RecentVideos />

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
