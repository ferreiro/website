var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about', {
    title: 'Jorge Ferreiro',
    path: 'index'
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', {
    title: 'About Jorge Ferreiro - Full Stack Developer',
    path: 'about'
  });
});

router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
