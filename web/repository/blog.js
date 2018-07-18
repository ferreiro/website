const mongoose = require('mongoose')

const Post = require('../models/Post')

module.exports.create = function (postData) {
  const newPost = new Post(postData)
  return newPost.save()
}

module.exports.findByPermalink = function (query) {
  return Post.findOne({
    permalink: query.permalink
  }).populate('series')
}

module.exports.findById = function findById (query) {
  return Post.findOne({
    _id: query.id
  }).populate('series')
}

/*
 * Given a Series Id, returns the list of Post belonging to
 * that series.
 *
 * NOTE> No necessary to populate('series'), because the information is going to be the same
 */
module.exports.findSeries = function findById (seriesId) {
  const _id = mongoose.mongo.ObjectId(seriesId)

  const query = { series: _id }
  const fieldsToExcluded = { body: 0, secretKey: 0 }

  return Post.find(query, fieldsToExcluded)
}

module.exports.findByPermalinkIncrementViews = findByPermalinkIncrementViews
function findByPermalinkIncrementViews (query) {
  const incrementViews = query && query.isAdmin ? 0 : 1

  return Post.findOneAndUpdate({
    permalink: query.permalink
  }, {
    $inc: {
      views: incrementViews
    }
  }).populate('series')
}

module.exports.incrementLike = function (query) {
  return Post.findOneAndUpdate({
    permalink: query.permalink
  }, {
    $inc: { likes: 1 }
  }).populate('series')
}

module.exports.findAndUpdateByPermalink = function (postPermalink, postData) {
  return Post.findOneAndUpdate({
    permalink: postPermalink
  },
  postData, {
      new: true
  }).populate('series')
}

module.exports.findAndDeleteByPermalink = function (postPermalink) {
  return Post.findOneAndRemove({
    permalink: postPermalink
  })
}

module.exports.getAll = function () {
  const query = {}
  const fieldsToExclude = { body: 0 }

  return Post.find(query, fieldsToExclude)
    .sort({ createdAt: -1 })
    .populate('series')
}

module.exports.getAllDrafts = function (options) {
  return Post.find({
    published: false
  }).sort({ createdAt: -1 })
    .populate('series')
}

module.exports.getAllPublished = function (extraQueryFields, opts) {
  var maxLimit = 10

  if (opts) {
    if (opts.maxPagePosts) {
      const newLimit = opts.maxPagePosts
      maxLimit = newLimit < maxLimit ? newLimit : maxLimit
    }
  }
  const options = {
    sort: {
      createdAt: -1
    },
    lean: true,
    page: opts && opts.nextPage ? opts.nextPage : 1,
    limit: maxLimit,
    populate: 'series',
    select: { body: 0 }
  }

  var query = {
    published: true
  }
  if (extraQueryFields) {
    if (extraQueryFields.category) {
      query['category'] = extraQueryFields.category
    }
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
    .populate('series')
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
    const fields = {
      body: 0 // Exclude post body to reduce size of the response
    }
    const options = {
      limit: limit,
      populate: 'series'
    }

    Post.findRandom(filter, fields, options, (err, posts) => {
      if (err) {
        return reject(err)
      }
      return resolve(posts)
    })
  })
}
