import React, {PureComponent} from 'react'
import {StickyContainer, Sticky} from 'react-sticky';

import './LayoutWithSidebar.scss'

// TODO: Remove contentHeader... Not needed. We can simply have
// content with all the required data.
export const LayoutWithSidebar = ({
    header,
    isHeaderFullWidth,
    afterContent,
    beforeContent,
    panel,
    content,
    contentHeader,
}) => (
    <StickyContainer>
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
                        <Sticky>
                            {({style}) => (
                                <div style={{...style, ...{height: '100%', overflowY: 'scroll'}}}>
                                    {panel}
                                </div>
                            )}
                        </Sticky>
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
    </StickyContainer>
)
