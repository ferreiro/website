import React, {PureComponent} from 'react'
import classNames from 'classnames'

import {Header} from '../header/Header';
import {Footer} from '../footer/Footer'

import './PageLayout.scss'

export class PageLayout extends PureComponent {
    updatePageTitle = (title) => {
        const defaultTitle = 'Jorge Ferreiro - Frontend Software Engineer at Eventbrite, Entrepreneur and former Amazon';

        document.title = title
            ? `${title} - ${defaultTitle}`
            : defaultTitle
    }

    componentDidUpdate(prevProps) {
        this.updatePageTitle(prevProps.title)
    }

    render() {
        const {
            children,
            currentPath = null,
            showHeader = true,
            isHeaderFix = false,
        } = this.props

        const headerClassName = classNames({
            'page-layout__header': true,
            'page-layout__header--fixed': isHeaderFix === true,
        })
    
        console.log(children)

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

// export const PageLayout = ({
//     currentPath = null,
//     showHeader = true,
//     isHeaderFix = false,
//     children
// }) => {
//     const headerClassName = classNames({
//         'page-layout__header': true,
//         'page-layout__header--fixed': isHeaderFix === true,
//     })

//     class PageLayoutWithContent extends PureComponent {
//         render() {
//             return (
//                 <div className="page-layout">
//                     {showHeader === true && (
//                         <div className={headerClassName}>
//                             <Header
//                                 currentPath={currentPath}
//                             />
//                         </div>
//                     )}

//                     <div className="page-layout__content">
//                         {children}
//                     </div>

//                     <div className="page-layout__footer">
//                         <Footer />
//                     </div>
//                 </div>
//             )
//         }
//     }

//     return <PageLayoutWithContent />
// }