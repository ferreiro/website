export const fetchApi = (url, {
    body,
    onStart,
    onSuccess,
    onError,
    onFinish,
}) => {
    // TODO: Accept options body
    // NB: Only POST method accept body. So we need a mechanism
    // to check the type of the request.
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
            if (jsonResponse.error) {
                return onError(jsonResponse)
            }
            onSuccess(jsonResponse)
        })
        .catch((errorObject) => {
            console.log('errorObject', errorObject)
            onError(errorObject)
        })
        .finally(() => {
            onFinish()
        })
}