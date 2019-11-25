export interface PostSeries {
    _id: string
    updatedAt: string
    createdAt: string
    title: string
    permalink: string
    secretKey: string
    published: boolean
    description: string
    favicon: string
    pic: string
}

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
