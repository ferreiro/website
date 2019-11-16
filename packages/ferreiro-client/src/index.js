import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import App from './app'

// function Header() {
//     return <div>This is a react notification!</div>
// }

// ReactDOM.hydrate(
//     <Header />,
//     document.getElementById('header')
// )

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
)
