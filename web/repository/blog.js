const Post = require('../models/Post')

module.exports.create = function (postData) {
  const newPost = new Post(postData)
  return newPost.save()
}

module.exports.getAll = function () {
  return Post.find().sort({ created: -1 })
}

module.exports.findByPermalink = function (postPermalink) {
  return Post.findOne({
    permalink: postPermalink
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


