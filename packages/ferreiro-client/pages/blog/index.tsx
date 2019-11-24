import React from "react"
import { cx } from "emotion"
import { Fragment, useState, useEffect } from "react"
import Link from "next/link"
import isEmpty from "lodash/isEmpty"
import { FaTwitter } from "react-icons/fa"

import { Layout } from "../../components/Layout"
import { Tabs } from "../../components/Tabs"
import config, { sharedStyles } from "../../components/config"

import { fetchFeaturedPostsApi, fetchPostsApi } from "../../api/blog"
import { createPostUrl } from "../../utils/create-post-url"

import { Pagination, PaginatedResponse } from "../../types/PaginatedResponse"
import { Post } from "../../types/Post"
import { SharingDropdown } from "../../components/SharingDropdown"

function PagePagination(props: { pagination: Pagination }) {
    return (
        <div>
            <span>{props.pagination.page}</span>
            <span>/</span>
            <span>{props.pagination.pages}</span>
        </div>
    )
}

function BlogItemHighlight(props: { post: Post }) {
    const post = props.post
    return (
        <div>
            <Link href="/blog/[id]" as={createPostUrl(post.permalink)}>
                <a title={post.title} className={sharedStyles.row}>
                    <img width="100%" src={post.pic} alt={post.title} />
                    <h2>{post.title}</h2>
                </a>
            </Link>

            <div className={cx(sharedStyles.row, sharedStyles.rowFull)}>
                <div className={sharedStyles.col_11}>
                    <p>Published {post.createdAt}</p>
                </div>
                <div className={sharedStyles.col_1}>
                    <SharingDropdown />
                </div>
            </div>
        </div>
    )
}

function BlogItem(props: { post: Post }) {
    const post = props.post

    return (
        <div>
            <Link href="/blog/[id]" as={createPostUrl(post.permalink)}>
                <a title={post.title} className={sharedStyles.row}>
                    <div className={sharedStyles.col_10}>
                        <h3>{post.title}</h3>
                        <p>Published {post.createdAt}</p>

                        <SharingDropdown />
                    </div>
                    <div className={sharedStyles.col_2}>
                        <img
                            width="100%"
                            height="100px"
                            src={post.pic}
                            alt={post.title}
                        />
                    </div>
                </a>
            </Link>
        </div>
    )
}

function BlogList(props: { posts: Post[]; pagination: Pagination }) {
    if (isEmpty(props.posts)) {
        return (
            <Fragment>
                <div className={sharedStyles.marginTop(8)}>
                    No more posts available
                </div>
                <PagePagination pagination={props.pagination} />
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

            <PagePagination pagination={props.pagination} />
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
            <h2 className={sharedStyles.subtitle}>🔥 Popular articles</h2>

            {isLoading ? (
                <p>Loading Popular articles...</p>
            ) : (
                <ul>
                    {posts.map((post: Post) => (
                        <li key={post.permalink}>
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
    return (
        <div>
            <h2>🚀 Get your dream job</h2>
            <p>
                Do you wanna get tips and tricks on how to get your next
                internship or full time position? You can sign up into "The
                hackers newsletter" curated by me
            </p>
        </div>
    )
}

function AdSocialDeveloper() {
    return (
        <div>
            <h2>Show me your social skills!</h2>
            <ul>
                <li>
                    <span>
                        <FaTwitter />
                    </span>
                    <span>Twitter</span>
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

        fetch("http://localhost:4000/api/v1/contact/ideas", {
            method: "POST",
            body: JSON.stringify({ message }),
            headers: {
                "Content-Type": "application/json"
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
            <h2>Got an idea?</h2>
            <p>
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
                        <>
                            <textarea
                                className={sharedStyles.textarea}
                                placeholder="Write your post idea"
                                value={message}
                                onChange={handleMessage}
                            />
                            <button
                                className={sharedStyles.buttonSubmit}
                                onClick={submitForm}
                                type="submit"
                            />
                        </>
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
            <h2 className={sharedStyles.subtitle}>Categories</h2>
            <ul>
                {props.categories.map(category => (
                    <li>Hola</li>
                ))}
            </ul>
        </div>
    )
}

interface Props {
    posts: Post[]
    pagination: Pagination
    featuredPosts: Post[]
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
                        <BlogList
                            posts={props.posts}
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

Blog.getInitialProps = async function(): Promise<Props> {
    try {
        const { docs, ...pagination } = await fetchPostsApi()
        const featuredPosts: Post[] = await fetchFeaturedPostsApi({ limit: 5 })

        return {
            posts: docs,
            pagination,
            featuredPosts
        }
    } catch (error) {
        return {
            posts: [],
            pagination: {} as Pagination,
            featuredPosts: []
        }
    }
}

export default Blog
