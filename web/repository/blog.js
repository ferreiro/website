const Post = require('../models/Post')

module.exports.create = function (postData) {
  const newPost = new Post(postData)
  return newPost.save()
}

module.exports.findByPermalink = function (query) {
  return Post.findOne({
    permalink: query.permalink
  })
}

module.exports.findById = function findById (query) {
  return Post.findOne({
    _id: query.id
  })
}

module.exports.findAndUpdateByPermalink = function (postPermalink, postData) {
  return Post.findOneAndUpdate({
    permalink: postPermalink
  },postData, { new: true })
}

module.exports.findAndDeleteByPermalink = function (postPermalink) {
  return Post.findOneAndRemove({
    permalink: postPermalink
  })
}

module.exports.getAll = function () {
  return Post.find()
    .sort({ createdAt: -1 })
}

module.exports.getAllDrafts = function (options) {
  return Post.find({
    'published': false
  }).sort({ createdAt: -1 })
}

module.exports.getAllPublished = async function (opts) {
  var maxLimit = 10

  if (opts) {
    if (opts.maxPagePosts) {
      const newLimit = opts.maxPagePosts
      maxLimit = newLimit < maxLimit ? newLimit : maxLimit
    }
  }

  const query = {
    'published': true
  }
  const options = {
    sort: { createdAt: -1 },
    lean: true,
    page: opts.nextPage || 1,
    limit: maxLimit
  }
  return Post.paginate(query, options)
}

// https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
module.exports.getMostRecentPosts = function (opts) {
  const limit = opts.limit || 3

  const query = {
    createdAt: { $lte: new Date() },
    published: true
  }
  return Post.find(query)
    .limit(limit)
    .sort({ createdAt: -1 })
}

module.exports.getRandomPosts = function (opts) {
  const limit = opts.limit || 3
  const permalinkToSkip = opts.permalinkToSkip || ''

  return new Promise((resolve, reject) => {
    const filter = {
      published: true,
      permalink: {
        $ne: permalinkToSkip
      }
    }
    const fields = {}
    const options = {
      limit: limit
    }
    Post.findRandom(filter, fields, options, (err, posts) => {
      if (err) {
        return reject(err)
      }
      return resolve(posts)
    })
  })
}
