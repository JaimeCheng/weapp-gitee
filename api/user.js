const request = require('../utils/request.js')

const login = params => {
  return request({
    url: 'Gitee/login',
    method: 'POST',
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
  demo
}