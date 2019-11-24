import fetch from "isomorphic-unfetch"

export async function postSubscribeApi(query: {
    body: {
        name: string
        email: string
        isSubscribe: boolean
    }
}): Promise<any> {
    return fetch("http://localhost:4000/api/v1/contact/subscribe", {
        method: "POST",
        body: JSON.stringify(query.body),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(r => r.json())
        .then((response: any) => {
            if (response.error) {
                return Promise.reject({
                    error: "Could not add you to the subscribers"
                })
            }

            return response
        })
}

export async function postContactIdeasApi(query: {
    body: {
        message: string
    }
}): Promise<any> {
    return fetch("http://localhost:4000/api/v1/contact/ideas", {
        method: "POST",
        body: JSON.stringify(query.body),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(r => r.json())
        .catch(error => error)
}
