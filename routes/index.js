var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/about');
  // res.render('about', {
  //   title: 'Jorge Ferreiro',
  //   path: 'index'
  // });
});

router.get('/about', function(req, res, next) {
  res.render('about', {
    title: 'About me',
    path: 'about'
  });
});

module.exports = router;
