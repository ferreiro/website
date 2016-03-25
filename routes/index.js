var express = require('express');
var request = require("request");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  repositories = githubNumRepositories('ferreiro')
  console.log(repositories);
  res.render('about', {
    title: 'Jorge Ferreiro',
    path: 'index',
    repositories: repositories
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


function githubNumRepositories(profile) {
  var total_repositories = 0;
  var url = "https://api.github.com/users/" + profile;

  console.log(url)
  request({
      url: url,
      json: true
  }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
          total_repositories = body.public_repos
          console.log("body.public_repos " + total_repositories) // Print the json response
          console.log("The respond is " + body) // Print the json response
      }
      return total_repositories;
  })
  return total_repositories;
}


module.exports = router;
