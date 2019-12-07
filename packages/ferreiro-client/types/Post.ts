export interface Config {
    order: string[]
    modules: object
}

// {
//     [key: string]: object
// }
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
    config?: Config
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

export enum PostLayoutType {
    // It uses the same container as the post text
    inline = "inline",

    // Extends the content to be full size
    full = "full",

    // Makes the content standout having a bigger container than the post
    highlight = "highlight"
}

export enum PostModuleTypes {
    ad = "ad",
    embed = "embed",
    image = "image",
    link = "link",
    quote = "quote",
    separator = "separator",
    series = "series",
    summary = "summary",
    text = "text",
    video = "video",
    socialNetworks = "social-networks"
}
