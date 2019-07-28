export const fetchApi = (url, {
    onStart,
    onSuccess,
    onError,
    onFinish,
}) => {
    onStart()
    return fetch(url)
        .then((response) => {
            // Handling network errors or other errors.
            // https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
            if (!response.ok) {
                throw Error(response.statusText)
            }

            return response
        })
        .then(res => res.json())
        .then((jsonResponse) => {
            onSuccess(jsonResponse)
        })
        .catch((errorObject) => {
            onError(errorObject)
        })
        .finally(() => {
            onFinish()
        })
}