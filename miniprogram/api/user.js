const request = require('../utils/request.js')

const login = params => {
  return request({
    url: 'https://gitee.com/oauth/token',
    method: 'POST',
    data: params
  })
}

const getMyInfo = token => {
  return request({
    url: '/v5/user',
    method: 'GET',
    data: token
  })
}

const getUserInfo = username => {
  return request({
    url: `/v5/users/${username}`,
    method: 'GET',
    data: { username }
  })
}

const getFans = params => {
  return request({
    url: `/v5/users/${params.username}/${params.type}`,
    method: 'GET',
    data: params
  })
}

const getFollowers = params => {
  return request({
    url: `/v5/users/${params.username}/followers`,
    method: 'GET',
    data: params
  })
}

const getFollowing = params => {
  return request({
    url: `/v5/users/${params.username}/following`,
    method: 'GET',
    data: params
  })
}

const demo = path => {
  return request({
    url: `/v5/repos${path}/readme`,
    method: 'GET',
    data: {}
  })
}

module.exports = {
  login,
  getMyInfo,
  getUserInfo,
  getFans,
  getFollowers,
  getFollowing,
  demo
}