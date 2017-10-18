var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/github', githubFollowers);

module.exports = router;

///////////////////
//// FUNCTIONS ////
///////////////////

function githubFollowers(req, res, next) {
  var username = 'ferreiro'
  var url = 'https://api.github.com/users/' + username
  var timeoutInMilliseconds = (10*1000)
  var opts = {
    url: url,
    headers: {
      'User-Agent': 'request'
    },
    timeout: timeoutInMilliseconds
  }

  request(opts, function (err, response, user) {
    var public_repos = null

    if (!err) {
      var user = JSON.parse(user)
      public_repos = user.public_repos
    }

    res.set('Cache-Control', 'max-age=' + 24 * 3600)
    res.json({
      "public_repos": public_repos // We return form object we created before
    })
  })
}
