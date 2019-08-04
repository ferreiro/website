import React, {PureComponent} from 'react'
import {Waypoint} from 'react-waypoint'

import {translate} from '../../i18-me/i18-me'

import './TalksVenuesLogos.scss'

export class TalksVenuesLogos extends PureComponent {
    state = {
        isVisible: false,
    }

    onEnter = () => {
        this.setState({isVisible: true})
    }

    render() {
        return (
            <Waypoint
                onEnter={this.onEnter}
            >
                {this.state.isVisible ? (
                    <div className="talks-venues-logos">
                        <div className="talks-venues-logos__items">
                            <img
                                alt="Jorge Ferreiro Software Engineer Entrepreneur Blogger Writter Talk JS Roundabout Twitter Longon"
                                src="/images/talks/venues/jorge_ferreiro_software_engineer_entrepreneur_blogger_writter_talk_js_roundabout_twitter_longon.jpg"
                            />

                            <img
                                alt="Jorge Ferreiro Software Engineer Entrepreneur Blogger Writter masterclasses Adalab Technical Bootcamp For Woman In Tech"
                                src="/images/talks/venues/jorge_ferreiro_software_engineer_entrepreneur_blogger_writter_talk_masterclasses_adalab_technical_bootcamp_for_woman_in_tech.png"
                            />

                            <img
                                alt="Jorge Ferreiro Software Engineer Entrepreneur Blogger Writter lightning Talk Js Day es"
                                src="/images/talks/venues/jorge_ferreiro_software_engineer_entrepreneur_blogger_writter_lightning_talk_js_day_es.png"
                            />

                            <img
                                alt="Jorge Ferreiro Software Engineer Entrepreneur Blogger Writter talk Universidad Complutense de Madrid"
                                src="/images/talks/venues/jorge_ferreiro_software_engineer_entrepreneur_blogger_writter_universidad_complutense_de_madrid.jpg"
                            />

                            <img
                                alt="Jorge Ferreiro Software Engineer Entrepreneur Blogger Writter talk at Facultad de Informatica de la Universidad Complutense de Madrid (FDI UCM)"
                                src="/images/talks/venues/jorge_ferreiro_software_engineer_entrepreneur_blogger_writter_talk_facultad_de_informatica_ucm_fdi.png"
                            />


                            <img
                                alt="Jorge Ferreiro Software Engineer Entrepreneur Blogger Writter talk Codecamp Murcia 2019"
                                src="/images/talks/venues/jorge_ferreiro_software_engineer_entrepreneur_blogger_writter_codecamp_murcia_talk.png"
                            />

                            <img
                                alt="Jorge Ferreiro Software Engineer Entrepreneur Blogger Writter talk at Twitter London Office with JS Roundabout meetup"
                                src="/images/talks/venues/jorge_ferreiro_software_engineer_entrepreneur_blogger_writter_talk_js_roundabout_twitter_longon_meetup.png"
                            />

                            <img
                                alt="Jorge Ferreiro Software Engineer Entrepreneur Blogger Writter Talk Django Girls Madrid"
                                src="/images/talks/venues/jorge_ferreiro_software_engineer_entrepreneur_blogger_writter_talk_django_girls_madrid.png"
                            />

                            <img
                                alt="Jorge Ferreiro Software Engineer Entrepreneur Blogger Writter talk Medialaba Prado for Mozilla Firefox OS meetup"
                                src="/images/talks/venues/jorge_ferreiro_software_engineer_entrepreneur_blogger_writter_talk_medialab_prado_mozilla_firefox_os.jpg"
                            />
                        </div>
                    </div>
                ) : (
                    null
                )}
            </Waypoint>
        )
    }
}