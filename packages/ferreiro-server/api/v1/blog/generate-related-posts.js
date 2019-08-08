import blogRepository from '../../repository/blog'

export const generateRelatedPosts = (opts) => (
    blogRepository
        .getRandomPosts(opts)
)
