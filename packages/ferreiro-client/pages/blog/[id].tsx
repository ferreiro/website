import React from "react"
import Head from "next/head"
import isEmpty from "lodash/isEmpty"
import { cx, css } from "emotion"
import ReactMarkdown from "react-markdown"

import { Layout, LayoutFullwidth } from "../../components/Layout"
import config, {
    sharedStyles,
    spacing6,
    largeUp,
    spacing7,
    spacing4,
    spacing5
} from "../../components/config"

import { Post } from "../../types/Post"
import { formatUrl } from "url-lib"
import Link from "next/link"
import moment from "moment"
import { getLinkWithTracking } from "../../utils/get-url"
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa"

// https://www.creativebloq.com/how-to/build-an-seo-friendly-head-component-for-nextjsreact
// TODO: Copy this from the current .pug
function PostMeta(props: {
    // post
    description?: string
}) {
    const description = props.description || "TODO: Put default description"

    return (
        <Head>
            <title>Post!!!</title>
            <meta name="description" content="" />

            <meta property="og:title" content="" name="og:title" />
            <meta property="og:description" content="" name="og:description" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="" />
            <meta property="og:url" content="" />
            <meta property="og:image" content="" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="" />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:site" content="" />
            <meta name="twitter:creator" content="" />
            <meta name="twitter:image" content="" />

            <link
                rel="icon"
                type="image/png"
                href="/static/images/favicon.ico"
            />
            <link rel="apple-touch-icon" href="/static/images/favicon.ico" />
            <link rel="stylesheet" href="" />
        </Head>
    )
}

function PostHeader(props: { post: Post }) {
    const headerStyles = {
        summary: css`
            font-size: ${spacing5};
            line-height: ${spacing6};
            font-weight: 400;
        `
    }

    return (
        <div className={cx(sharedStyles.paddingHorizontal(6))}>
            <div className={styles.containerWrapper}>
                <h1
                    className={cx(
                        sharedStyles.title,
                        sharedStyles.center,
                        sharedStyles.marginBottom(7)
                    )}
                >
                    {props.post.title}
                </h1>

                <PostAuthor
                    avatarUrl="/images/about/jorge_ferreiro_software_engineer_entrepreneur.jpg"
                    name="Jorge Ferreiro"
                    createdAt={props.post.createdAt}
                    twitterHandle="@jgferreiro"
                />
            </div>

            <div className={styles.containerWrapper_lg}>
                <img
                    alt={props.post.title}
                    className={sharedStyles.marginTop(6)}
                    src={props.post.pic}
                    width="100%"
                />
            </div>

            <div className={styles.containerWrapper}>
                <h2
                    className={cx(
                        headerStyles.summary,
                        sharedStyles.marginTop(6),
                        sharedStyles.marginBottom(6)
                    )}
                >
                    {props.post.summary}
                </h2>
            </div>
        </div>
    )
}

function PostAuthor(props: {
    avatarUrl: string
    name: string
    createdAt: string
    twitterHandle: string
}) {
    const authorStyles = {
        avatar: css`
            width: 48px;
            height: 48px;
            border-radius: 100%;
            object-fit: cover;
        `
    }

    return (
        <div className={styles.containerWrapper}>
            <div
                className={cx(sharedStyles.row, sharedStyles.alignItemsCenter)}
            >
                <div
                    className={cx(
                        sharedStyles.col_auto,
                        sharedStyles.marginRight(5)
                    )}
                >
                    <img
                        alt="Jorge Ferreiro Software Engineer"
                        className={authorStyles.avatar}
                        src={props.avatarUrl}
                    />
                </div>

                <div className={sharedStyles.col}>
                    <p>
                        <strong>{props.name}</strong> (
                        <a
                            href={getLinkWithTracking(
                                config.meta.social.twitter.url,
                                {
                                    utm_source: "ferreiro-post-author"
                                }
                            )}
                            target="_blank"
                        >
                            {props.twitterHandle}
                        </a>
                        )
                    </p>
                    <p className={sharedStyles.marginTop(2)}>
                        Published {moment(props.createdAt).fromNow()}
                    </p>
                </div>

                <div className={sharedStyles.col_auto}>
                    <button className={sharedStyles.buttonNoFill}>
                        <FaTwitter />
                    </button>
                    <button className={sharedStyles.buttonNoFill}>
                        <FaLinkedin />
                    </button>
                    <button className={sharedStyles.buttonNoFill}>
                        <FaFacebook />
                    </button>
                </div>

                <div
                    className={cx(
                        sharedStyles.col_auto,
                        sharedStyles.marginLeft(3)
                    )}
                >
                    <button className={sharedStyles.button}>Subscribe</button>
                </div>
            </div>
        </div>
    )
}

// { value: string }
function PostQuote(props: { config: any }) {
    return (
        <div className={styles.containerWrapper}>
            <mark>{props.config.value}</mark>
            {props.config.author && <p>{props.config.author}</p>}
        </div>
    )
}

function PostText(props: { config: any }) {
    return (
        <div
            className={cx(
                styles.containerWrapper,
                sharedStyles.paddingVertical_lg(5)
            )}
        >
            <ReactMarkdown source={props.config.value} />
        </div>
    )
}

function PostImage(props: { config: any }) {
    if (props.config.layout === "full") {
        return (
            <img src={props.config.url} width="100%" alt={props.config.alt} />
        )
    } else if (props.config.layout === "center") {
        return (
            <div className={styles.containerWrapper}>
                <img
                    alt={props.config.alt}
                    src={props.config.url}
                    width="100%"
                />
            </div>
        )
    }

    return (
        <div className={styles.containerWrapper}>
            {JSON.stringify(props)}
            <img src={props.config.url} alt={props.config.alt} />
        </div>
    )
}

function PostVideo(props: { config: any }) {
    const autoPlay = props.config.autoPlay
    const src = autoPlay
        ? formatUrl(props.config.src, { autoplay: 1 })
        : props.config.src

    if (props.config.layout === "full") {
        return (
            <iframe
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                className={sharedStyles.marginVertical(5)}
                width="100%"
                height="400px"
                src={src}
            />
        )
    } else if (props.config.layout === "center") {
        return (
            <div className={styles.containerWrapper}>
                <iframe
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={true}
                    className={sharedStyles.marginVertical(5)}
                    width="100%"
                    height="400px"
                    src={src}
                />
            </div>
        )
    }

    return (
        <div className={styles.containerWrapper}>
            <iframe
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                className={sharedStyles.marginVertical(5)}
                width="100%"
                height="400px"
                src={src}
            />
        </div>
    )
}

function PostAd(props: { config: any }) {
    return (
        <div className={styles.containerWrapper}>
            {JSON.stringify(props)}
            <p>Advertisement</p>
        </div>
    )
}

// title: string
// url: string
// type: string
// image: string
function PostLink(props: { config: any }) {
    const linkStyles = {
        image: css`
            object-fit: cover;
            object-position: center;
            height: 120px;
            width: 140px;
        `
    }

    return (
        <div
            className={cx(
                styles.containerWrapper,
                sharedStyles.marginVertical(7)
            )}
        >
            <Link href={props.config.url}>
                <a title={props.config.title}>
                    <div
                        className={cx(
                            sharedStyles.flex,
                            sharedStyles.justifyContentCenter,
                            sharedStyles.shadowSm,
                            sharedStyles.rounded
                        )}
                    >
                        <div
                            className={cx(
                                sharedStyles.displayInlineFlex,
                                sharedStyles.paddingBoth(6)
                            )}
                        >
                            <h4>{props.config.title}</h4>
                        </div>
                        <div
                            className={cx(
                                sharedStyles.displayInlineFlex,
                                sharedStyles.rounded
                            )}
                        >
                            <img
                                className={linkStyles.image}
                                alt={props.config.title}
                                src={props.config.image}
                            />
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}

function PostSeparator(props: { config: any }) {
    const separatorStyles = css`
        font-size: 24px;
        line-height: 1.4;
        margin: ${spacing7} 0;
        display: block;
        border: 0;
        text-align: center;
        overflow: visible;

        &:before {
            content: "...";
            display: inline-block;
            color: rgba(0, 0, 0, 0.68);
            position: relative;
            top: -30px;
            font-weight: 400;
            font-style: normal;
            font-size: 30px;
            letter-spacing: 0.62em;
        }
    `

    return (
        <div className={styles.containerWrapper}>
            <hr className={separatorStyles} />
        </div>
    )
}

function PostProvider(props: { config: Config }) {
    const order = props.config.order
    const modules = props.config.modules

    return (
        <div>
            {order.map(moduleId => {
                const _module: Module = modules[moduleId] as Module

                if (_module.type === ModuleTypes.quote) {
                    return <PostQuote config={_module.props} />
                } else if (_module.type === ModuleTypes.text) {
                    return <PostText config={_module.props} />
                } else if (_module.type === ModuleTypes.image) {
                    return <PostImage config={_module.props} />
                } else if (_module.type === ModuleTypes.ad) {
                    return <PostAd config={_module.props} />
                } else if (_module.type === ModuleTypes.video) {
                    return <PostVideo config={_module.props} />
                } else if (_module.type === ModuleTypes.separator) {
                    return <PostSeparator config={_module.props} />
                } else if (_module.type === ModuleTypes.link) {
                    return <PostLink config={_module.props} />
                }

                return (
                    <div key={moduleId}>
                        {JSON.stringify(modules[moduleId])}
                    </div>
                )
            })}
        </div>
    )
}

interface Module {
    type: ModuleTypes
    props: {
        [key: string]: object
    }
}

interface Config {
    order: string[]
    modules: {
        [key: string]: object
    }
}

enum ModuleTypes {
    ad = "ad",
    text = "text",
    quote = "quote",
    image = "image",
    video = "video",
    link = "link",
    separator = "separator"
}

interface Props {
    post?: Post
}

function PostDetail(props: Props) {
    if (!props.post || isEmpty(props.post)) {
        return (
            <Layout title="Videos of">
                <p>Post not found or does not exist</p>
            </Layout>
        )
    }

    // Layout: full,
    const config: Config = {
        order: [
            "123123123",
            "423423733",
            "234234122",
            "984230344",
            "023423432",
            "3545234234",
            "223423432",
            "234234234",
            "333423432",
            "993423432",
            "5435345345",
            "7774543534",
            "345345345"
        ],
        modules: {
            "123123123": {
                type: ModuleTypes.text,
                props: {
                    value:
                        "I gave my first webinar for Codemotion couple of weeks ago, and I really enjoyed the experience! ⚡️ In this post I'm sharing you what topics I covered as well as the video in case you wanna learn more about PWAs.\r\n\r\n## What are Progressive Web Apps?\r\n\r\nIn the first part of the video I introduced the main features and funcionalities of a PWA. I also shared examples of top companies in the industry using PWAs (like Twitter, Tinder, Startbucks...). These are the topics I covered:\r\n\r\n- Progressive Enhancement.\r\n- The 10 features of PWAs.\r\n- Trusted Web Applications.\r\n- Progressive Web Apps in the industry.\r\n- Why Progressive Web Apps?\r\n\r\n"
                }
            },
            "345345345": {
                type: ModuleTypes.video,
                props: {
                    autoPlay: false,
                    src: "https://www.youtube.com/embed/yYjvLUj-Mt8",
                    layout: "full"
                }
            },
            "234234122": {
                type: ModuleTypes.text,
                props: {
                    value:
                        '## Building your first PWAs\r\n\r\nIn the second half of the presentation we did together our first Progressive Web Application. If you are curious, you can download the source code directly in my Github: ["Progressive Web Apps 101"](https://github.com/ferreiro/pwa-101?utm_source=ferreiro-blog)\r\n\r\nI covered the following topics:\r\n\r\n- Progressive metatags\r\n- Manifest.json\r\n- Intro to service workers\r\n- Offline mode with Cache API\r\n- Caching critical assets.\r\n- Fetch image or placeholder\r\n- Other cool APIs (Local notification, Payments API, Web Push Notifications, The App Shell Model, Background Sync, IndexedDB)\r\n\r\n'
                }
            },
            "984230344": {
                type: ModuleTypes.link,
                props: {
                    title:
                        "Codemotion Webinar: Progressive Web Applications (PWAs)",
                    url:
                        "https://speakerdeck.com/ferreiro/codemotion-webinar-progressive-web-applications-pwas-jorge-ferreiro-at-jgferreiro",
                    type: "slides",
                    image:
                        "https://speakerd.s3.amazonaws.com/presentations/34a85b762e62420984a92e0f5d2715cf/slide_0.jpg?13970515"
                }
            },
            "234234234": {
                type: ModuleTypes.image,
                props: {
                    url:
                        "https://ferreirov3.s3.eu-west-2.amazonaws.com/one_year2.jpg",
                    alt: "One year at Eventbrite",
                    layout: "full"
                }
            },
            "3545234234": {
                type: ModuleTypes.image,
                props: {
                    url:
                        "https://ferreirov3.s3.eu-west-2.amazonaws.com/one_year2.jpg",
                    alt: "One year at Eventbrite",
                    layout: "center"
                }
            },
            "023423432": {
                type: "text",
                props: {
                    value:
                        "### Welcome to the post\n\nQue tal?\n\nMuy bien, me mega flipa"
                }
            },
            "333423432": {
                type: "ad",
                props: {
                    adType: "videoconference"
                }
            },
            "223423432": {
                type: "ad",
                props: {
                    adType: "newsletter"
                }
            },
            "8833423432": {
                type: "code",
                props: {
                    language: "javascript",
                    value: "const hola = () => { console.log('Hola'); }"
                }
            },
            "993423432": {
                type: "separator",
                props: {}
            },
            "423423733": {
                type: "video",
                props: {
                    autoPlay: false,
                    src: "https://www.youtube.com/embed/yYjvLUj-Mt8",
                    layout: "center"
                }
            },
            "5435345345": {
                type: "quote",
                props: {
                    value:
                        "Many teams spend two or three minutes to do a startup pitch, rather than showcasing the hack. [...] Focus first on demoing your project.",
                    author: "- Jake Hart from McKinsey"
                }
            },
            "7774543534": {
                type: "series",
                props: {
                    id: "the-definitive-guide-for-college-hackathon",
                    currentPostId:
                        "codemotion-webinar-jorge-ferreiro-progressive-web-apps"
                }
            }
        }
    }

    return (
        <LayoutFullwidth title="Videos of">
            <PostMeta />

            <article>
                <PostHeader post={props.post} />

                <PostProvider config={config} />

                <div style={{ textAlign: "center" }}>
                    Post author
                    <img src="/images/blog/credits.png" />
                </div>
            </article>
        </LayoutFullwidth>
    )
}

PostDetail.getInitialProps = async function(context: any): Promise<Props> {
    const permalink = context.query.id
    const paginatedResponse = await fetch(
        `http://localhost:4000/api/v1/blog/${permalink}`
    )
    const post = await paginatedResponse.json()

    console.log(`Post fetched. Count: ${post.length}`)

    return {
        post
    }
}

export default PostDetail

const styles = {
    containerWrapper: css`
        margin: 0 auto;
        max-width: 600px;
        padding: ${spacing6};

        ${largeUp} {
            padding: 0;
        }
    `,
    containerWrapper_lg: css`
        ${largeUp} {
            margin: 0 auto;
            max-width: 600px;
        }
    `
}
