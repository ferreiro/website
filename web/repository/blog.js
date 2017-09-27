const Post = require('../models/Post')

module.exports.create = function (postData) {
  const newPost = new Post(postData)
  return newPost.save()
}

module.exports.getAllPublished = function (options) {
  return Post.find({
    'published': true
  }).sort({ created: -1 })
}

module.exports.getAll = function () {
  return Post.find().sort({ created: -1 })
}

module.exports.findByPermalink = function (query) {
  return Post.findOne({
    permalink: query.permalink
  })
}

module.exports.findAndUpdateByPermalink = function (postPermalink, postData) {
  return Post.findOneAndUpdate({
    permalink: postPermalink
  }, postData)
}

module.exports.findAndDeleteByPermalink = function (postPermalink) {
  return Post.findOneAndRemove({
    permalink: postPermalink
  })
}


