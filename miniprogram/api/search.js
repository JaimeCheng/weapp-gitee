const request = require('../utils/request.js')

const searchRepo = params => {
  return request({
    url: '/v5/search/repositories',
    method: 'GET',
    data: params
  })
}

const searchUser = params => {
  return request({
    url: `/v5/search/users`,
    method: 'GET',
    data: params
  })
}

module.exports = {
  searchRepo,
  searchUser
}