import fetch from "isomorphic-unfetch"

import { Post } from "../types/Post"
import { PaginatedResponse } from "../types/PaginatedResponse"

export async function fetchPostsApi(): Promise<PaginatedResponse<Post>> {
    return fetch("http://localhost:4000/api/v1/blog/")
        .then((response: Response) => response.json())
        .then((paginatedResponse: PaginatedResponse<Post>) => {
            const {
                docs,
                ...pagination
            }: PaginatedResponse<Post> = paginatedResponse

            return {
                docs: transformPosts(docs),
                ...pagination
            }
        })
        .catch(error => error)
}

export async function fetchFeaturedPostsApi(query: {
    limit?: number
}): Promise<Post[]> {
    const limit = query.limit

    return fetch(`http://localhost:4000/api/v1/blog/featured?limit=${limit}`)
        .then(r => r.json())
        .then((posts: Object[]) => transformPosts(posts))
        .catch(error => error)
}

function transformPosts(posts: object[]): Post[] {
    return posts.map(transformPost)
}

function transformPost(post: object): Post {
    return post as Post
}
