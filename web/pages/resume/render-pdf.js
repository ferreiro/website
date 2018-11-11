import fs from 'fs'

export const renderPdf = (filePath, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.render('views/error.pug', {
                title: 'Sorry. Can\'t load the pdf now... ' + err,
                specialMessage: 'There was a problem while loading this pdf. Please, <strong>send me an email</strong> and I\'ll send you the PDF and review the bug: jorge@ferreiro.me',
                error: {}
            })
        }

        res.contentType('application/pdf')
        return res.send(data)
    })
}
