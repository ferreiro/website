import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import App from './app'
import {renderToString} from 'react-router-server'

export function render(props) {
    return renderToString(<App {...props} />)
}
