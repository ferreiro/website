var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('projects', { title: 'About Jorge Ferreiro - Full Stack Developer' });
});

/* GET users listing. */
router.get('/dotfiles', function(req, res, next) {
  res.send('Dotfiles project page');
});

module.exports = router;
