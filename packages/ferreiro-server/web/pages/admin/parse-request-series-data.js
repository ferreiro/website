export const parseRequestSeriesData = (req) => {
    const data = req.body
  
    const pic = data.series_pic
    const title = data.series_title
    const favicon = data.series_favicon
    const permalink = data.series_permalink
    const description = data.series_description
    const published = data.series_isPublished && data.series_isPublished === 'on'
    const secretKey = data.series_secretKey
  
    return {
        pic,
        title,
        favicon,
        permalink,
        description,
        published,
        secretKey
    }
}
  