import React, {PureComponent} from 'react'
import classNames from 'classnames'
import {Link} from 'react-router-dom'

import {
    MENU_ITEMS,
    MOBILE_MENU_ITEMS,
    SOCIAL_NETWORKS,
} from '../constants'

import './Header.scss';

const isReactEnabledForPage = (item) => (
    item.id === 'about'
        || item.id === 'blog'
        || item.id === 'portfolio'
        || item.id === 'videos'
        || item.id === 'talks'
        || item.id === 'contact'
)

const renderMenuItemMobile = (item, currentPath = '', itemClassName, selectedItemClassName) => {
    const onClick = () => {
        console.log('removing className')
        document.body.classList.remove('mobile-header-is-showing');
    }
    const className = classNames({
        [itemClassName]: true,
        [selectedItemClassName]: currentPath.includes(item.id)
    })

    if (item.hidden === true) {
        // SKIP: do not add hide items
        return null
    }

    // TODO: Remove this once all the migration into react
    // is done.
    if (isReactEnabledForPage(item)) {
        return (
            <Link
                to={item.path}
                className={className}
                key={item.text}
                onClick={onClick}
            >
                {item.icon && (
                    <p className={`icon ${item.icon}`} />
                )}
                {item.text && (
                    <p>{item.text}</p>
                )}
            </Link>
        )
    }

    return (
        <a
            onClick={onClick}
            className={className}
            href={item.path}
            key={item.path}
        >
            {item.icon && (
                <p className={`icon ${item.icon}`} />
            )}
            {item.text && (
                <p>{item.text}</p>
            )}
        </a>
    )
}

const renderMenuItem = ({
    currentPath = '',
    isShownAboutDropdown,
    item,
    itemClassName,
    selectedItemClassName,
    toggleAboutDropdownMenu
}) => {
    const onClick = () => {
        console.log('removing className')
        document.body.classList.remove('mobile-header-is-showing');
    }
    const className = classNames({
        [itemClassName]: true,
        [selectedItemClassName]: currentPath.includes(item.id)
    })

    if (item.hidden === true) {
        // SKIP: do not add hide items
        return null
    }

    // TODO: Remove this once all the migration into react
    // is done.
    if (isReactEnabledForPage(item)) {
        const {submenu = null} = item
        const renderItem = ({
            item,
            className,
            selectedClass,
            onClick,
            extraContent
        }) => {
            const {path, text, icon} = item

            return (
                <Link
                    to={path}
                    className={classNames({
                        [className]: true,
                        [selectedClass]: currentPath.includes(item.id)
                    })}
                    key={text}
                    onClick={onClick}
                >
                    {icon && (
                        <p className={`icon ${icon}`} />
                    )}
                    {text && (
                        <p>{text}</p>
                    )}
                    {extraContent}
                </Link>
            )
        }

        if (submenu) {
            return (
                <div
                    className="submenu"
                    onMouseEnter={toggleAboutDropdownMenu}
                    onMouseLeave={toggleAboutDropdownMenu}
                >
                    {renderItem({
                        item,
                        className,
                        extraContent: <span style={{marginLeft: '.5em'}} className="icon icon-circle-down" />,
                    })}

                    {isShownAboutDropdown && (
                        <div className="submenu-dropdown">
                            {submenu.map((item) => renderItem({
                                item,
                                className: 'submenu-dropdown__item',
                                selectedClass: 'submenu-dropdown__item--selected',
                                onClick
                            }))}
                        </div>
                    )}
                </div>
            )
        }

        return renderItem({item, className, onClick})
    }

    return (
        <a
            onClick={onClick}
            className={className}
            href={item.path}
            key={item.path}
        >
            {item.icon && (
                <p className={`icon ${item.icon}`} />
            )}
            {item.text && (
                <p>{item.text}</p>
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
                <span className={item.icon} />
            )}
        </a>
    );
}

export class Header extends PureComponent {
    state = {
        isShown: false,
        isShownAboutDropdown: false,
    }

    toggleAboutDropdownMenu = () => {
        console.log('toggleAboutDropdownMenu')
        this.setState((prevState) => ({
            isShownAboutDropdown: !prevState.isShownAboutDropdown
        }))
    }

    toggleMenu = () => {
        const isShown = this.state.isShown

        // TODO: Set body to not have overflow, and don't 
        // allow scrolling.

        this.setState((prevState, props) => ({
            isShown: !prevState.isShown
        }))

        if (isShown) {
            document.body.classList.remove('mobile-header-is-showing');
        } else {
            document.body.classList.add('mobile-header-is-showing');
        }
    }

    render() {
        const {currentPath} = this.props
        const {
            isShownAboutDropdown
        } = this.state

        // TODO: delete menu, menu__wrapper and container_inner
        return (
            <div className="main-header">
                {this.state.isShown && (
                    <div className="main-header-dropdown">
                        <nav className="main-header-dropdown__links">
                            {MOBILE_MENU_ITEMS.map((item) =>
                                renderMenuItemMobile(item, currentPath, 'main-header-dropdown__item', 'main-header-dropdown__item--selected'))
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
                        {MENU_ITEMS.map((item) => renderMenuItem({
                            item,
                            currentPath,
                            itemClassName: 'main-header__item',
                            selectedItemClassName: 'main-header__item--selected',
                            isShownAboutDropdown,
                            toggleAboutDropdownMenu: this.toggleAboutDropdownMenu,
                        }))}
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
