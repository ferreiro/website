import React from 'react'
import {getTalksMetrics} from './get-talks-metrics'

import './TalksMetrics.scss'
import { translate } from '../../i18-me/i18-me';

export const TalksMetrics = () => {
    const {
        countries,
        cities,
        talksCount,
    } = getTalksMetrics()

    return (
        <ul className="talks-metrics">
            <li className="talks-metrics__item">
                <span className="talks-metrics__number">
                    {countries.length}
                </span>
                <span className="talks-metrics__text">
                    {translate('Countries')}
                </span>
            </li>
            <li className="talks-metrics__item">
                <span className="talks-metrics__number">
                    {talksCount}
                </span>
                <span className="talks-metrics__text">
                    {translate('Talks')}
                </span>
            </li>
            <li className="talks-metrics__item">
                <span className="talks-metrics__number">
                    {cities.length}
                </span>
                <span className="talks-metrics__text">
                    {translate('Cities')}
                </span>
            </li>
        </ul>
    )
}