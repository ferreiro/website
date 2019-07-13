import React from 'react'
import {Link} from 'react-router-dom'

import './SidebarMenu.scss'

export const SidebarMenu = ({
    onClick,
    selectedCategory,
    title = null,
    items,
}) => {
    return (
        <div className="sidebar-menu">
            {title && (
                <h4 className="sidebar-menu__title">
                    {title}
                </h4>
            )}

            <ul className="sidebar-menu__list">
                {items.map(({
                    text,
                    icon,
                    path,
                    category
                }) => {
                    const classNames = category === selectedCategory && 'selected'

                    return (
                        <li key={icon} className={`sidebar-menu__item ${classNames}`}>
                            <Link to={path}>
                                {text}
                            </Link>
                        </li>  
                    )
                })}
            </ul>
        </div>   
    )
}