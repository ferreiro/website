// updateGithubRepositories()

function updateGithubRepositories() {
  const githubRepositoriesSelector = $('#githubRespositories')
  const apiEndPoint = '/api/v1/github/public_repositories'

  $.ajax({
    url: apiEndPoint,
    type: 'GET',
    dataType: 'json',
    encode: true
  })
  .done((response) => {
    const {public_repos} = response;

    githubRepositoriesSelector.html(public_repos) // Update github repositories
  })
  .fail((error) => {
    console.log('footer.js > Fail to load number of repositories')
  })
  .always((apiObject) => {
  })
}
