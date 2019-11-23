import { css } from "emotion"
import { breakpoints } from "./config"

export function LayoutContainer(props: { children: object }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>{props.children}</div>
        </div>
    )
}

const styles = {
    wrapper: css`
        height: 100vh;
    `,
    container: css`
        margin: 0 auto;
        max-width: ${breakpoints.large};
    `
}
