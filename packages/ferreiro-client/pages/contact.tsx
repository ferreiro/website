import { Layout } from "../components/Layout"
import { sharedStyles, bios } from "../components/config"
import { cx } from "emotion"
import { AdSocialDeveloper, AdVideoCall } from "../components/Ads"

export default function Contact() {
    return (
        <Layout title="Contact me">
            <h1 className={cx(sharedStyles.title)}>Contact me</h1>

            <div className={sharedStyles.marginTop(8)}>
                <div className={sharedStyles.row}>
                    <div className={sharedStyles.col_lg_8}>
                        Add here contact form
                    </div>
                    <div className={sharedStyles.col_lg_4}>
                        <div className={sharedStyles.marginLeft_lg(6)}>
                            <div className={sharedStyles.flex}>
                                <div className={sharedStyles.col_auto}>
                                    <img
                                        width="100px"
                                        className={sharedStyles.circle}
                                        src="/images/about/jorge_ferreiro_software_engineer_entrepreneur.jpg"
                                    />
                                </div>
                                <div className={sharedStyles.col}>
                                    <h3>Jorge Ferreiro</h3>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: bios.small
                                        }}
                                    />
                                </div>
                            </div>

                            <div
                                className={cx(
                                    sharedStyles.separator,
                                    sharedStyles.marginTop(7),
                                    sharedStyles.marginBottom(7)
                                )}
                            />
                            <AdSocialDeveloper />
                            <div
                                className={cx(
                                    sharedStyles.separator,
                                    sharedStyles.marginTop(7),
                                    sharedStyles.marginBottom(7)
                                )}
                            />
                            <AdVideoCall />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
