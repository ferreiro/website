import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'

import {BlogHome} from './home/Home'
import {BlogPost} from './post/Post'

export const BlogWithRoutes = () => (
    <Switch>
        <Route
            path='/'
            exact
            render={BlogHome}
        />
        <Route
            path='/:permalink'
            render={BlogPost}
        />
    </Switch>
)

export const Blog = withRouter(BlogWithRoutes)