//- updateGithubRepositories()

function updateGithubRepositories() {
  const githubRepositories = $('#githubRespositories')

  const apiEndPoint = '/social/github'
  $.ajax({
    url: apiEndPoint,
    type: 'GET',
    dataType: 'json',
    encode: true
  })
  .done(function(apiObject) {
    const publicRepositoriesCount = apiObject.public_repos
    githubRepositories.html(publicRepositoriesCount) // Update github repositories
  })
  .fail(function(apiObject) {
    console.log('footer.js > Fail to load number of repositories')
  })
  .always(function(apiObject) {
  })
}
