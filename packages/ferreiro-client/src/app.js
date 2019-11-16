import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'

function PageHome() {
    return (<div>Welcome to the home!</div>)
}

export function AppWithRoutes() {
    return (
        <Switch>
            <Route
                path='/'
                exact
                render={PageHome}
            />
        </Switch>
    )
}

export default withRouter(AppWithRoutes)