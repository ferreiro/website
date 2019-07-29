import {
    getPageData,
    PAGE_CONTENT,
    PAGE_TITLE,
    PAGE_SUBTITLE,
    PAGE_ENTITIES,
    TALK_PROPERTY_LOCATION,
    TALK_PROPERTY_CITY,
    TALK_PROPERTY_COUNTRY
} from '../../content/english'
import {PATH_TALKS} from '../constants';

const pageData = getPageData(PATH_TALKS)
const talks = pageData[PAGE_ENTITIES]

export const getTalksMetrics = () => {
    const talksCount = Object.values(talks)
        .filter(({isPrivate}) => isPrivate === false)
        .length
    
    const metricsReducer = (accum, nextKey) => {
        const {
            [TALK_PROPERTY_CITY]: city,
            [TALK_PROPERTY_COUNTRY]: country,
        } = talks[nextKey][TALK_PROPERTY_LOCATION]

        if (!accum['countries'].includes(country)) {
            accum['countries'].push(country)
        }

        if (!accum['cities'].includes(city)) {
            accum['cities'].push(city)
        }

        return accum
    }
    const metrics = Object.keys(talks).reduce(metricsReducer, {
        countries: [],
        cities: []
    })


    console.log(talksCount)

    return {
        ...metrics,
        talksCount,
    }
}