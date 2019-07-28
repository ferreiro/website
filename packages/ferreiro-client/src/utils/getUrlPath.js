import get from 'lodash/get'

export const getUrlPath = ({
    props,
    path,
    defaultValue
}) => {
    return get(
        props,
        `match.params.${path}`,
        defaultValue,
    )
}
