import React, {PureComponent} from 'react'
import classNames from 'classnames'
import {Link} from 'react-router-dom'

import {
    MENU_ITEMS,
    SOCIAL_NETWORKS,
} from '../constants'

import './Header.scss';

const isReactEnabledForPage = (item) => (
    item.id === 'blog' || item.id === 'portfolio'
)

const renderMenuItem = (item, currentPath, itemClassName, selectedItemClassName) => {
    const className = classNames({
        [itemClassName]: true,
        [selectedItemClassName]: item.id === currentPath
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
        <a
            className={className}
            href={item.path}
            key={item.path}
        >
            {item.icon && (
                <p className={`icon ${item.icon}`} />
            )}
            {item.name && (
                <p>{item.name}</p>
            )}
        </a>
    )
}

const renderSocialItem = (item, itemClassName) => {
    const className = classNames({
        [itemClassName]: true
    })

    return (
        <a
            className={className}
            href={item.url}
            rel="noopener noreferrer"
            target="_blank"
            key={item.url}
        >
            {item.icon && (
                <span className={`icon ${item.icon}`} />
            )}
            {item.text && (
                <p>{item.text}</p>
            )}
        </a>
    );
}

export class Header extends PureComponent {
    state = {
        isShown: true,
    }

    toggleMenu = () => {
        // TODO: Set body to not have overflow, and don't 
        // allow scrolling.

        this.setState((prevState, props) => ({
            isShown: !prevState.isShown
        }))
    }

    render() {
        const currentPath = 'blog'

        // TODO: delete menu, menu__wrapper and container_inner
        return (
            <div className="main-header">
                {this.state.isShown && (
                    <div className="main-header-dropdown">
                        <nav className="main-header-dropdown__links">
                            {MENU_ITEMS.map((item) =>
                                renderMenuItem(item, currentPath, 'main-header-dropdown__item', 'main-header-dropdown__item--selected'))
                            }
                        </nav>
                        <div className="main-header-dropdown__social">
                            {SOCIAL_NETWORKS.map((item) =>
                                renderSocialItem(item, 'main-header-dropdown__social-item')
                            )}
                        </div>
                    </div>
                )}

                <div className="main-header-wrapper">
                    <a
                        className="main-header__logo"
                        href="/"
                    >
                        <img src="/images/logo_jorge_ferreiro.png" />
                    </a>
    
                    <nav className="main-header__menu">
                        {MENU_ITEMS.map((item) => renderMenuItem(item, currentPath))}
                    </nav>
    
                    <div className="main-header__social">
                        {SOCIAL_NETWORKS.map((item) => renderSocialItem(item, 'main-header__social-item'))}
                    </div>
                    
                    <div className="main-header__mobile-button">
                        <button
                            onClick={this.toggleMenu}
                        />
                    </div>
                </div>
            </div>
        )
    }
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