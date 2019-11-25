import { Layout } from "../components/Layout"
import { cx } from "emotion"
import { sharedStyles } from "../components/config"

function ErrorPage({ statusCode }) {
    return (
        <Layout title="Error 404">
            <h1
                className={cx(sharedStyles.title, sharedStyles.marginBottom(5))}
            >
                Damn! I couldn't find your page 😢
            </h1>

            <img
                alt="Showing a properly cat according the status code"
                width="100%"
                src={`https://http.cat/${statusCode}`}
            />
        </Layout>
    )
}

function getInitialProps({ res, err }) {
    let statusCode
    // If the res variable is defined it means nextjs
    // is in server side
    if (res) {
        statusCode = res.statusCode
    } else if (err) {
        // if there is any error in the app it should
        // return the status code from here
        statusCode = err.statusCode
    } else {
        // Something really bad/weird happen and status code
        // cannot be determined.
        statusCode = null
    }
    return { statusCode }
}

ErrorPage.getInitialProps = getInitialProps

export default ErrorPage
