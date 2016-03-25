var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Jorge Ferreiro - Full Stack Developer' });
});

router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
