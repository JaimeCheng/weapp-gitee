//index.js
//获取应用实例
const app = getApp()

const USER = require('../../api/user.js')
const Base64 = require('../../utils/base64.js').Base64

Page({
  data: {
    readme: '',
    currThis: {},
    host: '',
    loading: true
  },

  onLoad: function () {
    USER.demo('/JaimeCheng/e-signature').then(res => {
      console.log(res)
      this.setData({
        host: res.download_url.substring(0, res.download_url.lastIndexOf('/') + 1),
        currThis: this,
        readme: Base64.decode(res.content)
      }) 
      this.setData({
        loading: false
      })
    }).catch(err => {})
  }
})
