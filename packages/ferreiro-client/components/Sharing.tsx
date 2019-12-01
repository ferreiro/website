import { useState } from "react"
import { css, cx } from "emotion"
import Link from "next/link"
import {
    FaShareSquare,
    FaRegBookmark,
    FaTwitter,
    FaLinkedin
} from "react-icons/fa"

import config, {
    sharedStyles,
    spacing5,
    spacing2,
    spacing3,
    spacing4
} from "./config"
import { createShareablePostUrl } from "../utils/get-url"
import { addTrackingUrl } from "../utils/analytics"
import {
    getLinkedinShareableUrl,
    getTwitterShareableUrl
} from "../utils/get-social-url"

interface ShareButton {
    buttonStyle: string
    Icon: any
    text: string
    mini: string
    summary: string
    title: string
    url: string
}

function SharingButton(props: ShareButton) {
    const Icon = props.Icon
    const handleClick = event => {
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
    const twitterSharingUrl = getTwitterShareableUrl(props)
    return (
        <SharingButton
            {...props}
            buttonStyle={styles.shareButtonTwitter}
            url={twitterSharingUrl}
        />
    )
}

function SharingButtonLinkedin(props: ShareButton) {
    const linkedinSharingUrl = getLinkedinShareableUrl(props)
    return (
        <SharingButton
            {...props}
            buttonStyle={styles.shareButtonLinkedin}
            url={linkedinSharingUrl}
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
    mini: string
    permalink: string
    summary: string
    title: string
}) {
    return (
        <div className={styles.dropdown}>
            <h4 className={sharedStyles.marginBottom(4)}>Sharing</h4>

            <SharingButtonTwitter
                buttonStyle={styles.shareButtonTwitter}
                mini={props.mini}
                summary={props.summary}
                title={props.title}
                Icon={FaTwitter}
                text="Share on Twitter"
                url={addTrackingUrl(createShareablePostUrl(props.permalink), {
                    utmSource: "sharing-dropdown-twitter"
                })}
            />

            <div className={sharedStyles.marginBottom(4)} />

            <SharingButtonLinkedin
                buttonStyle={styles.shareButtonLinkedin}
                mini={props.mini}
                summary={props.summary}
                title={props.title}
                Icon={FaLinkedin}
                text="Post on Linkedin"
                url={addTrackingUrl(createShareablePostUrl(props.permalink), {
                    utmSource: "sharing-dropdown-linkedin"
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
                url={addTrackingUrl(createShareablePostUrl(props.permalink), {
                    utmSource: "sharing-dropdown-permalink"
                })}
            />
        </div>
    )
}

// TODO: Be able to positionate the dropdown on top of the component
// or below based on the bottom/top/right/left size
export function Sharing(props: {
    mini: string
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
        background: #00acee;

        &:hover {
            background: #009cd8;
        }
    `,
    shareButtonLinkedin: css`
        background: #2867b2;

        &:hover {
            background: #1d5190;
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
