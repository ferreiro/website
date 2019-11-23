import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { css, cx } from "emotion"

import config, {
    spacing4,
    spacing5,
    spacing6,
    navBarLogoHeight,
    breakpoints,
    containterMaxWidths
} from "./config"

import { MenuItem, SubmenuItem } from "../types/Menu"
import { Page } from "../types/Page"

function NavbarLogo() {
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
                        src="/images/logos/logo_jorge_ferreiro_frontend_software_engineer_clear.png"
                        alt="Jorge Ferreiro Frontend Software Engineer and Entrepreneur"
                    />
                </a>
            </Link>
        </div>
    )
}

function NavbarMenu(props: {
    activePathname: string
    items: { [key: string]: MenuItem }
}) {
    const activePathname = props.activePathname
    const items = props.items

    return (
        <div className={styles.menu}>
            {Object.values(items).map((item: MenuItem) => (
                <NavbarMenuItem
                    activePathname={activePathname}
                    item={item}
                    key={item.type}
                />
            ))}
        </div>
    )
}

function NavbarMenuItem(props: { activePathname: string; item: MenuItem }) {
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

function NavbarActions() {
    return <div>Actions.. Follow? Subscribe?.</div>
}

function NavbarMobile() {
    const [isShownMenu, setIsShownMenu] = useState(false)

    return <div>Mobile</div>
}

export function LayoutNavbar() {
    const router = useRouter()
    const menuItems = config.menu

    // TODO: Fetch list of articles in the background?

    return (
        <nav className={styles.wrapper}>
            <div className={styles.container}>
                <NavbarLogo />
                <NavbarMenu
                    activePathname={router.pathname}
                    items={menuItems}
                />
                <NavbarActions />
                <NavbarMobile />
            </div>
        </nav>
    )
}

export const smallUp = `
    @media all and (min-width: ${breakpoints.sm})
`

export const mediumUp = `
    @media all and (min-width: ${breakpoints.md})
`

export const largeUp = `
    @media all and (min-width: ${breakpoints.lg})
`

const styles = {
    wrapper: css`
        background: #fff;
        background: #000;
        border-bottom: 1px solid #f1f1f1;
        padding: 0 ${spacing4};
    `,
    container: css`
        align-items: center;
        display: flex;
        flex-direction: row;
        max-width: ${containterMaxWidths.lg};
        margin: 0 auto;
    `,
    logo: css`
        padding: ${spacing4} 0;
        height: ${navBarLogoHeight};
    `,
    logoImage: css`
        height: ${navBarLogoHeight};
    `,
    menu: css`
        flex: 1 1 auto;
        flex-direction: row;
        margin-left: ${spacing5};
        display: none;

        ${largeUp} {
            display: flex;
        }
    `,
    menuItem: css`
        display: inline-flex;
        margin: 0 ${spacing4};

        a {
            color: ${config.colors.navBar};
            font-size: 18px;
            font-weight: 600;
            opacity: 0.9;
            padding: ${spacing6} 0;
            text-decoration: none;
        }
    `,
    menuItemSelected: css`
        a {
            border-bottom: 2px solid ${config.colors.primary};
            color: ${config.colors.primary};
            font-weight: 600;
            opacity: 1;
        }
    `
}
