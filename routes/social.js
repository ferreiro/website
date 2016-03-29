var express = require('express');
var request = require("request");
var GitHubApi = require("github");
var router = express.Router();

router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.json({
      data: getGithubUser() // We return form object we created before
  });
});

module.exports = router;

function getGithubUser() {
  var github = new GitHubApi({
      // required
      version: "3.0.0",
      // optional
      debug: true,
      protocol: "https",
      host: "ferreiro.me", // should be api.github.com for GitHub
      pathPrefix: "/api/v3", // for some GHEs; none for GitHub
      timeout: 5000,
      headers: {
          "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
      }
  });

  github.user.getFollowingFromUser({
      // optional:
      // headers: {
      //     "cookie": "blahblah"
      // },
      user: "ferreiro"
  }, function(err, res) {
      console.log(JSON.stringify(res));
      return JSON.stringify(res);
  });
}

//
// /*
//   Calling Github API and get total number of open
//   repositories I have hosted on my account
// */
// function githubNumRepositories(profile) {
//   var total_repositories = 0;
//   var url = "https://api.github.com/users/" + profile;
//
//   console.log(url);
//   request({
//       url: url,
//       json: true
//   }, function (error, response, body) {
//       if (!error && response.statusCode === 200) {
//           total_repositories = body.public_repos;
//           console.log("body.public_repos " + total_repositories); // Print the json response
//           console.log("The respond is " + body); // Print the json response
//       }
//       return total_repositories;
//   });
//   return total_repositories;
// }
