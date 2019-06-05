import React, {PureComponent} from 'react'

import {Footer} from '../footer/Footer'

import './LayoutWithSidebar.scss'

export const LayoutWithSidebar = ({
    header,
    isHeaderFullWidth,
    afterContent,
    beforeContent,
    panel,
    content,
    contentHeader,
}) => {
    class LayoutWithSidebar extends PureComponent {
        render() {
            return (
                <div className="layout-with-sidebar">
                    {isHeaderFullWidth === true ? (
                        header
                    ) : (
                        <div className="layout-with-sidebar__wrapper">
                            {header}
                        </div>
                    )}

                    <div className="layout-with-sidebar__wrapper">
                        {panel && (
                            <div className="layout-with-sidebar__sidebar">
                                {panel}
                            </div>
                        )}
                        <div className="layout-with-sidebar__content">
                            {beforeContent}

                            <div className="layout-with-sidebar__content-wrapper">
                                {contentHeader}
                                {content}
                            </div>

                            {afterContent}
                        </div>
                    </div>
                </div>
            )
        }
    }

    return <LayoutWithSidebar />
}