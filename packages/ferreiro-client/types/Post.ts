export interface PostSeries {}

export interface Post {
    id: string
    title: string
    pic: string
    createdAt: string
    updatedAt: string
    secretKey: string
    permalink: string
    authorName: string
    authorPic: string
    summary: string
    body: string
    category: string[]
    tags: string[]
    published: boolean
    likes: number
    views: number
    series: PostSeries
}
