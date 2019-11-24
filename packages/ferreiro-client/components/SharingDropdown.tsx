import { useState } from "react"
import { FaEllipsisH } from "react-icons/fa"

export function SharingDropdown() {
    const [isShown, setIsShown] = useState(false)

    return (
        <div>
            <div onClick={() => setIsShown(true)}>
                <FaEllipsisH />
            </div>
            {isShown && <div>Dropdown</div>}
        </div>
    )
}
