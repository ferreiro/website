const Post = require('../models/Post')

module.exports.create = function (postData) {
  const newPost = new Post(postData)
  return newPost.save()
}

// https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
module.exports.getMostRecentPosts = function (opts) {
  const limit = opts.limit || 3
  const postPermalinkToSkip = opts.postPermalinkToSkip || ''

  const query = {
    created: { $lte: new Date() },
    published: true
  }
  return Post.find(query)
    .limit(limit)
    .sort({ created: 1 })
}

module.exports.getRandomPosts = function (opts) {
  const limit = opts.limit || 4
  const postPermalinkToSkip = opts.postPermalinkToSkip || ''

  return new Promise((resolve, reject) => {
    const filter = {
      published: true,
      permalink: { $ne: postPermalinkToSkip }
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


module.exports.getAllPublished = function (options) {
  return Post.find({
    'published': true
  }).sort({ created: 1 })
}

module.exports.getAllDrafts = function (options) {
  return Post.find({
    'published': false
  }).sort({ created: 1 })
}

module.exports.getAll = function () {
  return Post.find().sort({ created: 1 })
}

module.exports.findByPermalink = function (query) {
  return Post.findOne({
    permalink: query.permalink
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


