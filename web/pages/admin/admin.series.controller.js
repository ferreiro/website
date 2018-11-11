import seriesRepository from '../../repository/series'
import {parseRequestSeriesData} from './parse-request-series-data'

/**
 * Return all the available series
 */
export const getAllSeries = (req, res) => {
  seriesRepository.getAll()
    .then(series => {
      res.render('admin/series/home', {
        series
      })
    })
    .catch(error => res.render('error', { error }))
}

export const createSeriesPage = (req, res) => {
  res.render('admin/series/create')
}

/**
 * Creates a new series of articles
 */
export const createSeries = (req, res) => {
  const data = req.body
  const seriesData = parseRequestSeriesData(req)

  seriesRepository.create(seriesData)
    .then(series => res.json({
      post: series,
      success: 'Series created!'
    }))
    .catch(error => res.json({
      error: 'Failed to create new post.<br />' + error
    }))
}

export const deleteSeriesConfirmationPage = (req, res) => {
  const postPermalink = req.params.permalink
  res.send('Are you sure you want to delete the post?<br /><a href="/admin/series">Cancel</a> | <a href="/admin/series/delete/' + postPermalink + '/confirm">Yes. I know this action can not be undo</a>')
}

/**
 * Deletes a new Series
 */
export const deleteSeries = (req, res) => {
  const postPermalink = req.params.permalink

  seriesRepository.findAndDeleteByPermalink(postPermalink)
    .then(post => res.redirect('/admin/series'))
    .catch((err) => {
      return res.render('admin/series/home', {
        error: 'Failed to update post.'
      })
    })
}

export const editPostPage = (req, res) => {
  const postPermalink = req.params.permalink

  seriesRepository.findByPermalink({
    permalink: postPermalink
  }).then(series => {
    return res.render('admin/series/create', {
      edit: true,
      series: series,
      admin: true
    })
  }).catch((err) => {
    return res.render('admin/series/home', {
      error: 'Failed to create new post.'
    })
  })
}

export const editPostSubmit = (req, res) => {
  const postPermalink = req.params.permalink
  const seriesData = parseRequestSeriesData(req)

  seriesRepository.findAndUpdateByPermalink(postPermalink, seriesData).then(post => {
    return res.json({
      post: post
    })
  }).catch((err) => {
    console.log(err)
    return res.json({
      error: 'Failed to update post.'
    })
  })
}
