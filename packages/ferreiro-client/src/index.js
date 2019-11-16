import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import App from './app'

function Notification() {
    return <div>This is a react notification!</div>
}

ReactDOM.hydrate(
    <Notification />,
    document.getElementById('notification')
)

ReactDOM.hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
)
