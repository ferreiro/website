import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';

// https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
class ScrollToTopWrapper extends PureComponent {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}

export const ScrollToTop = withRouter(
    ScrollToTopWrapper
)