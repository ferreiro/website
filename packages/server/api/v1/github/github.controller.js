import request from 'request'

const GITHUB_USERNAME = 'ferreiro'
const GITHUB_ENDPOINT = 'https://api.github.com'
const GITHUB_PROFILE_MAX_CACHE_TIME = 24 * 3600

const fetchGithubProfile = async () => {
  const url = `${GITHUB_ENDPOINT}/users/${GITHUB_USERNAME}`
  const timeoutInMilliseconds = (10*1000)
  const opts = {
    url,
    headers: {
      'User-Agent': 'request'
    },
    timeout: timeoutInMilliseconds
  }

  return new Promise((resolve, reject) => {
    request(opts, function (err, response, user) {
      if (err) {
        return reject(err)
      }
    
      const parsedUser = JSON.parse(user)

      return resolve(parsedUser)
    })
  })
}

export const getGithubProfile = async (req, res, next) => {
  const githubProfile = await fetchGithubProfile();

  res.set('Cache-Control', `max-age=${GITHUB_PROFILE_MAX_CACHE_TIME}`)
  res.json(githubProfile)
}

export const getGithubPublicRepositories = async (req, res, next) => {
  const githubProfile = await fetchGithubProfile();
  const publicRepositories = githubProfile['public_repos'] || null;

  res.set('Cache-Control', `max-age=${GITHUB_PROFILE_MAX_CACHE_TIME}`)
  res.json({
    "public_repos": publicRepositories // We return form object we created before
  })
}