import {createViewPath} from '../create-view-path'
import {parseRequestSeriesData} from './parse-request-series-data'
import seriesRepository from '../../../api/repository/series'

/**
 * Return all the available series
 */
export const getAllSeries = (req, res) => {
    seriesRepository.getAll()
        .then(series => {
            res.render(createViewPath('admin', 'views/series.home.pug'), {
                series
            })
        })
        .catch(error => res.render('views/error', { error }))
}

export const createSeriesPage = (_, res) => (
    res.render(createViewPath('admin', 'views/series.create.pug'))
)

/**
 * Creates a new series of articles
 */
export const createSeries = (req, res) => {
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

    seriesRepository
        .findAndDeleteByPermalink(postPermalink)
        .then(() => res.redirect('/admin/series'))
        .catch(() => {
            return res.render(createViewPath('admin', 'views/series.home.pug'), {
                error: 'Failed to update post.'
            })
        })
}

export const editPostPage = (req, res) => {
    const permalink = req.params.permalink

    seriesRepository
        .findByPermalink({permalink})
        .then(series => {
            return res.render(createViewPath('admin', 'views/series.create.pug'), {
                edit: true,
                series: series,
                admin: true
            })
        })
        .catch(() => {
            return res.render(createViewPath('admin', 'views/series.home.pug'), {
                error: 'Failed to create new post.'
            })
        })
}

export const editPostSubmit = (req, res) => {
    const postPermalink = req.params.permalink
    const seriesData = parseRequestSeriesData(req)

    seriesRepository
        .findAndUpdateByPermalink(postPermalink, seriesData)
        .then(post => {
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
