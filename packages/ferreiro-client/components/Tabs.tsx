import { css, cx } from "emotion"
import Link from "next/link"

import { Tab } from "../types/Tab"
import config, { spacing4, spacing5 } from "./config"

function TabItem(props: { activePath: string; tab: Tab }) {
    const isActiveItem = props.activePath === props.tab.as
    const className = cx(styles.item, isActiveItem && styles.itemActive)

    console.group("TabItem")
    console.log("props.tab", props.tab)
    console.log("props.activePath", props.activePath)
    console.log("props.tab.path", props.tab.path)
    console.log("isActiveItem", isActiveItem)
    console.groupEnd()

    return (
        <div className={className}>
            <Link href={props.tab.path} as={props.tab.as}>
                <div className={styles.itemContent}>
                    <a>{props.tab.display}</a>
                    {isActiveItem && <span className={styles.itemActiveLine} />}
                </div>
            </Link>
        </div>
    )
}

export function Tabs(props: { activePath: string; tabs: Tab[] }) {
    return (
        <div className={styles.wrapper}>
            {props.tabs.map((tab: Tab) => (
                <TabItem
                    key={tab.display}
                    activePath={props.activePath}
                    tab={tab}
                />
            ))}
        </div>
    )
}

const styles = {
    wrapper: css`
        display: flex;
    `,
    item: css`
        cursor: pointer;
        margin-right: ${spacing5};
    `,
    itemContent: css`
        color: #000;
        display: flex;
        flex-direction: column;
        font-size: 20px;

        a {
            font-weight: 600;
            text-decoration: none;
        }
    `,
    itemActive: css`
        a {
            color: ${config.colors.primary};
        }
    `,
    itemActiveLine: css`
        border-radius: 10px;
        display: flex;
        width: 100%;
        height: 3px;
        background: ${config.colors.primary};
        margin-top: ${spacing4};
    `
}
