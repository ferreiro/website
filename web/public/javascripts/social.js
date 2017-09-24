var githubRepostiries = $('#githubRespositories')

function updateGithubRepositories() {
  var apiEndPoint = '/social/github'

  $.ajax({
    url: apiEndPoint,
    type: 'GET',
    dataType: 'json',
    encode: true
  })
  .done(function(apiObject) {
    var public_repos = apiObject.public_repos
    githubRepostiries.html(public_repos) // Update github repositories
  })
  .fail(function(apiObject) {
    console.log('footer.js > Fail to load number of repositories')
  })
  .always(function(apiObject) {
  })
}

updateGithubRepositories()
