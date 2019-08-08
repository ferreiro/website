import './RecentVideos.scss'

import React, {PureComponent} from 'react'
import {Waypoint} from 'react-waypoint'

import {CardRelatedVideo} from '../cardRelatedVideo/CardRelatedVideo'
import {getPageData, PAGE_ENTITIES} from '../../content/english';
import {PATH_VIDEOS} from '../../pages/constants';

const MAX_RECENT_VIDEOS = 3

const videosEntities = getPageData(PATH_VIDEOS)[PAGE_ENTITIES]
const videos = Object.values(videosEntities).slice(0, MAX_RECENT_VIDEOS)

const renderVideos = (videos = []) => (
    videos.map((video) => (
        <div className="recent-videos__item">
            <CardRelatedVideo video={video} />
        </div>
    ))
)

export class RecentVideos extends PureComponent {
    state = {
        isVisible: false,
    }

    onEnter = () => {
        this.setState({isVisible: true})
    }

    renderContent = () => (
        <section>
            {videos.length === 0 && (
                <p>Currently we don't have any other video.</p>
            )}
            
            {videos.length > 0 && (
                <section className="recent-videos">
                    <div className="recent-videos__items">
                        {renderVideos(videos)}
                    </div>
                </section>
            )}
        </section>
    )
    
    render() {
        return (
            <Waypoint
                onEnter={this.onEnter}
            >
                {this.state.isVisible && (
                    this.renderContent()
                )}
            </Waypoint>
        )
    }
}
    