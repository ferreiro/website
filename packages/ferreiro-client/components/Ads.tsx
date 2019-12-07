import config, { sharedStyles } from "./config"
import { css, cx } from "emotion"
import { FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa"

export function Ads() {
    return <div>Ads...</div>
}

export function AdSocialDeveloper() {
    const styles = {
        list: css``,
        item: css`
            padding: 1em;
            border: 2px solid #cecece;
        `
    }

    return (
        <div>
            <h2
                className={cx(
                    sharedStyles.subtitle,
                    sharedStyles.marginBottom(6)
                )}
            >
                Show me your social skills!
            </h2>
            <ul
                className={cx(
                    sharedStyles.flex,
                    sharedStyles.justifyContentCenter,
                    sharedStyles.marginHorizontal(0),
                    sharedStyles.paddingHorizontal(0)
                )}
            >
                <li className={sharedStyles.displayInlineFlex}>
                    <a
                        className={cx(
                            styles.item,
                            sharedStyles.marginHorizontal(3),
                            sharedStyles.iconTwitter
                        )}
                        href={config.meta.social.twitter.url}
                        target="_blank"
                        rel="norel nooppener"
                    >
                        <span>
                            <FaTwitter />
                        </span>
                    </a>
                </li>
                <li
                    className={cx(
                        sharedStyles.displayInlineFlex,
                        sharedStyles.marginHorizontal(3),
                        sharedStyles.iconYoutube
                    )}
                >
                    <a
                        className={styles.item}
                        href={config.meta.social.youtube.url}
                        target="_blank"
                        rel="norel nooppener"
                    >
                        <span>
                            <FaYoutube />
                        </span>
                    </a>
                </li>
                <li
                    className={cx(
                        sharedStyles.displayInlineFlex,
                        sharedStyles.marginHorizontal(3),
                        sharedStyles.iconLinkedin
                    )}
                >
                    <a
                        className={styles.item}
                        href={config.meta.social.linkedin.url}
                        target="_blank"
                        rel="norel nooppener"
                    >
                        <span>
                            <FaLinkedin />
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export function AdVideoCall() {
    const styles = {
        wrapper: css`
            background-size: cover;
            background-image: url("jorge_ferreiro_software_engineer_entrepreneur_amazon_eventbrite_developers_in_depth");
        `
    }
    return (
        <img
            width="100px"
            height="123px"
            src="/images/ads/jorge_ferreiro_software_engineer_entrepreneur_amazon_eventbrite_developers_in_depth.jpg"
        />
        // <Link
        //     href={getLinkWithTracking("/videocall", {
        //         utm_source: "ferreiro-blog-videocall-ad"
        //     })}
        // >
        //     <a title="Videocall with Jorge Ferreiro">
        //         <div className={styles.wrapper}>Hola</div>
        //     </a>
        // </Link>
    )
}
