const Blog = require('../models/Post')

export const getCategories = () => {
    return Blog.find({published: true}).distinct('category');
}
