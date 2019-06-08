import React from 'react'
import classNames from 'classnames'
import {Link} from 'react-router-dom'

import {MENU_ITEMS} from '../constants'

const isReactEnabledForPage = (item) => (
    item.id === 'blog'
)

const renderItem = (item, currentPath) => {
    const className = classNames({
        'item': true,
        'item--selected': item.id === currentPath
    })

    if (item.hidden === true) {
        // SKIP: do not add hide items
        return null
    }
    if (item.id === 'home') {
        // SKIP to add home menu
        return null
    }

    // TODO: Remove this once all the migration into react
    // is done.
    if (isReactEnabledForPage(item)) {
        return (
            <Link
                to={item.path}
                className={className}
                key={item.name}
            >
                {item.icon && (
                    <p className={`icon ${item.icon}`} />
                )}
                {item.name && (
                    <p>{item.name}</p>
                )}
            </Link>
        )
    }

    return (
        <a className={className} href={item.path}>
            {item.icon && (
                <p className={`icon ${item.icon}`} />
            )}
            {item.name && (
                <p>{item.name}</p>
            )}
        </a>
    )
}

export const Header = ({
    
}) => {
    const currentPath = 'home'

    // TODO: delete menu, menu__wrapper and container_inner
    return (
        <div className="header menu">
            <div className="menu__wrapper container_inner header__wrapper">
                <a className="logo" href="/">
                    <img src="/images/logo.jpg" className="logo__image" />
                    <div className="logo__text">Jorge Ferreiro</div>
                </a>

                <nav className="menu__nav">
                    {MENU_ITEMS.map((item) => renderItem(item, currentPath))}
                </nav>

                <div className="menu_right">
                    <nav className="menu__options">
                        <p>pene</p>
                    </nav>
                </div>
            </div>
        </div>
    )
}


// header.menu.fixed#menu
//   .menu__wrapper.container_inner
//       a.logo(href="/")
//         img(src="/images/logo.jpg").logo__image
//         .logo__text Jorge Ferreiro
//
//           .menu-socialLinks
//             each item in social || []
//               a.menu-socialLinks__item(id= item.id, href= item.url, target= item.target || '_target')
//                 span.dropdown-icon(class="icon-" + item.icon)
//                 //- span.dropdown-text #{item.name}

//           if admin
//             a.item(href="/admin/")
//               p Admin

         
//           //- a.item.with-icon(href="/newsletter").openNewsletterSubscription
//             p
//               //- i(class="icon ion-android-mail").dropdown-top-icon
//               span Subscribe

//           //-.dropdown.dropdown-social
//             .item.with-icon
//               p
//                 i(class="icon ion-chatbox-working").dropdown-top-icon
//                 //-span Social - Let's connect!
//                 span Social Networks
//                 .dropdown-content#DropdownSocial
//                   .dropdown-wrapper
//                     each item in social || []
//                       a.dropdown-item(id= item.id, href= item.url, target= item.target || '_target')
//                         span.dropdown-icon(class="icon-" + item.icon)
//                         span.dropdown-text #{item.name}

//       .jfmenu__mobileButton#dropdown-mobiles
//         .jfmenu__mobileButton__wrapper
//           // p.jfmenu__mobileButton__text= path
//           .jfmenu__mobileButton__icon
//             span.icon.ion-navicon