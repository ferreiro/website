var express = require('express');
var content = require('../public/content/english.json'); // TODO: Add multilanguage
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('projects', {
    title: 'Projects &amp; Works',
    path: 'projects',
    content: content.projects
  });
});

router.get('/dotfiles', function(req, res, next) {
  res.send('Dotfiles project page');
});

module.exports = router;
