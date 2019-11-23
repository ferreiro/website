import { cx } from "emotion"

import { Layout } from "../../../components/Layout"
import { Tabs } from "../../../components/Tabs"
import { sharedStyles } from "../../../components/config"

export default function Blog() {
    return (
        <Layout title="Blog">
            <h1
                className={cx(sharedStyles.title, sharedStyles.marginBottom(5))}
            >
                Category...
            </h1>
        </Layout>
    )
}
