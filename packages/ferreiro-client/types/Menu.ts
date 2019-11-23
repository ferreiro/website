import { Page } from "./Page"

export interface MenuItem {
    display: string
    order: number
    path: string
    type: Page
    submenu?: SubmenuItem
}

export interface SubmenuItem {
    // The key should be the type of Page...
    [key: string]: MenuItem
}
