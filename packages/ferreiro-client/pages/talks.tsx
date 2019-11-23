import { cx } from "emotion"

import { Layout } from "../components/Layout"
import { Tabs } from "../components/Tabs"
import { sharedStyles } from "../components/config"

export default function Talks() {
    const tabs = [
        {
            as: "/talks/",
            display: "All",
            path: "/blog",
            type: "Page.blog"
        },
        {
            as: "/talks/category/[id]",
            display: "2019",
            path: "/talks/category/career",
            type: "Page.blog"
        },
        {
            as: "/talks/category/[id]",
            display: "2018",
            path: "/talks/category/software",
            type: "Page.blog"
        }
    ]

    return (
        <Layout title="Talks and conferences by">
            <h1
                className={cx(sharedStyles.title, sharedStyles.marginBottom(5))}
            >
                Talks &amp; conferences
            </h1>

            <Tabs activePath="/blog" tabs={tabs} />

            <div className={sharedStyles.marginTop(8)}>
                <div className={sharedStyles.row}>
                    <div
                        className={sharedStyles.col_3}
                        style={{ backgroundColor: "red" }}
                    >
                        Super videos completo!
                    </div>
                    <div className={sharedStyles.col_auto}>2/2</div>
                </div>
            </div>
        </Layout>
    )
}
