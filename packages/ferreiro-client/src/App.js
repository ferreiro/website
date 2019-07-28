import React from 'react'
import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom'

import {PageLayout} from './components/layout/PageLayout'

import {Home} from './pages/home/Home'
import {About} from './pages/about/About'
import {AboutResume} from './pages/about/AboutResume'
import {BlogHome} from './pages/blog/home/Home'
import {BlogPost} from './pages/blog/post/Post'
import {Contact} from './pages/contact/Contact'
import {ContactTalk} from './pages/contact/ContactTalk'
import {Portfolio} from './pages/portfolio/Portfolio'
import {VideosHome} from './pages/videos/Home'
import {TalksHome} from './pages/talks/Home'

import './common.scss';

const NoMatch = ({ location }) => (
    <PageLayout
        showHeader={true}
        isHeaderFix={false}
    >
      <h3>Page not found <code>{location.pathname}</code></h3>
    </PageLayout>
)

export const AppWithRoutes = () => (
    <Switch>
        <Route
            path='/'
            exact
            component={Home}
        />
        <Route
            path='/about'
            exact
            component={About}
        />
        <Route
            path='/about/resume'
            exact
            component={AboutResume}
        />
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
            path='/videos/:category'
            exact
            component={VideosHome}
        />
        <Route
            path='/talks'
            exact
            component={TalksHome}
        />
        <Route
            path='/contact'
            exact
            component={Contact}
        />
        <Route
            path='/contact/talk'
            exact
            component={ContactTalk}
        />
        <Route
            component={NoMatch}
        />
    </Switch>
)

export const App = withRouter(AppWithRoutes)