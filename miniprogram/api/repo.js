const request = require('../utils/request.js')

const trending = params => {
  return request({
    url: 'https://www.oczm.top/weapp-api/home/gitee/trending',
    method: 'GET',
    data: params
  })
}

module.exports = {
  trending
}