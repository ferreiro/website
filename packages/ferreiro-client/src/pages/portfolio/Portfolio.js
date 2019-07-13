import React, {PureComponent} from 'react'

import {ContentHeader} from '../../components/contentHeader/ContentHeader'
import {PageLayout} from '../../components/layout/PageLayout'
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar'
import {content} from '../../content/english'
import {SidebarMenu} from '../../components/sidebarMenu/SidebarMenu';
import {ABOUT_NAVIGATION, SIDEBAR_MENU_ABOUT_TITLE, ABOUT_CATEGORY_PORTFOLIO, PATH_ABOUT} from '../constants';
import {ThreeColumnLayout} from '../../components/threeColumnLayout/ThreeColumnLayout';
import { ProjectCard } from '../../components/projectCard/ProjectCard';

const portfolio = content.portfolio

const renderItem = (project) => (
    <ProjectCard
        {...project}
    />
)

const getPortfolioContent = ({
    portfolio,
}) => {
    // if (isLoading) {
    //     return (
    //         <Loader />
    //     )
    // }

    // if index == projects.length - 1
    //     .threeColsGrid__item
    //     .threeColsGrid__item__wrapper

    //         .talk__ad.shadow__box.margin-bottom-1-5(style="height: auto !important;")
    //         h1.talk__ad__title My next project?
    //         p.talk__ad__subtitle Want to be the first to know my next project or adventure? Join my newsltter and be up to date!
    //         +subscriptionBox()

    //         .talk__ad.shadow__box(style="height: auto !important; padding-bottom: 2em;")
    //         h1.talk__ad__title Do you have a project or idea?
    //         p.talk__ad__subtitle Let's keep in touch! Ping me or contact me and I'll try to provide you feedback or maybe team up to make it happen :).
    //         a(href="/contact").talk__ad__link__simple Contact me

    return <ThreeColumnLayout items={portfolio} renderingCallback={renderItem} />

    return (
        <div className="threeColsGrid">
            {portfolio.map(renderItem)}
        </div>
    )
}

export class Portfolio extends PureComponent {
    state = {
        projects: [],
    }

    componentDidMount() {}

    render() {
        const {isLoading} = this.state

        const panel = (
            <div>
                <SidebarMenu
                    onClick={null}
                    selectedCategory={ABOUT_CATEGORY_PORTFOLIO}
                    items={ABOUT_NAVIGATION}
                    title={SIDEBAR_MENU_ABOUT_TITLE}
                />
            </div>
        )

        const content = (
            <div>
                <ContentHeader
                    title="Portfolio"
                    subtitle="Webs, apps and personal projects"
                />
                {getPortfolioContent({
                    portfolio
                })}
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
                    header={null}
                    isHeaderFullWidth={true}
                    panel={panel}
                    content={content}
                />
            </PageLayout>
        )
    }
}