var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('projects', {
    title: 'Projects &amp; Works',
    path: 'projects'
  });
});

/* GET users listing. */
router.get('/dotfiles', function(req, res, next) {
  res.send('Dotfiles project page');
});

module.exports = router;
