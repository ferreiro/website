import fetch from "isomorphic-unfetch"

import { Post } from "../types/Post"
import { PaginatedResponse, Pagination } from "../types/PaginatedResponse"
import { Serie } from "../types/Serie"

export async function fetchPostsApi(options: {
    page?: number
}): Promise<PaginatedResponse<Post>> {
    return fetch(`http://localhost:4000/api/v1/blog/?page=${options.page}`)
        .then((response: Response) => response.json())
        .then((paginatedResponse: PaginatedResponse<Post>) => {
            const {
                docs,
                ...pagination
            }: PaginatedResponse<Post> = paginatedResponse

            return {
                docs: transformPosts(docs),
                ...transformPagination(pagination)
            }
        })
        .catch(error => error)
}

export async function fetchFeaturedPostsApi(options: {
    limit?: number
}): Promise<Post[]> {
    const limit = options.limit

    return fetch(`http://localhost:4000/api/v1/blog/featured?limit=${limit}`)
        .then(r => r.json())
        .then((posts: Object[]) => transformPosts(posts))
        .catch(error => error)
}

export interface FetchSerieResponse {
    serie: Serie
    posts: Post[]
}

export async function fetchSerieApi(options: {
    permalink: string
}): Promise<FetchSerieResponse> {
    return fetch(
        `http://localhost:4000/api/v1/blog/series/${options.permalink}`
    )
        .then(r => r.json())
        .then((response: any) => ({
            serie: response.serie as Serie,
            posts: response.posts as Post[]
        }))
        .catch(error => error)
}

function transformPosts(posts: object[]): Post[] {
    return posts.map(transformPost)
}

function transformPost(post: object): Post {
    return post as Post
}

function transformPagination(pagination: any): Pagination {
    return {
        total: parseInt(pagination.total),
        limit: parseInt(pagination.limit),
        page: parseInt(pagination.page),
        pages: parseInt(pagination.pages)
    }
}
