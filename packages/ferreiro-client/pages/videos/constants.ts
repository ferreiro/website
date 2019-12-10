export const VIDEOS_TALKS_URL = "/videos/category/talks"
export const VIDEOS_DEVS_IN_DEPTH_URL = "/videos/category/developersindepth"

export const VIDEOS_TABS = [
    {
        as: "/videos",
        display: "All",
        path: "/videos",
        type: "Page.blog"
    },
    {
        as: VIDEOS_DEVS_IN_DEPTH_URL,
        display: "Developers In Depth",
        path: "/videos/category/developersindepth",
        type: "Page.blog"
    },
    {
        as: VIDEOS_TALKS_URL,
        display: "Talks",
        path: "/videos/category/talks",
        type: "Page.blog"
    }
]
