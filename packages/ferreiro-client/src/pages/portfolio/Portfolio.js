import React, {PureComponent} from 'react'
import isEmpty from 'lodash/isEmpty'

import {ContentHeader} from '../../components/contentHeader/ContentHeader'
import {PageLayout} from '../../components/layout/PageLayout'
import {LayoutWithSidebar} from '../../components/layout/LayoutWithSidebar'
import {content} from '../../content/english'

const portfolio = content.portfolio

const renderFeatures = (features = []) => (
    <div>
        <h4 className="project_body_title">
            Features
        </h4>
        <ul className="project_highlight_list">
            {features.map((feature) => (
                <li className="project_highlight_entry">
                    <div className="project_highlight_entry_icon" />
                    <span className="icon-trophy" style={{color: `${hex} !important;`}} />
                    <p className="project_highlight_entry_text">
                        {feature}
                    </p>
                </li>
            ))}
        </ul>
    </div>
)

const renderHightlight = (highlights = []) => (
    <div>
        <h4 className="project_body_title">
            Highlights
        </h4>
        <ul className="project_highlight">
            {highlights.map((highlight) => (
                <li className="project_highlight_entry">
                    <div className="project_highlight_entry_icon" />
                    <span className="icon-trophy" style={{color: `${hex} !important`}} />
                    <p className="project_highlight_entry_text">
                        {highlight}
                    </p>
                </li>
            ))}
        </ul>
    </div>
) 

const renderItem = (project) => {
    const {
        about,
        avatar,
        color: {
            hex,
            rgba_gradient_start,
            rgba_gradient_end,
        } = {},
        date,
        images,
        title,
        links,
    } = project


    // if project.stack
    //     h4.project_body_title Technology stack
    //     .project_stack
    //     ul.project_stack_list
    //         for technology in project.stack
    //         li.project_stack_entry
    //             if technology == "phonegap"
    //             img(data-src="/images/projects/phonegap.svg", class="lazy", style="opacity: 0.6; width:24px;")
    //             else if technology == "bower"
    //             i(class="cbp-ig-icon devicon-bower-line")
    //             else if technology == "less"
    //             i(class="cbp-ig-icon devicon-less-plain-wordmark")
    //             else
    //             i.cbp-ig-icon(class="devicon-" + technology + "-plain")
    //             p.project_stack_title #{technology}

    // //- Project Body
    // if project.links
    //     //-a.action_button(href= project.links.website, target="_blank") Check out the project!
    //     .project_links
    //         if project.links.website
    //         a(href= project.links.website, target="_blank").project_links_website(style="color: " + project.color.hex + "; border-color:" + project.color.hex + ";") Check this out
    //         if project.links.code
    //         a(href= project.links.code, target="_blank").project_links_code Source code

        
    return (
        <div className="threeColsGrid__item">
            <div className="threeColsGrid__item__wrapper">
                <div className="project shadow__box">
                    <div className="project_bg">
                        {color && (
                            <div
                                className="project_bg_solid"
                                style={{
                                    backgroundColor: hex
                                }}
                            />
                        )}
                    </div>
                    <div className="project_header">
                        <div className="project_header_left">
                            {avatar && (
                                <div className="project_header_avatar"
                                    dataSrc={avatar}
                                    className="lazy"
                                    style={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                            )}
                        </div>
                        <div className="project_header_right">
                            <div className="project_header_data">
                                {title && (
                                    <div className="project_header_title">
                                        {links ? (
                                            <a
                                                className="project_header_title project_header_title_clickable"
                                                href={links.website}
                                                target="_blank"
                                            >
                                                {title}
                                            </a>
                                        ) : (
                                            <a className="project_header_title">
                                                {title}
                                            </a>
                                        )}
                                    </div>
                                )}
                                {date && (
                                    <a className="project_header_date">
                                        {date}
                                    </a>
                                )}
                            </div>
                            <div className="project_header_share">
                                <span className="icon-share" />
                            </div>
                        </div>

                        {isEmpty(images) && (
                            <div className="project_gallery">
                                <div
                                    className="project_gallery_gradient"
                                    style={{
                                        backgroundImage: `linear-gradient(to left, ${rgba_gradient_start}, ${rgba_gradient_end})`
                                    }}
                                />
                                <div className="project_gallery_wrapper" />
                                <div className="project_gallery_next">
                                    <p></p>
                                    <span className="icon-next" />
                                </div>
                                <div className="project_gallery_list">
                                    {project.images.map(({
                                        small,
                                        large,
                                    }) => (
                                        <div className="project_gallery_entry" dataSrc={small} className="lazy" style={{backgroundColor: 'rgba(0, 0, 0, .1)'}}>
                                            <input className="bigImage" type="hidden" value={large} name="bigImage" />
                                        </div>
                                    ))}

                                    <div className="project_gallery_entry project_gallery_list__offset" />
                                </div>
                            </div>
                        )}

                        <div className="project_body">
                            {about && (
                                <h4 className="project_body_title">
                                    About {title}
                                </h4>
                            )}

                            {about.length > 0 ? (
                                about.map((paragraph) => (
                                    <p className="project_body_text">
                                        {paragraph}
                                    </p>
                                ))
                            ) : (
                                <p className="project_body_text">
                                    {about}
                                </p>
                            )}

                            {people && people.hidden === false && (
                                <div className="project_people">
                                    <h4 className="project_body_subtitle">
                                        Team
                                    </h4>
                                    <ul className="project_people_list">
                                        {people.entries.map(person => (
                                            <li className="project_people_entry">
                                                a(href= person.url, target="_blank").project_people_link
                                                img(data-src= person.avatar, class="lazy").project_people_entry_avatar
                                                span.project_people_title= person.name
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {highlights && renderHightlight(highlights)}
                            {features && renderFeatures(features)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

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

        const portfolioContentHeader = (
            <ContentHeader
                title="Portfolio"
                subtitle="Webs, apps and personal projects"
            />
        )

        const portfolioContent = getPortfolioContent({
            portfolio
        })

        return (
            <PageLayout
                showHeader={true}
                isHeaderFix={false}
            >
                <LayoutWithSidebar
                    header={null}
                    isHeaderFullWidth={true}
                    panel={null}
                    contentHeader={portfolioContentHeader}
                    content={portfolioContent}
                />
            </PageLayout>
        )
    }
}