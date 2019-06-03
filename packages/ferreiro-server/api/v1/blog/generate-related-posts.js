import blogRepository from '../../repository/blog'

export const generateRelatedPosts = (opts) => (
    new Promise((resolve, reject) => (
        blogRepository
            .getRandomPosts(opts)
            .then(posts => resolve(posts)
            .catch((error) => reject(error))
    )))
)
