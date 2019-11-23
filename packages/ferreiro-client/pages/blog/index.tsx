import React from "react"
import { cx } from "emotion"
import { Fragment, useState, useEffect } from "react"
import Link from "next/link"
import isEmpty from "lodash/isEmpty"
import fetch from "isomorphic-unfetch"

import { Layout } from "../../components/Layout"
import { Tabs } from "../../components/Tabs"
import { sharedStyles } from "../../components/config"

import { fetchFeaturedPostsApi, fetchPostsApi } from "../../api/blog"
import { createPostUrl } from "../../utils/create-post-url"

import { Pagination, PaginatedResponse } from "../../types/PaginatedResponse"
import { Post } from "../../types/Post"

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
                    <p>Published {post.createdAt}</p>
                </a>
            </Link>
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
            fetchFeaturedPostsApi()
                .then((posts: Post[]) => {
                    console.log({ posts })
                    setFeaturedPosts(posts)
                })
                .catch(error => {
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
            <h2 className={sharedStyles.subtitle}>Top articles</h2>

            {isLoading ? (
                <p>Loading top articles</p>
            ) : (
                <ul>
                    {posts.map((post: Post) => (
                        <li key={post.permalink}>
                            <Link href={createPostUrl(post.permalink)}>
                                <a>
                                    <h3>{post.title}</h3>
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

interface Props {
    posts: Post[]
    pagination: Pagination
    featuredPosts: Post[]
}

export function Blog(props: Props) {
    // TOOD: Move to config?
    const tabs = [
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

            <Tabs activePath="/blog" tabs={tabs} />

            <div className={sharedStyles.marginTop(8)}>
                <div className={sharedStyles.row}>
                    <div className={sharedStyles.col_8}>
                        <BlogList
                            posts={props.posts}
                            pagination={props.pagination}
                        />
                    </div>
                    <div className={sharedStyles.col_4}>
                        <div className={sharedStyles.marginLeft(6)}>
                            <BlogTopArticles posts={props.featuredPosts} />
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
        const featuredPosts: Post[] = await fetchFeaturedPostsApi()

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
