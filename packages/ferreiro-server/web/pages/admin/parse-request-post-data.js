const mongoose = require('mongoose')
const {isEmpty} = require('lodash')
const {sanitizeHtml} = require('../sanitize-html')

export const parseRequestPostData = ({
    post_title,
    post_pic,
    post_secretKey,
    post_permalink,
    post_author_name,
    post_author_pic,
    post_summary,
    post_body,
    post_isPublished,
    post_category = [],
    post_seriesId = null,
}) => {
    const title = post_title
    const pic = post_pic
    const secretKey = post_secretKey
    const permalink = post_permalink
    const authorName = post_author_name
    const authorPic = post_author_pic
    const summary = post_summary
    const published = post_isPublished
    const category = post_category
    const seriesId = post_seriesId
  
    return {
        pic,
        title,
        secretKey,
        summary,
        permalink,
        published,
        category,
        author_name: authorName,
        author_pic: authorPic,
        body: sanitizeHtml(post_body),
        series: isEmpty(post_seriesId) ? null : new mongoose.mongo.ObjectId(seriesId)
    }
}
  