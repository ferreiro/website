import React from 'react'
import {Switch, Route, withRouter} from 'react-router'

function PageHome() {
    return (<div>Welcome to the home!</div>)
}

function PagePost() {
    return <div>This is page post rendered in React!</div>
}
function PageNotFound() {
    return <div>Not found!</div>
}

export function AppWithRouter() {
    return (
        <Switch>
            <Route
                path='/'
                exact
                render={PageHome}
            />
            <Route
                path='/blog/:permalink'
                exact
                render={PagePost}
            />
            <Route
                render={PageNotFound}
            />
        </Switch>
    )
}

export default withRouter(AppWithRouter)