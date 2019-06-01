import React from 'react'
import {Link} from 'react-router-dom'

import './SidebarMenu.scss'

export const SidebarMenu = ({
    onClick,
    selectedPath,
    items,
}) => {
    return (
        <ul className="sidebar-menu">
            {items.map(({
                text,
                icon,
                path
            }) => {
                const classNames = path === selectedPath && 'selected'

                return (
                    <li key={icon} className={`sidebar-menu__item ${classNames}`}>
                        <Link to={path}>
                            {icon}
                            {text}
                        </Link>
                    </li>  
                )
            })}
        </ul>    
    )
}