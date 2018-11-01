const endpointNotFound = (req, res) => {
  return res.status(404).json({
    'error': true,
    'message': 'We can not find your resource in our app. Check that the endpoints are well formatted',
    'code': 404
  })
}

module.exports.endpointNotFound = endpointNotFound

const formNotValid = (req, res) => {
  return res.status(200).json({
    'error': true,
    'message': 'Some fields in the form are not valid. Please, correct them and try again.',
    'code': 200
  })
}

module.exports.formNotValid = formNotValid

const emailNotSend = function (req, res) {
  return res.json({
    'error': true,
    'message': 'Service is currently not available and we couldn\'t send your email',
    'code': 503
  })
}

module.exports.emailNotSend = emailNotSend
