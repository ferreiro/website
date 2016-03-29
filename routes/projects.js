var express = require('express');
var content = require('../public/content/english.json'); // TODO: Add multilanguage
var router = express.Router();

router.get('/', projects);

// router.get('/dotfiles', function(req, res, next) {
//   res.send('Dotfiles project page');
// });

function projects(req, res, next) {
  res.render('projects', {
    title: 'Projects &amp; Works',
    path: 'projects',
    content: content.projects
  });
}

module.exports = router;
