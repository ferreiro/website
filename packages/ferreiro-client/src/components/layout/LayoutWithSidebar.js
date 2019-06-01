import React, {PureComponent} from 'react'

import './LayoutWithSidebar.scss'

export const LayoutWithSidebar = ({
    header,
    isHeaderFullWidth,
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
                        <div className="layout-with-sidebar__sidebar">
                            {panel}
                        </div>
                        <div className="layout-with-sidebar__content">
                            {contentHeader}
                            {content}
                        </div>
                    </div>
                </div>
            )
        }
    }

    return <LayoutWithSidebar />
}