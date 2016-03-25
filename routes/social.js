var express = require('express');
var request = require("request");
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('social');
});

/*
  Calling Github API and get total number of open
  repositories I have hosted on my account
*/
function githubNumRepositories(profile) {
  var total_repositories = 0;
  var url = "https://api.github.com/users/" + profile;

  console.log(url);
  request({
      url: url,
      json: true
  }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
          total_repositories = body.public_repos;
          console.log("body.public_repos " + total_repositories); // Print the json response
          console.log("The respond is " + body); // Print the json response
      }
      return total_repositories;
  });
  return total_repositories;
}

module.exports = router;
