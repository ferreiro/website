import React, {PureComponent} from 'react'
import {Waypoint} from 'react-waypoint'
import classnames from 'classnames'

import './JorgeIntersection.scss'


export class JorgeIntersection extends PureComponent {
    state = {
        isRotating: false,
    }

    onEnter = () => {
        this.setState({isRotating: true})
    }

    onLeave = () => {
        this.setState({isRotating: false})
    }

    render() {
        const backgroundCLassName = classnames(
            'jorge-intersection__background',
            {'jorge-intersection__background--rotating': this.state.isRotating === true}
        )

        return (
            <Waypoint
                onEnter={this.onEnter}
                onLeave={this.onLeave}
            >
                <div className="jorge-intersection">
                    <img
                        className="jorge-intersection__avatar"
                        src="/images/about/jorge_ferreiro_frontend_software_engineer_blogger_entrepreneur_public_speaker_and_host_of_developers_in_depth_youtube_show.jpg"
                    />

                    <img
                        className={backgroundCLassName}
                        alt="Jorge ferreiro intersection software engineering design business marketing"
                        src="/images/about/Jorge_ferreiro_intersection_software_engineering_design_business_marketing.png"
                    />
                </div>
            </Waypoint>
        )
    }
}