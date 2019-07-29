export const fetchApi = (url, {
    body,
    onStart,
    onSuccess,
    onError,
    onFinish,
}) => {
    // TODO: Accept options body
    const options = {}
    // const options = body && {
    //     body: JSON.stringify(body)
    // }

    onStart()
    return fetch(url, options)
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