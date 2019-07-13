import queryString from 'query-string'

export const getQueryParam = (properties) => (
    queryString.parse(properties)
)

export const getQueryParamValue = ({key, properties, defaultValue}) => {
    return getQueryParam(properties)[key] || defaultValue
}
