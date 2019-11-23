import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { css, cx } from "emotion"

import config from "./config"

import { MenuItem, SubmenuItem } from "../types/Menu"
import { Page } from "../types/Page"

function HeaderLogo() {
    return (
        <div
            itemScope
            itemType="https://schema.org/author"
            className={styles.logo}
        >
            <Link href="/">
                <a title="Jorge Ferreiro Frontend Software Engineer and Entrepreneur">
                    <img
                        src="/images/logo_jorge_ferreiro_frontend_software_engineer.png"
                        alt="Jorge Ferreiro Frontend Software Engineer and Entrepreneur"
                    />
                </a>
            </Link>
        </div>
    )
}

function HeaderMenu(props: {
    activePathname: string
    items: { [key: string]: MenuItem }
}) {
    const activePathname = props.activePathname
    const items = props.items

    return (
        <div>
            {Object.values(items).map((item: MenuItem) => (
                <HeaderMenuItem
                    activePathname={activePathname}
                    item={item}
                    key={item.type}
                />
            ))}
        </div>
    )
}

function HeaderMenuItem(props: { activePathname: string; item: MenuItem }) {
    const [isShownSubmenu, setisShownSubmenu] = useState(false)

    const item = props.item
    const itemClassName = cx(
        props.activePathname === item.path && styles.menuItemSelected
    )

    return (
        <li key={item.type} className={itemClassName}>
            <Link href={item.path}>
                <a title={item.display}>{item.display}</a>
            </Link>
            {isShownSubmenu && (
                <HeaderSubmenu type={item.type} submenu={item.submenu} />
            )}
        </li>
    )
}

function HeaderSubmenu({
    type,
    submenu
}: {
    type: Page
    submenu: SubmenuItem
}) {
    if (type === Page.blog) {
        return <HeaderSubmenuBlog {...this.props} />
    } else if (type === Page.videos) {
        return <HeaderSubmenuVideos {...this.props} />
    }

    return (
        <ul>
            {Object.values(submenu).map((item: MenuItem) => (
                <Link href={item.path}>
                    <li key={item.type}>{item.display}</li>
                </Link>
            ))}
        </ul>
    )
}

// Custom submenu for the blog with latest articles
function HeaderSubmenuBlog() {
    return <div>Amazing submenu with top latest articles. Yay!</div>
}

// Custom submenu for the blog with latest videos
function HeaderSubmenuVideos() {
    return <div>Amazing submenu with top latest videos. Yay!</div>
}

function HeaderActions() {
    return <div>Actions...</div>
}

function HeaderMobile() {
    const [isShownMenu, setIsShownMenu] = useState(false)

    return <div>Mobile</div>
}

export function Header() {
    const router = useRouter()
    const menuItems = config.menu

    // TODO: Fetch list of articles in the background?

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <HeaderLogo />
                <HeaderMenu
                    activePathname={router.pathname}
                    items={menuItems}
                />
                <HeaderActions />
                <HeaderMobile />
            </div>
        </div>
    )
}

const styles = {
    wrapper: css``,
    container: css``,
    logo: css``,
    menu: css``,
    menuItem: css``,
    menuItemSelected: css`
        color: red;
    `
}
