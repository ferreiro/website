export const getVideos = (req, res) => {
    return res.render('pages/../UIComponents/layout.react.pug', {
        path: 'videos',
        title: 'Videos  - Jorge Ferreiro',
    })
}
