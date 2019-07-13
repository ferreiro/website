import React from 'react'
import isEmpty from 'lodash/isEmpty'

import './ProjectCard.scss'
import { Link } from '../link/Link';

const renderFeatures = (features = [], hex) => (
    <div>
        <h4 className="project_body_title">
            Features
        </h4>
        <ul className="project_highlight_list">
            {features.map((feature) => (
                <li className="project_highlight_entry">
                    <div className="project_highlight_entry_icon">
                        <span className="icon-trophy" style={{color: `${hex} !important;`}} />
                    </div>
                    <p className="project_highlight_entry_text">
                        {feature}
                    </p>
                </li>
            ))}
        </ul>
    </div>
)

const renderHightlight = (highlights = [], hex) => (
    <div>
        <h4 className="project_body_title">
            Highlights
        </h4>
        <ul className="project_highlight">
            {highlights.map((highlight) => (
                <li className="project_highlight_entry">
                    <div
                        className="project_highlight_entry_icon"
                    >
                        <span
                            className="icon-trophy"
                            style={{color: `${hex} !important`}}
                        />
                    </div>
                    <p
                        className="project_highlight_entry_text"
                        dangerouslySetInnerHTML={{
                            __html: highlight
                        }}
                    />
                </li>
            ))}
        </ul>
    </div>
) 

const renderStack = (stack) => (
    <div className="project_stack">
        <h4 className="project_body_title">
            Technology stack
        </h4>
        <ul className="project_stack_list">
            <li className="project_stack_entry">
                {stack.map((technology) => {
                    if (technology === "phonegap") {
                        return (
                            <img
                                src="/images/projects/phonegap.svg"
                                style={{opacity: '0.6', width: '24px'}}
                            />
                        )
                    } else if (technology === "bower") {
                        return <i className="cbp-ig-icon devicon-bower-line" />
                    } else if (technology === "less") {
                        return <i className="cbp-ig-icon devicon-less-plain-wordmark" />
                    } else {
                        return <i className={`cbp-ig-icon devicon-${technology}-plain`} />
                    }
                    <p className="project_stack_title">
                        {technology}
                    </p>
                })}
            </li>
        </ul>
    </div>
)

export const ProjectCard = ({
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
    people,
    stack,
    features,
    highlights,
}) => {

    console.log(avatar)

    return (
        <div className="project shadow__box">
            <div className="project_bg">
                {hex && (
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
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <img src={avatar} alt="" />
                        </div>
                    )}
                </div>
                <div className="project_header_right">
                    <div className="project_header_data">
                        {title && (
                            <div className="project_header_title">
                                {links ? (
                                    <Link
                                        url={links.website}
                                        target="_blank"
                                        className="project_header_title project_header_title_clickable"
                                    >
                                        {title}
                                    </Link>
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
                        <p
                            className="project_body_text"
                            dangerouslySetInnerHTML={{
                                __html: paragraph
                            }}
                        />
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
                                    <a className="project_people_link" href={person.url} target="_blank">
                                        <img src={person.avatar} className="project_people_entry_avatar" />
                                        <span className="project_people_title">
                                            {person.name}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {highlights && renderHightlight(highlights, hex)}
                {features && renderFeatures(features, hex)}
                {stack && renderStack(stack)}


                //- Project Body
                if project.links
                  //-a.action_button(href= project.links.website, target="_blank") Check out the project!
                  .project_links
                    if project.links.website
                      a(href= project.links.website, target="_blank").project_links_website(style="color: " + project.color.hex + "; border-color:" + project.color.hex + ";") Check this out
                    if project.links.code
                      a(href= project.links.code, target="_blank").project_links_code Source code

            </div>
        </div>
    )
}