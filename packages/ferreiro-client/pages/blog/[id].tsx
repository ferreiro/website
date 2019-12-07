import React from "react"
import Head from "next/head"
import isEmpty from "lodash/isEmpty"
import { cx, css } from "emotion"
import ReactMarkdown from "react-markdown"

import framerPostConfig from "./__fixtures__/framer-post-config.js"

import { Layout, LayoutFullwidth } from "../../components/Layout"
import config, {
    sharedStyles,
    spacing6,
    largeUp,
    spacing7,
    spacing4,
    spacing5,
    mediumUp,
    spacing3
} from "../../components/config"

import { Post, Config, PostLayoutType } from "../../types/Post"
import { formatUrl } from "url-lib"
import Link from "next/link"
import moment from "moment"
import {
    getLinkWithTracking,
    createShareablePostUrl
} from "../../utils/get-url"
import { FaTwitter, FaLinkedin, FaFacebook, FaLink } from "react-icons/fa"
import {
    getTwitterShareableUrl,
    getLinkedinShareableUrl
} from "../../utils/get-social-url"
import { addTrackingUrl } from "../../utils/analytics"
import { FetchSerieResponse, fetchSerieApi } from "../../api/blog"
import { PostModuleTypes } from "../../types/Post"

// https://www.creativebloq.com/how-to/build-an-seo-friendly-head-component-for-nextjsreact
// TODO: Copy this from the current .pug
function PostMeta(props: { post: Post }) {
    const description = props.post.summary
    const title = props.post.title

    return (
        <Head>
            <title>{props.post.title}</title>
            <meta name="description" content={description} />

            <meta property="og:title" content={title} name="og:title" />
            <meta
                property="og:description"
                content={description}
                name="og:description"
            />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="" />
            <meta property="og:url" content="" />
            <meta property="og:image" content="" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
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
            <link
                href="https://fonts.googleapis.com/css?family=Source+Serif+Pro&display=swap"
                rel="stylesheet"
            ></link>
        </Head>
    )
}

function PostHeader(props: { post: Post }) {
    const headerStyles = {
        summary: css`
            font-weight: 400;

            margin: 16px 0 0;
            --x-height-multiplier: 0.363;
            --baseline-multiplier: 0.157;
            font-family: medium-content-sans-serif-font, "Lucida Grande",
                "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif;
            letter-spacing: -0.02em;
            font-weight: 300;
            font-style: normal;
            letter-spacing: 0;
            letter-spacing: -0.022em;
            color: rgba(0, 0, 0, 0.6);
            font-size: ${spacing6};
            line-height: ${spacing7};

            ${largeUp} {
                line-height: ${spacing7};
            }
        `
    }

    return (
        <div className={cx(sharedStyles.paddingHorizontal(6))}>
            <div className={styles.containerWrapper}>
                <h1
                    className={cx(
                        sharedStyles.title,
                        sharedStyles.center,
                        sharedStyles.marginBottom(8)
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

            <figure className={styles.containerWrapper_lg}>
                <img
                    alt={props.post.title}
                    className={sharedStyles.marginTop(8)}
                    src={props.post.pic}
                    width="100%"
                />
            </figure>

            <summary className={styles.containerWrapper}>
                <h2
                    className={cx(
                        headerStyles.summary,
                        sharedStyles.marginTop(6),
                        sharedStyles.marginBottom(6)
                    )}
                >
                    {props.post.summary}
                </h2>
            </summary>
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
                className={cx(
                    sharedStyles.row,
                    sharedStyles.justifyContentCenter
                )}
            >
                <div
                    className={cx(
                        sharedStyles.displayInlineFlex,
                        sharedStyles.marginRight(5)
                    )}
                >
                    <img
                        alt="Jorge Ferreiro Software Engineer"
                        className={authorStyles.avatar}
                        src={props.avatarUrl}
                    />
                </div>

                <div
                    className={cx(
                        sharedStyles.displayInlineFlex,
                        sharedStyles.flex,
                        sharedStyles.flexDirectionColumn
                    )}
                >
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
            </div>
            <div
                className={cx(
                    sharedStyles.row,
                    sharedStyles.flex,
                    sharedStyles.justifyContentCenter,
                    sharedStyles.marginTop(6)
                )}
            >
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

function PostSeries(props: { config: any; series: FetchSerieResponse }) {
    const series = props.series
    return (
        <div>
            Post series...
            {JSON.stringify(props.series, null, 2)}
            {JSON.stringify(props, null, 2)}
        </div>
    )
}

// { value: string }
function PostQuote(props: { config: any; post: Post }) {
    const quoteText = props.config.value
    const quoteStyles = {
        author: css`
            text-align: center;
        `,
        mark: css`
            background-color: transparent !important;
            // background-image: linear-gradient(
            //     to bottom,
            //     rgba(203, 255, 186, 1),
            //     rgba(203, 255, 186, 1)
            // );
            --x-height-multiplier: 0.363;
            --baseline-multiplier: 0.157;
            font-family: Georgia, Cambria, "Times New Roman", Times, serif;
            font-weight: 400;
            font-style: italic;
            font-size: 28px;
            line-height: 1.48;
            letter-spacing: -0.014em;
            color: rgba(0, 0, 0, 0.68);
            border: none;
            padding: 0;
            margin: 24px 0;
            margin-left: 50px;
            text-align: left;
        `,
        socialButton: css`
            background: transparent;
            border: 0;
            cursor: pointer;
            font-size: 32px;
        `
    }

    const handleShareTwitterClick = () => {
        const url = addTrackingUrl(
            createShareablePostUrl(props.post.permalink),
            {
                utmSource: "sharing-quote-twitter"
            }
        )
        const twitterUrl = getTwitterShareableUrl({
            mini: props.post.pic,
            url,
            summary: quoteText,
            title: quoteText
        })

        // TODO: Emit a new google analytics event to track how many clicks
        window.open(twitterUrl, quoteText, "width=550px,height=580px;")
    }

    const handleShareLinkedinClick = () => {
        const url = addTrackingUrl(
            createShareablePostUrl(props.post.permalink),
            {
                utmSource: "sharing-linkedin-twitter"
            }
        )
        const linkedinUrl = getLinkedinShareableUrl({
            mini: props.post.pic,
            url,
            summary: quoteText,
            title: quoteText
        })

        // TODO: Emit a new google analytics event to track how many clicks
        window.open(linkedinUrl, quoteText, "width=550px,height=580px;")
    }

    return (
        <div className={styles.containerWrapper}>
            <mark className={quoteStyles.mark}>{props.config.value}</mark>
            {props.config.author && (
                <p
                    className={cx(
                        quoteStyles.author,
                        sharedStyles.marginTop(3)
                    )}
                >
                    {props.config.author}
                </p>
            )}
            <div
                className={cx(
                    sharedStyles.flex,
                    sharedStyles.justifyContentCenter,
                    sharedStyles.marginTop(5)
                )}
            >
                <button
                    className={cx(
                        sharedStyles.displayInlineFlex,
                        quoteStyles.socialButton,
                        sharedStyles.iconTwitter
                    )}
                    onClick={handleShareTwitterClick}
                >
                    <FaTwitter />
                </button>
                <button
                    className={cx(
                        sharedStyles.displayInlineFlex,
                        quoteStyles.socialButton,
                        sharedStyles.iconLinkedin
                    )}
                    onClick={handleShareLinkedinClick}
                >
                    <FaLinkedin />
                </button>
            </div>
        </div>
    )
}

function PostEmbed(props) {
    return (
        <>
            <blockquote className="twitter-tweet">
                <p lang="en" dir="ltr">
                    Sunsets don&#39;t get much better than this one over{" "}
                    <a href="https://twitter.com/GrandTetonNPS?ref_src=twsrc%5Etfw">
                        @GrandTetonNPS
                    </a>
                    .{" "}
                    <a href="https://twitter.com/hashtag/nature?src=hash&amp;ref_src=twsrc%5Etfw">
                        #nature
                    </a>{" "}
                    <a href="https://twitter.com/hashtag/sunset?src=hash&amp;ref_src=twsrc%5Etfw">
                        #sunset
                    </a>{" "}
                    <a href="http://t.co/YuKy2rcjyU">
                        pic.twitter.com/YuKy2rcjyU
                    </a>
                </p>
                &mdash; US Department of the Interior (@Interior){" "}
                <a href="https://twitter.com/Interior/status/463440424141459456?ref_src=twsrc%5Etfw">
                    May 5, 2014
                </a>
            </blockquote>

            <script
                async
                src="https://platform.twitter.com/widgets.js"
                // charset="utf-8"
            />
        </>
    )
}

function PostText(props: { config: any }) {
    const postStyle = {
        wrapper: css`
            h2 {
                ${sharedStyles.paddingTop(7)}
                ${sharedStyles.paddingBottom(
                    6
                )}
                font-weight: 600;
                font-size: 26px;
                color: rgba(0, 0, 0, 0.9);
            }

            p,
            ul li,
            ol li,
            a {
                font-family: "Source Serif Pro", serif;

                color: rgba(0, 0, 0, 0.8);
                --x-height-multiplier: 0.35;
                --baseline-multiplier: 0.179;
                font-weight: 400;
                font-style: normal;
                font-size: 20px;
                line-height: 1.58;
                letter-spacing: -0.004em;
                word-break: break-word;
                word-wrap: break-word;

                ${largeUp} {
                    font-size: 21px;
                    line-height: 32px;
                    // line-height: 1.58;
                    // letter-spacing: -.003em;
                    letter-spacing: -0.003em;
                    color: rgba(0, 0, 0, 0.84);
                }
            }

            ol,
            ul {
                -webkit-margin-before: 0;
                -webkit-margin-after: 0;
                -webkit-margin-start: 0;
                -webkit-margin-end: 0;
                -webkit-padding-start: 0;
                list-style: decimal;
                list-style-position: inside;
                padding: 0;
                margin: ${spacing4} 0;
                margin-left: ${spacing5};

                ${largeUp} {
                    margin-left: ${spacing7};
                }

                li {
                    margin: 20px 0;
                }
            }

            ul {
                li {
                    list-style: none;
                    position: relative;
                    margin-left: ${spacing5};

                    &:before {
                        left: -1em;
                        content: "•";
                        padding-right: ${spacing3};
                        position: absolute;
                        font-size: 1.3em;
                    }

                    p {
                        display: inline-block;
                        width: calc(100% - 25px);
                        vertical-align: top;
                        margin: 0;
                    }
                }
            }
        `
    }

    return (
        <div
            className={cx(
                postStyle.wrapper,
                styles.containerWrapper,
                sharedStyles.paddingVertical_lg(5)
            )}
        >
            <ReactMarkdown source={props.config.value} />
        </div>
    )
}

//
function PostImage(props: { config: any }) {
    const imageStyles = {
        caption: css`
            text-align: center;
            padding-top: ${spacing5};
        `
    }

    function getImage({
        caption,
        layout,
        src
    }: {
        caption: string
        layout: PostLayoutType
        src: string
    }) {
        if (layout === PostLayoutType.full) {
            return (
                <figure>
                    <img src={src} width="100%" alt={alt} />
                    <figcaption className={imageStyles.caption}>
                        {caption}
                    </figcaption>
                </figure>
            )
        } else if (layout === PostLayoutType.inline) {
            return (
                <figure className={styles.containerWrapper}>
                    <img src={src} width="100%" alt={alt} />
                    <figcaption className={imageStyles.caption}>
                        {caption}
                    </figcaption>
                </figure>
            )
        }

        return (
            <figure className={styles.containerWrapper_more_space_lg}>
                <img src={src} width="100%" alt={alt} />
                <figcaption className={imageStyles.caption}>
                    {caption}
                </figcaption>
            </figure>
        )
    }

    const alt = props.config.alt
    const caption = props.config.caption || alt
    const src = props.config.url
    // This can be nullable...
    const href = props.config.href
    const target = props.config.target

    const layout: PostLayoutType = props.config.layout

    return isEmpty(href) ? (
        getImage({ layout, caption, src })
    ) : (
        <a href={href} target={target || "_blank"}>
            {getImage({ layout, caption, src })}
        </a>
    )
}

function PostVideo(props: { config: any }) {
    const videoStyle = {
        iframe: css`
            width: 100%;
            height: 300px;

            ${mediumUp} {
                height: 400px;
            }

            ${largeUp} {
                height: 450px;
            }
        `,
        caption: css`
            a {
                color: #000;
            }
            text-align: center;
        `
    }

    function getEmbedUrl(id: string, provider: VideoProvider) {
        if (provider === VideoProvider.youtube) {
            return `https://www.youtube.com/embed/${id}`
        }

        return ""
    }

    function getWatchurl(id: string, provider: VideoProvider) {
        if (provider === VideoProvider.youtube) {
            return `https://www.youtube.com/watch/${id}`
        }

        return ""
    }

    const id = props.config.id
    const provider = props.config.provider
    const autoPlay = props.config.isAutoPlay ? 1 : 0

    const srcUrl = formatUrl(getEmbedUrl(id, provider), { autoPlay })
    const watchUrl = getWatchurl(id, provider)

    // NB: It could be full, center, etc
    const layout = props.config.layout

    // NB: Type center...
    return (
        <div className={styles.containerWrapper_more_space_lg}>
            <iframe
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                className={cx(sharedStyles.marginTop(5), videoStyle.iframe)}
                src={srcUrl}
            />
            <p className={cx(videoStyle.caption, sharedStyles.paddingTop(5))}>
                Watch link:
                <a
                    href={watchUrl}
                    rel="norel noopener"
                    target="_blank"
                    title="Watch the video"
                >
                    {watchUrl}
                </a>
            </p>
        </div>
    )
}

function PostAd(props: { config: any }) {
    const adType = props.config.adType
    return (
        <div className={styles.containerWrapper_more_space_lg}>
            <div
                className={cx(
                    sharedStyles.marginVertical(9),
                    sharedStyles.shadow
                )}
            >
                <p>Advertisement. Type: {adType}</p>
            </div>
        </div>
    )
}

// title: string
// url: string
// type: string
// image: string
function PostLink(props: { config: any }) {
    const title = props.config.title
    const subtitle = props.config.subtitle
    const layout = props.config.layout

    const linkStyles = {
        image: css`
            object-fit: cover;
            object-position: center;
            height: 120px;
            width: 140px;
        `
    }

    const wrapperClassName =
        layout === PostLayoutType.highlight
            ? styles.containerWrapper_more_space_lg
            : styles.containerWrapper

    return (
        <div className={cx(wrapperClassName, sharedStyles.paddingVertical(9))}>
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
                            <span className={sharedStyles.marginRight(5)}>
                                <FaLink />
                            </span>
                            <div
                                className={cx(
                                    sharedStyles.flex,
                                    sharedStyles.flexDirectionColumn
                                )}
                            >
                                <h4>{title}</h4>
                                <p className={sharedStyles.marginTop(3)}>
                                    {subtitle}
                                </p>
                            </div>
                        </div>
                        {props.config.image && (
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
                        )}
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

function PostProvider(props: {
    isEditing: boolean
    post: Post
    series: FetchSerieResponse
}) {
    const isEditing: boolean = props.isEditing
    const config: Config = props.post.config

    const order = config.order
    const modules = config.modules
    const post = props.post

    return (
        <div>
            {order.map(moduleId => {
                const _module: Module = modules[moduleId] as Module
                const moduleProps = _module.props

                // TODO: We can add logic here to add advertisements...
                // So prepending ads before rendering a post (like with a HOC)

                if (_module.type === PostModuleTypes.embed) {
                    return <PostEmbed config={moduleProps} />
                } else if (_module.type === PostModuleTypes.quote) {
                    return <PostQuote config={moduleProps} post={post} />
                } else if (_module.type === PostModuleTypes.text) {
                    return <PostText config={moduleProps} />
                } else if (_module.type === PostModuleTypes.image) {
                    return <PostImage config={moduleProps} />
                } else if (_module.type === PostModuleTypes.ad) {
                    return <PostAd config={moduleProps} />
                } else if (_module.type === PostModuleTypes.video) {
                    return <PostVideo config={moduleProps} />
                } else if (_module.type === PostModuleTypes.separator) {
                    return <PostSeparator config={moduleProps} />
                } else if (_module.type === PostModuleTypes.link) {
                    return <PostLink config={moduleProps} />
                } else if (_module.type === PostModuleTypes.series) {
                    return (
                        <PostSeries
                            config={moduleProps}
                            series={props.series}
                        />
                    )
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
    type: PostModuleTypes
    props: {
        [key: string]: object
    }
}

enum VideoProvider {
    youtube = "youtube"
}

interface Props {
    post?: Post
    series?: FetchSerieResponse
}

function PostDetail(props: Props) {
    if (!props.post || isEmpty(props.post)) {
        return (
            <Layout title="Videos of">
                <p>Post not found or does not exist</p>
            </Layout>
        )
    }

    return (
        <LayoutFullwidth title="Videos of">
            <PostMeta post={props.post} />

            <article>
                <PostHeader post={props.post} />

                <sub>{JSON.stringify(props.series)}</sub>

                {config ? (
                    <PostProvider
                        isEditing={true}
                        post={props.post}
                        series={props.series}
                    />
                ) : (
                    <ReactMarkdown source={props.post.body} />
                )}

                <div style={{ textAlign: "center" }}>
                    Post author
                    <figure>
                        <img src="/images/blog/credits.png" />
                        <figcaption>Jorge Ferreiro</figcaption>
                    </figure>
                </div>
            </article>
        </LayoutFullwidth>
    )
}

PostDetail.getInitialProps = async function(context: any): Promise<Props> {
    const permalink = context.query.id
    const response = await fetch(
        `http://localhost:4000/api/v1/blog/${permalink}`
    )
    const post: Post = await response.json()

    let series: FetchSerieResponse
    if (!isEmpty(post.series)) {
        series = await fetchSerieApi({
            permalink: post.series.permalink
        })
    }

    const config: Config = framerPostConfig

    post.config = config

    console.log(`series ${series}`)

    return {
        post,
        series
    }
}

export default PostDetail

const styles = {
    containerWrapper: css`
        margin: 0 auto;
        max-width: 650px;
        padding: ${spacing6};

        ${largeUp} {
            padding: 0;
        }
    `,
    containerWrapper_lg: css`
        ${largeUp} {
            margin: 0 auto;
            max-width: 650px;
        }
    `,
    containerWrapper_more_space_lg: css`
        ${largeUp} {
            margin: 0 auto;
            max-width: 850px;
        }
    `
}
