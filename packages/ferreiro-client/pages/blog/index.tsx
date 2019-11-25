import React from "react"
import Link from "next/link"
import isEmpty from "lodash/isEmpty"
import moment from "moment"
import { cx } from "emotion"
import { FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa"
import { Fragment, useState, useEffect } from "react"

import {
    fetchFeaturedPostsApi,
    fetchPostsApi,
    fetchSerieApi,
    FetchSerieResponse
} from "../../api/blog"

import { postContactIdeasApi, postSubscribeApi } from "../../api/contact"

import { Layout } from "../../components/Layout"
import { PagePagination, FIRST_PAGE } from "../../components/PagePagination"
import { Sharing } from "../../components/Sharing"
import { Tabs } from "../../components/Tabs"

import config, { sharedStyles } from "../../components/config"
import { createPostUrl, createSeriesUrl } from "../../utils/create-post-url"

import { Pagination } from "../../types/PaginatedResponse"
import { Post } from "../../types/Post"

function BlogItemHighlight(props: { post: Post }) {
    const post = props.post
    return (
        <div className={cx(sharedStyles.marginBottom(8))}>
            <Link href="/blog/[id]" as={createPostUrl(post.permalink)}>
                <a title={post.title} className={sharedStyles.row}>
                    <img
                        alt={post.title}
                        src={post.pic}
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        width="100%"
                    />
                    <h2
                        className={cx(
                            sharedStyles.subtitle,
                            sharedStyles.marginTop(6)
                        )}
                    >
                        {post.title}
                    </h2>
                    <p className={cx(sharedStyles.marginTop(4))}>
                        {post.summary}
                    </p>
                </a>
            </Link>

            <div
                className={cx(
                    sharedStyles.row,
                    sharedStyles.rowFull,
                    sharedStyles.marginTop(5)
                )}
            >
                <div className={sharedStyles.col}>
                    <p>Published {moment(post.createdAt).fromNow()}</p>
                </div>
                <div className={sharedStyles.col_auto}>
                    <Sharing
                        mini={post.pic}
                        permalink={post.permalink}
                        summary={post.summary}
                        title={post.title}
                    />
                </div>
            </div>
        </div>
    )
}

export function BlogItem(props: { post: Post }) {
    const post = props.post

    return (
        <div className={cx(sharedStyles.row, sharedStyles.marginBottom(8))}>
            <div className={sharedStyles.col_9}>
                <div
                    className={cx(
                        sharedStyles.paddingTop(3),
                        sharedStyles.marginRight(5)
                    )}
                >
                    <Link href="/blog/[id]" as={createPostUrl(post.permalink)}>
                        <a
                            title={post.title}
                            className={cx(
                                sharedStyles.row,
                                sharedStyles.paddingBottom(4)
                            )}
                        >
                            <h3>{post.title}</h3>
                        </a>
                    </Link>
                    <div className={cx(sharedStyles.row, sharedStyles.rowFull)}>
                        <div className={sharedStyles.col}>
                            <Link
                                href="/blog/[id]"
                                as={createPostUrl(post.permalink)}
                            >
                                <a
                                    title={post.title}
                                    className={cx(sharedStyles.row)}
                                >
                                    <p>{post.summary}</p>
                                </a>
                            </Link>

                            <div
                                className={cx(
                                    sharedStyles.row,
                                    sharedStyles.marginTop(4)
                                )}
                            >
                                {post.series && (
                                    <Link
                                        href="/series/[id]"
                                        as={createSeriesUrl(
                                            post.series.permalink
                                        )}
                                    >
                                        <a
                                            className={sharedStyles.marginRight(
                                                4
                                            )}
                                        >
                                            {post.series.title}
                                        </a>
                                    </Link>
                                )}
                                <p>
                                    Published {moment(post.createdAt).fromNow()}
                                </p>
                            </div>
                        </div>
                        <div
                            className={cx(
                                sharedStyles.col_auto,
                                sharedStyles.flex,
                                sharedStyles.alignItemsFlexEnd
                            )}
                        >
                            <Sharing
                                mini={post.pic}
                                permalink={post.permalink}
                                summary={post.summary}
                                title={post.title}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={sharedStyles.col_2}>
                <Link href="/blog/[id]" as={createPostUrl(post.permalink)}>
                    <img
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        src={post.pic}
                        alt={post.title}
                    />
                </Link>
            </div>
        </div>
    )
}

function BlogList(props: { posts: Post[] }) {
    if (isEmpty(props.posts)) {
        return (
            <Fragment>
                <div className={sharedStyles.marginTop(8)}>
                    No more posts available
                </div>
            </Fragment>
        )
    }

    const [postHighlight, ...filteredPosts] = props.posts

    return (
        <div>
            <BlogItemHighlight post={postHighlight} />

            {filteredPosts.map((post: Post) => (
                <BlogItem key={post.id} post={post} />
            ))}
        </div>
    )
}

function BlogTopArticles(props: { posts: Post[] }) {
    const [featuredPosts, setFeaturedPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isEmpty(props.posts) && isEmpty(featuredPosts)) {
            setIsLoading(true)
            fetchFeaturedPostsApi({ limit: 5 })
                .then((posts: Post[]) => {
                    setFeaturedPosts(posts)
                })
                .catch(error => {
                    // TODO: Handle errors properly
                    console.log(error)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [featuredPosts])

    const posts = props.posts || featuredPosts || []

    return (
        <div>
            <h2
                className={cx(
                    sharedStyles.subtitle,
                    sharedStyles.marginBottom(5)
                )}
            >
                🔥 Popular articles
            </h2>

            {isLoading ? (
                <p>Loading Popular articles...</p>
            ) : (
                <ul
                    style={{
                        paddingInlineStart: 30,
                        listStyle: "disc"
                    }}
                >
                    {posts.map((post: Post) => (
                        <li
                            key={post.permalink}
                            className={cx(
                                sharedStyles.text,
                                sharedStyles.marginBottom(5)
                            )}
                        >
                            <Link href={createPostUrl(post.permalink)}>
                                <a title={post.title}>
                                    <h3 className={sharedStyles.text}>
                                        {post.title}
                                    </h3>
                                    <p>{post.published}</p>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

function BlogAdNewsletter() {
    const [name, setName] = useState("Jorge")
    const [email, setEmail] = useState("")
    const isSubscribe = true
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleEmail = event => {
        setEmail(event.target.value)
    }

    const resetForm = event => {
        setName("")
        setEmail("")
        setIsError(false)
        setIsSuccess(false)
    }

    const submitForm = event => {
        setIsError(false)
        setIsLoading(true)
        setIsSuccess(false)

        postSubscribeApi({
            body: {
                name,
                email,
                isSubscribe
            }
        })
            .then(response => {
                setIsSuccess(true)
            })
            .catch(error => {
                setIsError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <div>
            <h2
                className={cx(
                    sharedStyles.subtitle,
                    sharedStyles.marginBottom(5)
                )}
            >
                🚀 Get your dream job
            </h2>

            <p className={sharedStyles.marginBottom(5)}>
                Do you wanna get tips and tricks on how to get your next
                internship or full time position? You can sign up into "The
                hackers newsletter" curated by me
            </p>

            {isLoading ? (
                <p>Sending your message...</p>
            ) : (
                <>
                    {isError && (
                        <div>
                            <p>
                                😨 Opps... I couldn't add you to the list. Try
                                again or send me an email jorge@ferreiro.me
                            </p>
                            <button onClick={submitForm}>Try again</button>
                        </div>
                    )}

                    {isSuccess ? (
                        <div>
                            <p>
                                ✅ Thanks! Yeah! You are now subscribed! 🙌🙌🙌
                                Do you have any comment or question?
                            </p>
                            <button onClick={resetForm}>
                                Send me a message
                            </button>
                        </div>
                    ) : (
                        <div className={sharedStyles.row}>
                            <input
                                className={cx(
                                    sharedStyles.inputField,
                                    sharedStyles.col
                                )}
                                placeholder="Write your email"
                                value={email}
                                onChange={handleEmail}
                            />
                            <button
                                className={cx(
                                    sharedStyles.buttonSubmit,
                                    sharedStyles.col_auto
                                )}
                                onClick={submitForm}
                                type="submit"
                            >
                                Subscribe
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

function AdSocialDeveloper() {
    return (
        <div>
            <h2
                className={cx(
                    sharedStyles.subtitle,
                    sharedStyles.marginBottom(5)
                )}
            >
                Show me your social skills!
            </h2>
            <ul>
                <li>
                    <a
                        href={config.meta.social.twitter.url}
                        target="_blank"
                        rel="norel nooppener"
                    >
                        <span>
                            <FaTwitter />
                        </span>
                        <span>Twitter</span>
                    </a>
                </li>
                <li>
                    <a
                        href={config.meta.social.youtube.url}
                        target="_blank"
                        rel="norel nooppener"
                    >
                        <span>
                            <FaYoutube />
                        </span>
                        <span>Youtube</span>
                    </a>
                </li>
                <li>
                    <a
                        href={config.meta.social.linkedin.url}
                        target="_blank"
                        rel="norel nooppener"
                    >
                        <span>
                            <FaLinkedin />
                        </span>
                        <span>Linkedin</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

function BlogAdIdea() {
    const [message, setMessage] = useState("")
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleMessage = event => {
        setMessage(event.target.value)
    }

    const resetForm = event => {
        setMessage("")
        setIsError(false)
        setIsSuccess(false)
    }

    const submitForm = event => {
        setIsError(false)
        setIsLoading(true)
        setIsSuccess(false)

        postContactIdeasApi({
            body: {
                message
            }
        })
            .then(() => {
                setIsSuccess(true)
            })
            .catch(error => {
                setIsError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <div>
            <h2
                className={cx(
                    sharedStyles.subtitle,
                    sharedStyles.marginBottom(5)
                )}
            >
                Got an idea?
            </h2>

            <p className={sharedStyles.marginBottom(5)}>
                Do you have an idea of a blog that you want me to write? Send it
                below
            </p>

            {isLoading ? (
                <p>Sending your message...</p>
            ) : (
                <>
                    {isError && (
                        <p>
                            😨 Opps... I couldn't submit your idea. Try again or
                            send me an email jorge@ferreiro.me
                            <button onClick={submitForm}>Try again</button>
                        </p>
                    )}

                    {isSuccess ? (
                        <p>
                            ✅ Yeah! Message sent! 🙌🙌🙌
                            <button onClick={resetForm}>
                                Send another idea?
                            </button>
                            <Link href="/newsletter">
                                <a>Get the newsletter</a>
                            </Link>
                        </p>
                    ) : (
                        <div className={sharedStyles.row}>
                            <textarea
                                className={cx(
                                    sharedStyles.textarea,
                                    sharedStyles.marginBottom(3)
                                )}
                                placeholder="Write your post idea"
                                value={message}
                                onChange={handleMessage}
                            />
                            <button
                                className={cx(
                                    sharedStyles.buttonSubmit,
                                    sharedStyles.col_12
                                )}
                                onClick={submitForm}
                                type="submit"
                            >
                                Send idea
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

// TODO: Create type for a category
function BlogCategories(props: { categories: any[] }) {
    return (
        <div>
            <h2
                className={cx(
                    sharedStyles.subtitle,
                    sharedStyles.marginBottom(5)
                )}
            >
                Categories
            </h2>
            <ul>
                {props.categories.map(category => (
                    <li>Hola</li>
                ))}
            </ul>
        </div>
    )
}

// TODO: Add waypoint
function BlogSeries(props: { featuredSeriePermalink: string }) {
    const [serieInfo, setSerieInfo] = useState({
        title: "",
        permalink: "",
        description: "",
        pic: ""
    })
    const [seriesPosts, setSeriesPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isEmpty(seriesPosts)) {
            setIsLoading(true)
            fetchSerieApi({ permalink: props.featuredSeriePermalink })
                .then((response: FetchSerieResponse) => {
                    setSerieInfo(response.serie)
                    setSeriesPosts(response.posts)
                })
                .catch(error => {
                    // TODO: Handle errors properly
                    console.log(error)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [seriesPosts])

    return (
        <div>
            <h2
                className={cx(
                    sharedStyles.subtitle,
                    sharedStyles.marginBottom(5)
                )}
            >
                Featured serie
            </h2>

            {isLoading ? (
                <p>Loading Popular articles...</p>
            ) : (
                <div>
                    {serieInfo && (
                        <div>
                            <img src={serieInfo.pic} width="60px" />
                            <h3>{serieInfo.title}</h3>
                        </div>
                    )}

                    <ul style={{ paddingInlineStart: 30 }}>
                        {seriesPosts.map((post: Post) => (
                            <li
                                key={post.permalink}
                                className={cx(
                                    sharedStyles.text,
                                    sharedStyles.marginBottom(5)
                                )}
                            >
                                <Link href={createPostUrl(post.permalink)}>
                                    <a title={post.title}>
                                        <h3 className={sharedStyles.text}>
                                            {post.title}
                                        </h3>
                                        <p>{post.published}</p>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

interface Props {
    activePage: number
    featuredPosts: Post[]
    featuredSeriePermalink: string
    pagination: Pagination
    posts: Post[]
}

export function Blog(props: Props) {
    // TOOD: Move to config?
    const categories = [
        {
            display: "All",
            path: "/blog",
            as: "/blog",
            type: "Page.blog"
        },
        {
            display: "Career advice",
            path: "/blog/topics/[id]",
            as: "/blog/topics/career",
            type: "Page.blog"
        },
        {
            display: "Software",
            path: "/blog/topics/[id]",
            as: "/blog/topics/software",
            type: "Page.blog"
        }
    ]

    return (
        <Layout title="Blog">
            <h1
                className={cx(sharedStyles.title, sharedStyles.marginBottom(5))}
            >
                Blog
            </h1>

            <Tabs activePath="/blog" tabs={categories} />

            <div className={sharedStyles.marginTop(8)}>
                <div className={sharedStyles.row}>
                    <div className={sharedStyles.col_lg_8}>
                        <BlogList posts={props.posts} />

                        <div
                            className={cx(
                                sharedStyles.separator,
                                sharedStyles.marginTop(7),
                                sharedStyles.marginBottom(7)
                            )}
                        />

                        <PagePagination
                            activePage={props.activePage}
                            pagination={props.pagination}
                        />
                    </div>
                    <div className={sharedStyles.col_lg_4}>
                        <div className={sharedStyles.marginLeft(6)}>
                            <BlogTopArticles posts={props.featuredPosts} />

                            <div
                                className={cx(
                                    sharedStyles.separator,
                                    sharedStyles.marginTop(7),
                                    sharedStyles.marginBottom(7)
                                )}
                            />

                            <BlogAdNewsletter />

                            <div
                                className={cx(
                                    sharedStyles.separator,
                                    sharedStyles.marginTop(7),
                                    sharedStyles.marginBottom(7)
                                )}
                            />

                            <BlogSeries
                                featuredSeriePermalink={
                                    props.featuredSeriePermalink
                                }
                            />

                            <div
                                className={cx(
                                    sharedStyles.separator,
                                    sharedStyles.marginTop(7),
                                    sharedStyles.marginBottom(7)
                                )}
                            />

                            <AdSocialDeveloper />

                            <div
                                className={cx(
                                    sharedStyles.separator,
                                    sharedStyles.marginTop(7),
                                    sharedStyles.marginBottom(7)
                                )}
                            />

                            <BlogCategories categories={categories} />

                            <div
                                className={cx(
                                    sharedStyles.separator,
                                    sharedStyles.marginTop(7),
                                    sharedStyles.marginBottom(7)
                                )}
                            />

                            <BlogAdIdea />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

Blog.getInitialProps = async function(context: any): Promise<Props> {
    const page = context.query.page ? parseInt(context.query.page) : FIRST_PAGE

    try {
        const { docs, ...pagination } = await fetchPostsApi({ page })
        const featuredPosts: Post[] = await fetchFeaturedPostsApi({ limit: 5 })

        return {
            activePage: page,
            posts: docs,
            pagination,
            featuredPosts,
            featuredSeriePermalink:
                "the-definitive-guide-to-making-the-most-of-college"
        }
    } catch (error) {
        return {
            activePage: 0,
            posts: [],
            pagination: {} as Pagination,
            featuredPosts: [],
            featuredSeriePermalink:
                "the-definitive-guide-to-making-the-most-of-college"
        }
    }
}

export default Blog
