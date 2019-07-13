import React, {PureComponent} from 'react'
import classNames from 'classnames'

import {Header} from '../header/Header';
import {Footer} from '../footer/Footer'

import './PageLayout.scss'

export const PageLayout = ({
    currentPath = null,
    showHeader = true,
    isHeaderFix = false,
    children
}) => {
    const headerClassName = classNames({
        'page-layout__header': true,
        'page-layout__header--fixed': isHeaderFix === true,
    })

    class PageLayoutWithContent extends PureComponent {
        render() {
            return (
                <div className="page-layout">
                    {showHeader === true && (
                        <div className={headerClassName}>
                            <Header
                                currentPath={currentPath}
                            />
                        </div>
                    )}

                    <div className="page-layout__content">
                        {children}
                    </div>

                    <div className="page-layout__footer">
                        <Footer />
                    </div>
                </div>
            )
        }
    }

    return <PageLayoutWithContent />
}