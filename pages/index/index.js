//index.js
//获取应用实例
const app = getApp()

const USER = require('../../api/user.js')
const Base64 = require('../../utils/base64.js').Base64

Page({
  data: {
    readme: '',
    currThis: {}
  },

  onLoad: function () {
    USER.demo('/JaimeCheng/e-signature').then(res => {
      console.log(res) 
      this.setData({
        currThis: this,
        readme: Base64.decode(res.content)
      }) 
    }).catch(err => {})
  }
})
