import { useState } from "react"
import { css, cx } from "emotion"
import { FaShareSquare, FaRegBookmark, FaBookmark } from "react-icons/fa"

import { sharedStyles, spacing5 } from "./config"

function SharingDropdown() {
    return (
        <div className={styles.dropdown}>
            <h4>Sharing</h4>
        </div>
    )
}

// TODO: Be able to positionate the dropdown on top of the component
// or below based on the bottom/top/right/left size
export function Sharing() {
    const [isShownBookmark, setIsShownBookmark] = useState(false)
    const [isShownSharing, setIsSharing] = useState(true)

    return (
        <div className={sharedStyles.row}>
            <div className={styles.item}>
                <div
                    onClick={() => setIsShownBookmark(prevState => !prevState)}
                >
                    <FaRegBookmark />
                </div>
                {isShownBookmark && <div>Bookmark</div>}
            </div>

            <div className={cx(styles.item, sharedStyles.marginLeft(5))}>
                <div onClick={() => setIsSharing(prevState => !prevState)}>
                    <FaShareSquare />
                </div>
                {isShownSharing && <SharingDropdown />}
            </div>
        </div>
    )
}

const styles = {
    item: css`
        position: relative;
    `,
    dropdown: css`
        top: 100%;
        position: absolute;
        z-index: 10;
        background: #fff;
        border: 1px solid #cecece;
        padding: ${spacing5};
    `
    // wrapper: css``,
    // wrapper: css``
}
