import { cx } from "emotion"

import { Layout } from "../components/Layout"
import { Tabs } from "../components/Tabs"
import { sharedStyles } from "../components/config"

export default function Videos() {
    const tabs = [
        {
            as: "/videos",
            display: "All",
            path: "/videos",
            type: "Page.blog"
        },
        {
            as: "/videos/category/[id]",
            display: "Developers In Depth",
            path: "/videos/category/developersindepth",
            type: "Page.blog"
        },
        {
            as: "/videos/category/[id]",
            display: "Talks",
            path: "/videos/category/talks",
            type: "Page.blog"
        }
    ]

    return (
        <Layout title="Videos of">
            <h1
                className={cx(sharedStyles.title, sharedStyles.marginBottom(5))}
            >
                Videos
            </h1>

            <Tabs activePath="/videos" tabs={tabs} />

            <div className={sharedStyles.marginTop(8)}>
                <div className={sharedStyles.row}>
                    <div
                        className={sharedStyles.col_3}
                        style={{ backgroundColor: "red" }}
                    >
                        Super videos completo!
                    </div>
                    <div className={sharedStyles.col_3}>2/2</div>
                    <div className={sharedStyles.col_3}>2/2</div>
                    <div className={sharedStyles.col_3}>2/2</div>
                </div>
            </div>
        </Layout>
    )
}
