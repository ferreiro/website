import { useState } from "react"
import { css, cx } from "emotion"
import {
    FaShareSquare,
    FaRegBookmark,
    FaTwitter,
    FaLinkedin,
    FaFacebook
} from "react-icons/fa"

import config, { sharedStyles, spacing5, spacing2, spacing4 } from "./config"
import {
    getPostQualifiedUrl,
    getTwitterShareableUrl,
    getLinkedinShareableUrl,
    getFacebookShareableUrl,
    getUrlWithTracking
} from "../utils/get-url"

interface ShareButton {
    buttonStyle: string
    Icon: any
    text: string
    mini: boolean
    summary: string
    title: string
    url: string
}

function SharingButton(props: ShareButton) {
    const Icon = props.Icon
    const handleClick = () => {
        window.open(props.url, props.title, "width=550px,height=580px;")
    }

    return (
        <button
            onClick={handleClick}
            className={cx(
                styles.shareButton,
                sharedStyles.row,
                props.buttonStyle
            )}
            title={props.text}
        >
            <span className={cx(styles.shareButtonIcon, sharedStyles.col_auto)}>
                <Icon />
            </span>
            <p className={cx(styles.shareButtonText, sharedStyles.col)}>
                {props.text}
            </p>
        </button>
    )
}

function SharingButtonTwitter(props: ShareButton) {
    const twitterSharingUrl = getTwitterShareableUrl({
        url: props.url,
        title: props.title,
        trackingOptions: {
            utm_source: "sharing-twitter"
        }
    })
    return (
        <SharingButton
            {...props}
            buttonStyle={cx(styles.shareButton, sharedStyles.buttonTwitter)}
            url={twitterSharingUrl}
        />
    )
}

function SharingButtonLinkedin(props: ShareButton) {
    const linkedinSharingUrl = getLinkedinShareableUrl({
        url: props.url,
        title: props.title,
        trackingOptions: {
            utm_source: "sharing-linkedin"
        }
    })

    return (
        <SharingButton
            {...props}
            buttonStyle={cx(styles.shareButton, sharedStyles.buttonLinkedin)}
            url={linkedinSharingUrl}
        />
    )
}

function SharingButtonFacebook(props: ShareButton) {
    const facebookSharingUrl = getFacebookShareableUrl({
        url: props.url,
        title: props.title,
        trackingOptions: {
            utm_source: "sharing-linkedin"
        }
    })

    return (
        <SharingButton
            {...props}
            buttonStyle={cx(styles.shareButton, sharedStyles.buttonFacebook)}
            url={facebookSharingUrl}
        />
    )
}

function SharingPermalink(props: { url: string }) {
    const handleClick = event => event.target.select()

    return (
        <input
            className={styles.sharePermalink}
            type="text"
            value={props.url}
            onClick={handleClick}
        />
    )
}

function SharingDropdown(props: {
    mini: boolean
    permalink: string
    summary: string
    title: string
}) {
    const permalink = props.permalink

    // TODO: Be able to override tracking url utmSource. So we can specify
    // in which part of the app the sharing button was pressed. Another
    // idea is to add an event here.
    return (
        <div className={styles.dropdown}>
            <h4 className={sharedStyles.marginBottom(4)}>Sharing</h4>

            <SharingButtonTwitter
                buttonStyle={sharedStyles.buttonTwitter}
                mini={false}
                summary={props.summary}
                title={props.title}
                Icon={FaTwitter}
                text="Share on Twitter"
                url={getUrlWithTracking(permalink, {
                    utm_source: "sharing-dropdown-twitter"
                })}
            />

            <div className={sharedStyles.marginBottom(4)} />

            <SharingButtonFacebook
                buttonStyle={sharedStyles.buttonFacebook}
                mini={false}
                summary={props.summary}
                title={props.title}
                Icon={FaFacebook}
                text="Post on Facebook"
                url={getUrlWithTracking(permalink, {
                    utm_source: "sharing-dropdown-facebook"
                })}
            />

            <div className={sharedStyles.marginBottom(4)} />

            <SharingButtonLinkedin
                buttonStyle={sharedStyles.buttonLinkedin}
                mini={false}
                summary={props.summary}
                title={props.title}
                Icon={FaLinkedin}
                text="Post on Linkedin"
                url={getUrlWithTracking(permalink, {
                    utm_source: "sharing-dropdown-linkedin"
                })}
            />

            <h4
                className={cx(
                    sharedStyles.marginTop(5),
                    sharedStyles.marginBottom(4)
                )}
            >
                Copy link
            </h4>

            <SharingPermalink
                url={getUrlWithTracking(permalink, {
                    utm_source: "sharing-dropdown-permalink"
                })}
            />
        </div>
    )
}

// TODO: Be able to positionate the dropdown on top of the component
// or below based on the bottom/top/right/left size
export function Sharing(props: {
    mini: boolean
    permalink: string
    summary: string
    title: string
}) {
    const [isShownBookmark, setIsShownBookmark] = useState(false)
    const [isShownSharing, setIsSharing] = useState(false)

    return (
        <div className={sharedStyles.row}>
            <div className={styles.item}>
                <div
                    className={styles.itemIcon}
                    onClick={() => setIsShownBookmark(prevState => !prevState)}
                >
                    <FaRegBookmark />
                </div>
                {isShownBookmark && <div>Bookmark</div>}
            </div>

            <div className={cx(styles.item, sharedStyles.marginLeft(5))}>
                <div
                    className={styles.itemIcon}
                    onClick={() => setIsSharing(prevState => !prevState)}
                >
                    <FaShareSquare />
                </div>
                {isShownSharing && <SharingDropdown {...props} />}
            </div>
        </div>
    )
}

const styles = {
    item: css`
        position: relative;
    `,
    itemIcon: css`
        cursor: pointer;
        opacity: 0.6;
        &:hover {
            opacity: 1;
        }
    `,
    dropdown: css`
        max-width: 190px;
        top: 100%;
        position: absolute;
        z-index: 10;
        background: #fff;
        border: 1px solid #cecece;
        padding: ${spacing5};
    `,
    shareButton: css`
        align-items: center;
        cursor: pointer;
        display: flex;
        background: #f4f4f4;
        border-radius: 3px;
        border: 0;
        min-width: 100%;
        padding: ${spacing4} ${spacing4};
    `,
    shareButtonTwitter: css`
        background: ${config.colors.twitter.normal};

        &:hover {
            background: ${config.colors.twitter.active};
        }
    `,
    shareButtonIcon: css`
        color: #fff;
    `,
    shareButtonText: css`
        color: #fff;
        font-size: 14px;
        font-weight: 600;
    `,
    sharePermalink: css`
        overflow: hidden;
        white-space: nowrap;
        padding: ${spacing2};
        border: 2px solid ${config.colors.separator};
    `
}
