var express = require('express');
var content = require('../public/content/english.json'); // TODO: Add multilanguage
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.redirect('/about');
  res.render('about', {
    title: 'Jorge Ferreiro',
    path: 'index'
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', {
    title: 'About me',
    path: 'about'
  });
});

router.get('/university', function(req, res, next) {
  res.render('university', {
    title: 'University curriculum',
    path: 'university',
    content: content.university
  });
});

module.exports = router;
