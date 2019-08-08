import React from 'react'
import {StickyContainer, Sticky} from 'react-sticky'
import classnames from 'classnames'

import {OfflineWarning} from '../offlineWarning/OfflineWarning'

import './LayoutWithSidebar.scss'

// TODO: Remove contentHeader... Not needed. We can simply have
// content with all the required data.
export const LayoutWithSidebar = ({
    afterContent,
    beforeContent,
    content,
    contentHeader,
    header,
    isHeaderFullWidth = false,
    panel,
    style,
    wrapperClassName,
}) => (
    <StickyContainer>
        <main
            className={classnames(
                'layout-with-sidebar', {
                    [wrapperClassName]: wrapperClassName,
                })
            }
            style={style}
        >
            <OfflineWarning />

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
        </main>
    </StickyContainer>
)
