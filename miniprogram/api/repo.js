const request = require('../utils/request.js')

const getMyRepos = params => {
  return request({
    url: '/v5/user/repos',
    method: 'GET',
    data: params
  })
}

const getUserRepos = params => {
  return request({
    url: `/v5/users/${params.username}/repos`,
    method: 'GET',
    data: params
  })
}

const getUserStars = params => {
  return request({
    url: `/v5/users/${params.username}/starred`,
    method: 'GET',
    data: params
  })
}

module.exports = {
  getMyRepos,
  getUserRepos,
  getUserStars
}