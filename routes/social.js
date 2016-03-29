var express = require('express');
var request = require("request");
var GitHubApi = require("github");
var router = express.Router();

router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.json({
      data: githubNumRepositories('ferreiro') // We return form object we created before
  });
});

module.exports = router;

//
// function github(req, res, next) {
//   var name = 'ferreiro';
//   var url = "https://api.github.com/users/" + name;
//   var timeoutInMilliseconds = 10*1000;
//
//   var opts = {
//     url: url,
//     headers: {
//       'User-Agent': 'request'
//     },
//     timeout: timeoutInMilliseconds
//   };
//
//   res.setHeader('Content-Type', 'application/json');
//
//   request(opts, function (err, response, user) {
//
//     user = JSON.parse(user); // Important -->
//
//     if (err) {
//       res.json({
//           "public_repos": -1
//       });
//     }
//     res.json({
//         "public_repos": user.public_repos // We return form object we created before
//     });
//     // var statusCode = res.statusCode
//   };

// router.get('/github', function(req, res, next) {
//     var name = 'ferreiro';
//     var url = "https://api.github.com/users/" + name;
//     var timeoutInMilliseconds = 10*1000;
//
//     var opts = {
//       url: url,
//       headers: {
//         'User-Agent': 'request'
//       },
//       timeout: timeoutInMilliseconds
//     };
//
//     res.setHeader('Content-Type', 'application/json');
//
//     request(opts, function (err, response, user) {
//
//       user = JSON.parse(user); // Important -->
//
//       if (err) {
//         res.json({
//             "public_repos": -1
//         });
//       }
//
//
//       res.json({
//           "public_repos": user.public_repos // We return form object we created before
//       });
//       // var statusCode = res.statusCode
//
//
//
//     });
// });


//
// router.get('/github/repositories', function(req, res, next) {
//   var name = 'name';
//   var user = getGithubUser(name);
//   var totalRepositories = -1;
//
//   console.log(user);
//
//   if (user.public_repos) {
//     totalRepositories = user.public_repos;
//   }
//
//   res.setHeader('Content-Type', 'application/json');
//   res.json({
//       "public_repos": totalRepositories // We return form object we created before
//   });
// });
//
// module.exports = router;
//
// function getGithubUser(name) {
//   var user = {};
//   var url = "https://api.github.com/users/" + name;
//   var timeoutInMilliseconds = 10*1000;
//
//   var opts = {
//     url: url,
//     headers: {
//       'User-Agent': 'request'
//     },
//     timeout: timeoutInMilliseconds
//   };
//
//   request(opts, function (err, res, user) {
//     console.log(err);
//     if (err) {
//       console.dir(err);
//       return {};
//     }
//     // var statusCode = res.statusCode
//     return user;
//   });
// }
