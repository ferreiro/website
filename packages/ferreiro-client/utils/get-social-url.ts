export function getLinkedinShareableUrl(props: {
    mini: string
    // Note: It must be a fully qualified URL (including https://)
    url: string
    summary: string
    title: string
}) {
    return `https://www.linkedin.com/shareArticle?mini=${props.mini}&url=${props.url}&title=${props.title}&summary=${props.summary}&source=LinkedIn`
}

export function getTwitterShareableUrl(props: {
    mini: string
    // Note: It must be a fully qualified URL (including https://)
    url: string
    summary: string
    title: string
}) {
    return `https://twitter.com/share?text=${props.title}&via=jgferreiro&url=${props.url}`
}
