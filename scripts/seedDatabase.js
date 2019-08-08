// TODO: Make a script that fetches data from the Public API
// of Ferreiro, and updates the local database

const debug = require('debug')('ferreiro:setup:database')

// TODO: Update with the new API endpoint once production
// gets the new rollouts.
const prodPostsApiUrl = ''

fetch(prodPostsApiUrl)
    .then((response) => response.json())
    .then((responseJSON) => {
        console.log('responseJSON')
        console.log(responseJSON)
    })
    .catch((error) => debug(error))

