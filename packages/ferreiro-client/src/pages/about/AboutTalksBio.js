import React from 'react'

import {Button} from '../../components/buttons/Button'

import {
    BUTTON_STYLE_LINK,
} from '../../components/constants'

import {translate} from '../../i18-me/i18-me'

export const AboutTalksBio = () => (
    <section className="about-bio about-bio--reversed">
        <div className="about-bio__description spacing-6-right-large">
            <p>
                {translate('I love sharing my knowledge. I am')} <strong>{translate('versatile and easily adapt my knowledge to different audiences')}</strong>. {translate('Here is a list of some topics I love talking about. I am always open to new proposal, ')}
                <Button url="/contact/talk" style={BUTTON_STYLE_LINK} text={translate('contact me')} />
            </p>

            <h4 className="about-bio__title">
                {translate('Technical Talks')}
            </h4>

            <ul className="about-bio__list spacing-4-top">
                <li className="about-bio__item">
                    <span className="icon">⚛️</span>
                    <span>{translate('React, JavaScript and Web apps')}</span>
                </li>
                <li className="about-bio__item">
                    <span className="icon">🎨</span>
                    <span>{translate('HTML5, CSS, SCSS, and UI development')}</span>
                </li>
                <li className="about-bio__item">
                    <span className="icon">🚀️</span>
                    <span>{translate('JavaScript Web Perfomance')}</span>
                </li>
                <li className="about-bio__item">
                    <span className="icon">👉</span>
                    <span>{translate('Progressive Web Apps')}</span>
                </li>
                <li className="about-bio__item">
                    <span className="icon">🔁</span>
                    <span>{translate('Full Stack development')}</span>
                </li>
            </ul>

            <h4 className="about-bio__title spacing-5-top">
                {translate('Career Growth')}
            </h4>

            <ul className="about-bio__list spacing-4-top">
                <li className="about-bio__item">
                    <span className="icon">🎤</span>
                    <span>{translate('Public Speaking for Software Engineers')}</span>
                </li>
                <li className="about-bio__item">
                    <span className="icon">🐙</span>
                    <span>{translate('Github in depth: Learn the tool and have a solid profile')}</span>
                </li>
                <li className="about-bio__item">
                    <span className="icon">💡</span>
                    <span>{translate('Tips and lessons learned to create your Résume and Social profile')}</span>
                </li>
            </ul>

            <h4 className="about-bio__title spacing-5-top">
                {translate('Motivational')}
            </h4>

            <ul className="about-bio__list spacing-4-top">
                <li className="about-bio__item">
                    <span className="icon">👨‍🎤</span>
                    <span>{translate('My story: from college to Amazon and Eventbrite')}</span>
                </li>
                <li className="about-bio__item">
                    <span className="icon">🏭</span>
                    <span>{translate('Getting your first job in Tech')}</span>
                </li>
                <li className="about-bio__item">
                    <span className="icon">💎</span>
                    <span>{translate('The 10 tips for Junior Software Engineers')}</span>
                </li>
            </ul>
        </div>
        <div className="about-bio__pic">
            <img
                width="100%"
                alt="Jorge Ferreiro is a Frontend Software Engineer, entrepreneur, blogger and host of DevelopersInDepth public speaking"
                src="/images/about/jorge_ferreiro_is_a_software_engineer_entrepreneur_public_speaking_collage.png"
            />
        </div>
    </section>
)