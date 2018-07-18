const _ = require('underscore')
const Series = require('../models/Series')
const blogRepository = require('./blog')

module.exports.getAll = function () {
  return Series.find().sort({ createdAt: -1 })
}

module.exports.create = function (data) {
  const newSeries = new Series(data)
  return newSeries.save()
}

/**
 * Returns a Series with its metadata and the related posts
 * @param query
 */
module.exports.findByPermalink = function (query) {
  const seriesQuery = {
    permalink: query.permalink
  }

  return new Promise((resolve, reject) => {
    Series.findOne(seriesQuery).exec(function (err, series) {
      if (err) {
        return Promise.reject(err)
      }

      return fetchPostSeries(series._id)
        .then(seriesPosts => {
          let combinedResponse = _.clone(series)['_doc']
          combinedResponse['posts'] = seriesPosts

          return resolve(combinedResponse)
        })
        .catch(error => reject(error))
    })
  })
}

module.exports.findAndUpdateByPermalink = function (postPermalink, seriesData) {
  const query = {
    permalink: postPermalink
  }

  return Series.findOneAndUpdate(query, seriesData, { new: true })
}

module.exports.findAndDeleteByPermalink = function (postPermalink) {
  const query = {
    permalink: postPermalink
  }

  return Series.findOneAndRemove(query)
}

// Given a series _id, returns the list of post associated that belongs to that series.
function fetchPostSeries (seriesId) {
  return blogRepository.findSeries(seriesId)
}
