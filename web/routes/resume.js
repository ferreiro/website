const fs = require('fs')
const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  var filePath = __dirname + '/../public/dst/pdf/13_july_2017_final.pdf'

  if (req.query.download) {
    return res.download(filePath)
  }

  renderResume(filePath, res)
})

function renderResume (filePath, res) {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      return res.render('error', {
        title: 'Sorry. Can\'t load the pdf now...',
        specialMessage: 'There was a problem while loading this pdf. Please, <strong>send me an email</strong> and I\'ll send you the PDF and review the bug: jorge@ferreiro.me',
        error: {}
      })
    }

    res.contentType('application/pdf')
    res.send(data)
  })
}



module.exports = router
