const express = require('express')
const router = express.Router()

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const env = require('../../../env')
const bucketName = env.S3_BUCKET

aws.config.update({
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  region: env.S3_REGION
});

const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: bucketName,
      acl: 'public-read',
      key: function (req, file, cb) {
          console.log(file);
          cb(null, file.originalname); //use Date.now() for unique file keys
      }
  })
});

router.get('/', (req, res, next) => {
  res.send('Upload your files')
})

router.post('/', upload.array('image', 1), function (req, res, next) {
  console.log('Submitting')
  console.log('reqFiles', req.files)
  if (req.files.length > 0 ) {
    const location = req.files[0].location
    console.log('location', location);
    var html = `<h1>File uploaded!</h1>`
    var html = `<a href="/form">Upload new</a>`
    html += `<p>${location}</p>`
    html += `<img src="${location}" />`
    console.log(html)
    // res.send(html)
    return res.json({
      permalink: location
    })
  } else {
    return res.json({
      error: 'Can\'t upload!'
    })
  }
});

module.exports = router
