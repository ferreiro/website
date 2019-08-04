import React, {PureComponent} from 'react'
import {Waypoint} from 'react-waypoint'
import { Link } from '../../components/link/Link';
import { TARGET_BLANK } from '../../components/constants';

const galleryImages = [
    {
        alt: 'Jorge ferreiro giving a technical talk at twitter london about javascript web performance for JS roundabout',
        src: '/images/about/photos/jorge_ferreiro_giving_a_technical_talk_at_twitter_london_about_javascript_webs_performance_for_JS_roundabout.jpg',
        link: '/images/about/photos/jorge_ferreiro_giving_a_technical_talk_at_twitter_london_about_javascript_webs_performance_for_JS_roundabout.jpg',
    },
    {
        alt: 'Jorge ferreiro giving a talk about github at adalab a technical bootcamp for women in tech',
        src: '/images/about/photos/jorge_ferreiro_giving_a_talk_about_github_at_adalab_a_technical_bootcamp_for_women_in_tech.jpg',
        link: '/images/about/photos/jorge_ferreiro_giving_a_talk_about_github_at_adalab_a_technical_bootcamp_for_women_in_tech.jpg',
    },
    {
        alt: 'Jorge ferreiro giving a talk about github at adalab a technical bootcamp for women in tech group 2',
        src: '/images/about/photos/jorge_ferreiro_giving_a_talk_about_github_at_adalab_a_technical_bootcamp_for_women_in_tech_group_2.jpg',
        link: '/images/about/photos/jorge_ferreiro_giving_a_talk_about_github_at_adalab_a_technical_bootcamp_for_women_in_tech_group_2.jpg',
    },
    {
        alt: 'Jorge ferreiro giving a lightning technical talk in JS day Es',
        src: '/images/about/photos/jorge_ferreiro_giving_a_lightning_technical_talk_in_js_day_es.png',
        link: '/images/about/photos/jorge_ferreiro_giving_a_lightning_technical_talk_in_js_day_es.png',
    },
    {
        alt: 'Jorge ferreiro giving a motivational talk in Codecamp murcia',
        src: '/images/about/photos/jorge_ferreiro_giving_a_motivational_talk_in_codecamp_murcia.jpg',
        link: '/images/about/photos/jorge_ferreiro_giving_a_motivational_talk_in_codecamp_murcia.jpg',
    },
    {
        alt: 'Jorge ferreiro article in xataka about fav code editor',
        src: '/images/about/photos/jorge_ferreiro_article_in_xataka_about_fav_code_editor.png',
        link: 'https://www.xataka.com/otros/editor-codigo-favorito-programadores-8-profesionales-nos-dan-su-respuesta',
    },
    {
        alt: 'Jorge ferreiro photo album software engineer eventbrite amazon',
        src: '/images/about/photos/jorge_ferreiro_photo_album_software_engineer_eventbrite_amazon.jpg',
        link: '/images/about/photos/jorge_ferreiro_photo_album_software_engineer_eventbrite_amazon.jpg',
    },
    {
        alt: 'Jorge ferreiro being interview for hackupc hackathon in barcelona 2019',
        src: '/images/about/photos/jorge_ferreiro_being_interview_for_hackupc_hackathon_in_barcelona_2019.jpg',
        link: '/images/about/photos/jorge_ferreiro_being_interview_for_hackupc_hackathon_in_barcelona_2019.jpg',
    },
]

export class AboutGallery extends PureComponent {
    state = {
        isVisible: false,
    }

    onEnter = () => {
        this.setState({isVisible: true});        
    }

    renderContent = () => (
        <div className="about-photos">
            {galleryImages.map(({
                alt,
                src,
                link,
            }) => (
                <Link
                    to={link}
                    target={TARGET_BLANK}
                >
                    <span>
                        <div className="wrapper">
                            <img
                                alt={alt}
                                src={src}
                                title={alt}
                            />
                        </div>
                    </span>
                </Link>
            ))}
        </div>
    )

    render() {
        const content = this.state.isVisible === false
            ? null
            : this.renderContent()

        return (
            <Waypoint
                onEnter={this.onEnter}
            >
                {content}
            </Waypoint>
        )
    }
}
