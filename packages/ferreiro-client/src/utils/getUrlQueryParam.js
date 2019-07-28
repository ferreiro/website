import queryString from 'query-string'

export const getUrlQueryParam = (properties) => (
    queryString.parse(properties)
)

export const getUrlQueryParamValue = ({key, properties, defaultValue}) => {
    return getQueryParam(properties)[key] || defaultValue
}
