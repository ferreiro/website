import React from 'react'
import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom'

import {BlogHome} from './pages/blog/home/Home'
import {BlogPost} from './pages/blog/post/Post'
import {Portfolio} from './pages/portfolio/Portfolio'
import {VideosHome} from './pages/videos/Home'

const NoMatch = ({ location }) => (
    <div>
      <h3>Page not found <code>{location.pathname}</code></h3>
    </div>
  )

export const AppWithRoutes = () => (
    <Switch>
        <Route
            path='/portfolio'
            exact
            component={Portfolio}
        />
        <Route
            path='/blog'
            exact
            component={BlogHome}
        />
        <Route
            path='/blog/category/:category'
            exact
            component={BlogHome}
        />
        <Route
            path='/blog/:permalink'
            exact
            component={BlogPost}
        />
        <Route
            path='/videos'
            exact
            component={VideosHome}
        />
        <Route
            component={NoMatch}
        />
    </Switch>
)

export const App = withRouter(AppWithRoutes)