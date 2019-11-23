import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { css, cx } from "emotion"

import config, {
    spacing3,
    spacing4,
    spacing5,
    headerLogoHeight,
    breakpoints
} from "./config"

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
                        className={styles.logoImage}
                        src="/images/logos/logo_jorge_ferreiro_frontend_software_engineer.png"
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
        <div className={styles.menu}>
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
        styles.menuItem,
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

function HeaderSubmenu(props: { type: Page; submenu: SubmenuItem }) {
    const { type, submenu } = props

    // NB: Allowing having specific submenus per
    // page type.
    if (type === Page.blog) {
        return <HeaderSubmenuBlog />
    } else if (type === Page.videos) {
        return <HeaderSubmenuVideos />
    } else if (!submenu) {
        return null
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

export function LayoutHeader() {
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

export const largeUp = `
    @media all and (min-width: ${breakpoints.large})
`

const styles = {
    wrapper: css`
        background: #fff;
        border-bottom: 1px solid #f1f1f1;
        padding: 0 ${spacing3};
    `,
    container: css`
        align-items: center;
        display: flex;
        flex-direction: row;
        max-width: ${breakpoints.large};
        margin: 0 auto;
    `,
    logo: css`
        padding: ${spacing3} 0;
        height: ${headerLogoHeight};
    `,
    logoImage: css`
        height: ${headerLogoHeight};
    `,
    menu: css`
        flex: 1 1 auto;
        flex-direction: row;
        margin-left: ${spacing4};
        display: none;

        ${largeUp} {
            display: flex;
        }
    `,
    menuItem: css`
        display: inline-flex;
        margin: 0 ${spacing3};

        a {
            color: ${config.colors.secondary};
            font-size: 22px;
            opacity: 0.7;
            padding: ${spacing5} 0;
            text-decoration: none;
        }
    `,
    menuItemSelected: css`
        a {
            font-weight: 600;
            border-bottom: 2px solid ${config.colors.primary};
        }
    `
}
