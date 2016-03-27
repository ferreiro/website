var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  var content = require('../public/content/english.json'); // TODO: Add multilanguage
  res.render('projects', {
    title: 'Projects &amp; Works',
    path: 'projects',
    content: content.projects
  });
});

/* GET users listing. */
router.get('/dotfiles', function(req, res, next) {
  res.send('Dotfiles project page');
});

module.exports = router;
