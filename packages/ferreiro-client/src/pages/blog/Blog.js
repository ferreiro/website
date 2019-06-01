import React, {PureComponent} from 'react'
import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom'

import {BlogHome} from './home/Home'
import {BlogPost} from './post/Post'

const NoMatch = ({ location }) => (
    <div>
      <h3>No match for <code>{location.pathname}</code></h3>
    </div>
  )

export const BlogWithRoutes = () => (
    <Switch>
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
            component={NoMatch}
        />
    </Switch>
)

export const Blog = withRouter(BlogWithRoutes)