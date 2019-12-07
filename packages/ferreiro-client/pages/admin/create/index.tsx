import { useState } from "react"
import { ModuleTypes } from "../../../types/ModulesType"
import { css } from "emotion"

const DEFAULT_MODULE_TYPE = ModuleTypes.text

function ModuleCreator(props: { id: string }) {
    const id = props.id
    const [moduleType, setModuleType] = useState(DEFAULT_MODULE_TYPE)

    return (
        <div>
            <div className={styles.header}>
                <span>Type</span>
                <select>
                    <option value="ad">Ad</option>
                    <option value="text">Text</option>
                </select>
            </div>
            <div className={styles.content}>
                Based on the type... Render certain properties...
            </div>
            <textarea placeholder="Content" />
        </div>
    )
}

export default function AdminCreate() {
    const [order, setOrder] = useState(["123123123"])
    const [modules, setModules] = useState({
        "123123123": {
            type: "text",
            props: {
                value:
                    "I gave my first webinar for Codemotion couple of weeks ago, and I really enjoyed the experience! ⚡️ In this post I'm sharing you what topics I covered as well as the video in case you wanna learn more about PWAs.\r\n\r\n## What are Progressive Web Apps?\r\n\r\nIn the first part of the video I introduced the main features and funcionalities of a PWA. I also shared examples of top companies in the industry using PWAs (like Twitter, Tinder, Startbucks...). These are the topics I covered:\r\n\r\n- Progressive Enhancement.\r\n- The 10 features of PWAs.\r\n- Trusted Web Applications.\r\n- Progressive Web Apps in the industry.\r\n- Why Progressive Web Apps?\r\n\r\n"
            }
        }
    })

    return (
        <div>
            <div>
                <h1>Title</h1>
                <input value="This is my title" />
            </div>
            <div>
                <h1>Summary</h1>
                <input value="This is my Summary" />
            </div>

            <h1>Content</h1>
            <ModuleCreator id="23232" />
        </div>
    )
}

const styles = {
    header: css`
        background: #f4f4f4;
        border: 1px solid #ceccece;
    `,
    content: css``
}
