import React from "react"
import Head from "next/head"
import isEmpty from "lodash/isEmpty"
import ReactMarkdown from "react-markdown"
import { cx, css } from "emotion"

import framerPostConfig from "./__fixtures__/framer.js"
import codemotionWebinarConfig from "./__fixtures__/codemotion-webinar.js"
import promotionConfig from "./__fixtures__/promotion-config"
import hackathonPitchConfig from "./__fixtures__/hackathon-pitch"

import { Layout, LayoutFullwidth } from "../../components/Layout"
import config, {
    sharedStyles,
    spacing6,
    largeUp,
    spacing7,
    spacing4,
    spacing5,
    spacing3,
    bios,
    mediumUp
} from "../../components/config"

import { Post, Config, PostLayoutType } from "../../types/Post"
import { formatUrl } from "url-lib"
import Link from "next/link"
import moment from "moment"
import {
    getUrlWithTracking,
    getPostQualifiedUrl,
    getTwitterShareableUrl,
    getLinkedinShareableUrl,
    getFacebookShareableUrl
} from "../../utils/get-url"
import {
    FaTwitter,
    FaLinkedin,
    FaFacebook,
    FaLink,
    FaTag,
    FaTags,
    FaInstagram
} from "react-icons/fa"
import { FetchSerieResponse, fetchSerieApi } from "../../api/blog"
import { PostModuleTypes } from "../../types/Post"
import { TrackingOptions } from "../../types/TrackingOptions.js"

function handleShareTwitterClick(props: {
    post: Post
    trackingOptions: TrackingOptions
}) {
    const permalink = props.post.permalink
    const title = props.post.title
    const utm_source = props.trackingOptions.utm_source

    const twitterUrl = getTwitterShareableUrl({
        url: getPostQualifiedUrl(permalink),
        title,
        trackingOptions: {
            utm_source: utm_source || "sharing-twitter"
        }
    })

    // TODO: Emit a new google analytics event to track how many clicks
    window.open(twitterUrl, title, "width=550px,height=580px;")
}

function handleShareLinkedinClick(props: {
    post: Post
    trackingOptions: TrackingOptions
}) {
    const permalink = props.post.permalink
    const title = props.post.title
    const utm_source = props.trackingOptions.utm_source

    const linkedinUrl = getLinkedinShareableUrl({
        url: getPostQualifiedUrl(permalink),
        title,
        trackingOptions: {
            utm_source: utm_source || "sharing-linkedin"
        }
    })

    // TODO: Emit a new google analytics event to track how many clicks
    window.open(linkedinUrl, title, "width=550px,height=580px;")
}

function handleShareFacebookClick(props: {
    post: Post
    trackingOptions: TrackingOptions
}) {
    const permalink = props.post.permalink
    const title = props.post.title
    const utm_source = props.trackingOptions.utm_source

    const linkedinUrl = getFacebookShareableUrl({
        url: getPostQualifiedUrl(permalink),
        title,
        trackingOptions: {
            utm_source: utm_source || "sharing-facebook"
        }
    })

    // TODO: Emit a new google analytics event to track how many clicks
    window.open(linkedinUrl, title, "width=550px,height=580px;")
}

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
    return (
        <div
            className={cx(
                sharedStyles.paddingHorizontal(6),
                sharedStyles.marginBottom(7)
            )}
        >
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

                <PostHeaderInfo
                    post={props.post}
                    avatarUrl="/images/about/jorge_ferreiro_software_engineer_entrepreneur.jpg"
                    name="Jorge Ferreiro"
                    createdAt={props.post.createdAt}
                    twitterHandle="@jgferreiro"
                />
            </div>
        </div>
    )
}

function PostHeaderInfo(props: {
    post: Post
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
        `,
        author: css`
            color: ${config.colors.secondary};
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
                            className={authorStyles.author}
                            href={getUrlWithTracking(
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
                    <button
                        onClick={() =>
                            handleShareTwitterClick({
                                post: props.post,
                                trackingOptions: {
                                    utm_source: "sharing-quote-twitter"
                                }
                            })
                        }
                        className={sharedStyles.buttonNoFill}
                    >
                        <FaTwitter />
                    </button>

                    <button
                        onClick={() =>
                            handleShareFacebookClick({
                                post: props.post,
                                trackingOptions: {
                                    utm_source: "sharing-quote-twitter"
                                }
                            })
                        }
                        className={sharedStyles.buttonNoFill}
                    >
                        <FaFacebook />
                    </button>

                    <button
                        onClick={() =>
                            handleShareLinkedinClick({
                                post: props.post,
                                trackingOptions: {
                                    utm_source: "sharing-quote-twitter"
                                }
                            })
                        }
                        className={sharedStyles.buttonNoFill}
                    >
                        <FaLinkedin />
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

interface PostSummaryProps {
    value: string
}

function PostSummary({ value }: PostSummaryProps) {
    const summaryStyles = css`
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

    return (
        <summary className={styles.containerWrapper}>
            <h2
                className={cx(
                    summaryStyles,
                    sharedStyles.marginTop(6),
                    sharedStyles.marginBottom(6)
                )}
            >
                {value}
            </h2>
        </summary>
    )
}

interface PostSeriesProps {
    // NB: This is the current article, so we
    // can highlight that in the list
    currentArticle: string
    series: FetchSerieResponse
    layout: PostLayoutType
}
function PostSeries(props: PostSeriesProps) {
    const series = props.series
    const layout = props.layout || PostLayoutType.inline

    return (
        <div className={getContainerClassname({ layout })}>
            Post series...
            {JSON.stringify(series, null, 2)}
        </div>
    )
}

interface PostSummaryProps {
    author: string
    value: string
    layout: PostLayoutType
    post: Post
}

function PostQuote({ author, value, layout, post }: PostSummaryProps) {
    const quoteStyles = {
        arrow: css`
            background-image: url("/images/blog/quote_arrow.png");
            background-size: cover;
            height: 40px;

            opacity: 0.8;
            width: 90px;

            ${mediumUp} {
                margin-left: 19%;
            }
        `,
        author: css`
            text-align: center;
        `,
        quote: css`
            border: none;
            color: rgba(0, 0, 0, 0.54);
            font-family: Georgia, Cambria, "Times New Roman", Times, serif;
            font-weight: 400;
            font-style: italic;
            font-size: 28px;
            letter-spacing: -0.014em;
            line-height: 42px;
            padding: 0;
            text-align: left;
        `,
        quoteHighlight: css`
            --x-height-multiplier: 0.363;
            --baseline-multiplier: 0.157;
            background-color: transparent !important;
            background-image: linear-gradient(
                to bottom,
                rgba(203, 255, 186, 1),
                rgba(203, 255, 186, 1)
            );
        `,
        socialButton: css`
            background: transparent;
            border: 0;
            cursor: pointer;
            font-size: 32px;
        `
    }

    return (
        <div className={getContainerClassname({ layout })}>
            <blockquote>
                <p className={quoteStyles.quote}>{value}</p>
                {author && (
                    <cite
                        className={cx(
                            quoteStyles.author,
                            sharedStyles.marginTop(3)
                        )}
                    >
                        {author}
                    </cite>
                )}
                <div
                    className={cx(
                        sharedStyles.flex,
                        sharedStyles.justifyContentStart,
                        sharedStyles.marginTop(5)
                    )}
                >
                    <div
                        className={cx(
                            quoteStyles.arrow,
                            sharedStyles.marginRight(4)
                        )}
                    />

                    <button
                        className={cx(
                            sharedStyles.displayInlineFlex,
                            quoteStyles.socialButton,
                            sharedStyles.iconTwitter
                        )}
                        onClick={() =>
                            handleShareTwitterClick({
                                post,
                                trackingOptions: {
                                    utm_source: "sharing-quote-twitter"
                                }
                            })
                        }
                    >
                        <FaTwitter />
                    </button>

                    <button
                        className={cx(
                            sharedStyles.displayInlineFlex,
                            quoteStyles.socialButton,
                            sharedStyles.iconLinkedin
                        )}
                        onClick={() =>
                            handleShareFacebookClick({
                                post,
                                trackingOptions: {
                                    utm_source: "sharing-quote-facebook"
                                }
                            })
                        }
                    >
                        <FaFacebook />
                    </button>

                    <button
                        className={cx(
                            sharedStyles.displayInlineFlex,
                            quoteStyles.socialButton,
                            sharedStyles.iconLinkedin
                        )}
                        onClick={() =>
                            handleShareLinkedinClick({
                                post,
                                trackingOptions: {
                                    utm_source: "sharing-quote-linkedin"
                                }
                            })
                        }
                    >
                        <FaLinkedin />
                    </button>
                </div>
            </blockquote>
        </div>
    )
}

interface PostEmbedProps {
    src: string
    layout: PostLayoutType
}

function PostEmbed({ src, layout }: PostEmbedProps) {
    return (
        <div className={cx(getContainerClassname({ layout }))}>
            <div
                className={cx(
                    sharedStyles.embedResponsive,
                    sharedStyles.embedResponsive16by9
                )}
            >
                <iframe
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={true}
                    className={sharedStyles.embedResponsiveItem}
                    src={src}
                />
            </div>
        </div>
    )
}

interface PostError {
    id: string
}
function PostError(props: PostError) {
    const socialNetworksStyle = {
        wrapper: css`
            border: 3px dashed #cecece;
        `
    }
    const layout = PostLayoutType.inline

    return (
        <div
            className={cx(
                socialNetworksStyle.wrapper,
                getContainerClassname({ layout })
            )}
        >
            <p>
                There is an error trying to showing this content (id: $
                {props.id})
            </p>
            <p>Please, report this so I can fix it. Thanks 🙌</p>
            <a href="/contact">Report error</a>
        </div>
    )
}

// TODO: make the proptypes
interface PostTextProps {
    layout?: PostLayoutType

    // Contains the markdown text
    value: string
}

function PostText({ layout, value }: PostTextProps) {
    const postLayout = layout || PostLayoutType.inline

    return (
        <div
            className={cx(
                postStyle.wrapper,
                getContainerClassname({ layout: postLayout }),
                sharedStyles.paddingVertical_lg(5)
            )}
        >
            <ReactMarkdown source={value} />
        </div>
    )
}

//
enum LinkTarget {
    target = "_blank",
    self = "_self"
}

function getContainerClassname({ layout }: { layout?: PostLayoutType }) {
    if (layout === PostLayoutType.full) {
        return cx()
    } else if (layout === PostLayoutType.inline) {
        return cx(styles.containerWrapper)
    }

    return cx(styles.containerWrapper_more_space_lg)
}

function withLink(
    Component: any,
    options: {
        href: string
        target?: LinkTarget
    }
) {
    if (!options.href || isEmpty(options.href)) {
        return Component
    }

    const target = options.target || LinkTarget.target

    return (
        <a href={options.href} target={target}>
            {Component}
        </a>
    )
}

interface PostImageProps {
    alt: string
    // TODO: Explain when is this gonna be used...
    caption?: string
    href: string
    layout: PostLayoutType
    maxWidth?: string
    src: string
    target: LinkTarget
}

function PostImage({
    alt,
    caption,
    href,
    layout,
    maxWidth,
    src,
    target
}: PostImageProps) {
    const imageStyles = {
        wrapper: css`
            text-align: center;
        `,
        caption: css`
            text-align: center;
            padding-top: ${spacing5};
        `
    }

    const options = {
        href,
        target
    }

    return withLink(
        <figure
            className={cx(
                getContainerClassname({ layout }),
                imageStyles.wrapper
            )}
        >
            <img style={{ maxWidth }} src={src} width="100%" alt={alt} />
            {caption && (
                <figcaption className={imageStyles.caption}>
                    {caption}
                </figcaption>
            )}
        </figure>,
        options
    )
}

interface PostVideoProps {
    id: string
    provider: VideoProvider
    isAutoplay: boolean
    layout: PostLayoutType
}

function PostVideo(props: PostVideoProps) {
    const videoStyle = {
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

    const id = props.id
    const provider = props.provider
    const autoplay = props.isAutoplay ? 1 : 0

    const srcUrl = formatUrl(getEmbedUrl(id, provider), { autoplay })
    const watchUrl = getWatchurl(id, provider)

    // NB: It could be , center, etc
    const layout = props.layout

    // NB: Type center...
    return (
        <div className={styles.containerWrapper_more_space_lg}>
            <PostEmbed src={srcUrl} layout={PostLayoutType.highlight} />
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

interface PostSocialNetworksProps {
    title?: string
    text?: string
    layout?: PostLayoutType
}

function PostSocialNetworks(props: PostSocialNetworksProps) {
    const title = props.title || "🤔 Questions?"
    const text =
        props.text ||
        "If you have some doubts or want to stay in touch I'll be happy to get a message from you! You can reach me here"
    const layout = props.layout || PostLayoutType.inline

    return (
        <div
            className={cx(postStyle.wrapper, getContainerClassname({ layout }))}
        >
            <h2>{title}</h2>
            <p>{text}</p>
            <ul>
                <li>
                    Youtube:{" "}
                    <a href="https://www.youtube.com/jgferreiro?utm-source=ferreiro-post">
                        https://www.youtube.com/jgferreiro
                    </a>
                </li>
                <li>
                    Linkedin:{" "}
                    <a href="https://www.linkedin.com/in/jgferreiro/">
                        https://www.linkedin.com/in/jgferreiro/
                    </a>
                </li>
                <li>
                    Twitter:{" "}
                    <a href="https://www.youtube.com/jgferreiro?utm-source=ferreiro-post">
                        https://www.youtube.com/jgferreiro
                    </a>
                </li>
                <li>
                    Email:{" "}
                    <a href="/contact?utm_source=ferreiro-framer-blog&utm_medium=ferreiro-blog">
                        Contact and information
                    </a>
                </li>
            </ul>
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
            <Link href={props.config.src}>
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
                if (!(moduleId in modules)) {
                    return <PostError id={moduleId} />
                }

                const _module: Module = modules[moduleId] as Module
                const moduleProps = _module.props

                // TODO: We can add logic here to add advertisements...
                // So prepending ads before rendering a post (like with a HOC)

                if (_module.type === PostModuleTypes.embed) {
                    return <PostEmbed {...moduleProps} />
                } else if (_module.type === PostModuleTypes.summary) {
                    return <PostSummary {...moduleProps} />
                } else if (_module.type === PostModuleTypes.quote) {
                    return <PostQuote {...moduleProps} post={post} />
                } else if (_module.type === PostModuleTypes.text) {
                    return <PostText {...moduleProps} />
                } else if (_module.type === PostModuleTypes.image) {
                    return <PostImage {...moduleProps} />
                } else if (_module.type === PostModuleTypes.ad) {
                    return <PostAd config={moduleProps} />
                } else if (_module.type === PostModuleTypes.video) {
                    return <PostVideo {...moduleProps} />
                } else if (_module.type === PostModuleTypes.separator) {
                    return <PostSeparator config={moduleProps} />
                } else if (_module.type === PostModuleTypes.link) {
                    return <PostLink config={moduleProps} />
                } else if (_module.type === PostModuleTypes.series) {
                    return <PostSeries {...moduleProps} series={props.series} />
                } else if (_module.type === PostModuleTypes.socialNetworks) {
                    return <PostSocialNetworks {...moduleProps} />
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

function PostTags(props: { post: Post }) {
    const tagsStyle = {
        tag: css`
            border: 1px solid #e2e2e2;
            border-radius: 4px;
            color: #d83901;
            display: inline-flex;
            padding: ${spacing3} ${spacing4};
            text-transform: capitalize;
            margin-bottom: ${spacing4};

            &:hover {
                background: #fbfafa;
            }
        `
    }
    const tags = [
        ...props.post.category.map(category => ({
            text: category,
            url: `/blog/topics/${category}`
        })),
        ...props.post.tags.map(tag => ({
            text: tag,
            url: `/blog/tag/${tag}`
        }))
    ]

    return (
        <div
            className={getContainerClassname({ layout: PostLayoutType.inline })}
        >
            <div className={sharedStyles.row}>
                <div
                    className={cx(
                        sharedStyles.col_auto,
                        sharedStyles.marginLeft(3),
                        sharedStyles.marginRight(5)
                    )}
                    style={{
                        marginTop: "10px"
                    }}
                >
                    <FaTags />
                </div>
                <div className={sharedStyles.col}>
                    {tags.map((tag: { text: string; url: string }) => {
                        return (
                            <Link href={tag.url}>
                                <a
                                    title={tag.text}
                                    className={cx(
                                        tagsStyle.tag,
                                        sharedStyles.marginRight(4)
                                    )}
                                >
                                    #{tag.text}
                                </a>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

function PostAuthor(props: {}) {
    const authorStyles = {
        bio: css`
            line-height: 20px;

            a {
                font-weight: 600;
                color: #000;
            }
        `,
        social: css`
            margin: 0;
            margin-top: ${spacing4};
        `,
        socialItem: css`
            margin: ${spacing3} 0;

            &:last-child {
                margin-bottom: 0;
            }
        `,
        socialItemLink: css`
            color: #000;
        `,
        socialIcon: css`
            margin-right: ${spacing4};
        `,
        socialText: css``
    }

    return (
        <div
            className={getContainerClassname({ layout: PostLayoutType.inline })}
        >
            <div
                className={cx(
                    sharedStyles.flex,
                    sharedStyles.marginHorizontal(8)
                )}
            >
                <div
                    className={cx(
                        sharedStyles.col_auto,
                        sharedStyles.marginRight(6)
                    )}
                >
                    <img
                        width="100px"
                        className={sharedStyles.circle}
                        src="/images/about/jorge_ferreiro_software_engineer_entrepreneur.jpg"
                    />
                </div>
                <div className={sharedStyles.col}>
                    <h3>Jorge Ferreiro</h3>

                    <p
                        className={cx(
                            sharedStyles.marginTop(5),
                            sharedStyles.marginBottom(5),
                            authorStyles.bio
                        )}
                        dangerouslySetInnerHTML={{ __html: bios.intro }}
                    />

                    <ul className={authorStyles.social}>
                        <li className={authorStyles.socialItem}>
                            <a
                                className={authorStyles.socialItemLink}
                                href={config.meta.social.twitter.url}
                                target="_blank"
                            >
                                <span className={authorStyles.socialIcon}>
                                    <FaTwitter />
                                </span>
                                <span className={authorStyles.socialText}>
                                    Twitter @jgferreiro
                                </span>
                            </a>
                        </li>

                        <li className={authorStyles.socialItem}>
                            <a
                                className={authorStyles.socialItemLink}
                                href={config.meta.social.instagram.url}
                                target="_blank"
                            >
                                <span className={authorStyles.socialIcon}>
                                    <FaInstagram />
                                </span>
                                <span className={authorStyles.socialText}>
                                    Instagram @jgferreiro
                                </span>
                            </a>
                        </li>

                        <li className={authorStyles.socialItem}>
                            <a
                                className={authorStyles.socialItemLink}
                                href={config.meta.social.linkedin.url}
                                target="_blank"
                            >
                                <span className={authorStyles.socialIcon}>
                                    <FaLinkedin />
                                </span>
                                <span className={authorStyles.socialText}>
                                    Linkedin @jgferreiro
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

interface Module {
    type: PostModuleTypes
    props: PostImageProps | any
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

            <div style={{ position: "fixed", bottom: 0 }}>
                <p>Don't miss out!</p>
                <input placeholder="subscribe" />
                <p>Share!</p>
                <FaTwitter />
            </div>

            <article>
                <PostHeader post={props.post} />

                {props.post.config && !isEmpty(props.post.config) ? (
                    <PostProvider
                        isEditing={true}
                        post={props.post}
                        series={props.series}
                    />
                ) : (
                    <ReactMarkdown source={props.post.body} />
                )}
            </article>

            <p>POST SHARE</p>

            <div
                className={cx(
                    getContainerClassname({
                        layout: PostLayoutType.inline
                    }),
                    sharedStyles.separator,
                    sharedStyles.marginTop(7),
                    sharedStyles.marginBottom(7)
                )}
            />

            <PostTags post={props.post} />

            <div
                className={cx(
                    getContainerClassname({
                        layout: PostLayoutType.inline
                    }),
                    sharedStyles.separator,
                    sharedStyles.marginTop(5),
                    sharedStyles.marginBottom(8)
                )}
            />

            <PostAuthor />

            <div
                className={cx(
                    getContainerClassname({
                        layout: PostLayoutType.inline
                    }),
                    sharedStyles.separator,
                    sharedStyles.marginTop(8),
                    sharedStyles.marginBottom(8)
                )}
            />

            <p style={{ textAlign: "center" }}>
                <img src="/images/blog/signup.png" />
            </p>

            <div
                className={cx(
                    getContainerClassname({
                        layout: PostLayoutType.inline
                    }),
                    sharedStyles.separator,
                    sharedStyles.marginTop(5),
                    sharedStyles.marginBottom(7)
                )}
            />

            <p>TODO: Put related posts...</p>
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

    const configMapper = {
        "codemotion-webinar-jorge-ferreiro-progressive-web-apps": codemotionWebinarConfig,
        "interactive-prototyping-with-framer-and-react": framerPostConfig,
        "one-year-at-eventbrite-and-promoted-to-sde2-frontend": promotionConfig,
        "part-4-pitch-hackathon-idea-and-followup": hackathonPitchConfig
    }

    // TODO: Maybe instead of having everything inside config
    // it's better to have layout, which is a bunch of modules...
    // modules
    // layout
    const config: Config = configMapper[post.permalink] || undefined

    if (config) {
        post.config = config
    }

    console.log(post)

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
        padding: 0 ${spacing6};

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
    containerWrapper_full: css``,
    containerWrapper_more_space_lg: css`
        ${largeUp} {
            margin: 0 auto;
            max-width: 850px;
        }
    `
}

const postStyle = {
    wrapper: css`
        h2 {
            ${sharedStyles.paddingTop(7)}
            ${sharedStyles.paddingBottom(6)}
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
