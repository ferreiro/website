import React from 'react'
import {Link} from 'react-router-dom'

import './SidebarMenu.scss'

export const SidebarMenu = ({
    onClick,
    selectedCategory,
    items,
}) => {
    return (
        <ul className="sidebar-menu">
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
    )
}