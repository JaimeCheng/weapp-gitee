// miniprogram/pages/repo/file.js
const REPO = require('../../api/repo.js')
const Base64 = require('../../utils/base64.js').Base64
const img = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'tiff', 'ico']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    owner: '',
    repo: '',
    sha: '',
    name: '',
    content: {},
    loading: true,
    empty: '空文件',
    type: '',
    suffix: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.query) {
      const query = JSON.parse(options.query)
      var suffix = query.name.substr(query.name.lastIndexOf('.') + 1).toLowerCase()
      this.setData({
        suffix: suffix
      })
      if (suffix === 'wxml') {
        suffix = 'html'
      }
      if (suffix === 'wxss') {
        suffix = 'css'
      }
      if (img.indexOf(suffix) > -1) {
        suffix = 'img'
      }
      this.setData({
        owner: query.owner,
        repo: query.repo,
        name: query.name,
        sha: query.sha,
        type: suffix
      })
      wx.setNavigationBarTitle({
        title: query.name
      })
      this.fetchData(query)
    }
  },

  fetchData: function (query) {
    REPO.getRepoBlob(query).then(res => {
      var content = Base64.decode(res.content)
      if (this.data.type !== 'md' && this.data.type !== 'img') {
        content = '```' + this.data.type + '\n' + content + '\n```'
      }
      if (this.data.type === 'img') {
        content = 'data:image/png;base64,' + res.content
      }
      if (this.data.type === 'svg') {
        content = 'data:image/svg+xml;base64,' + res.content
      }
      this.setData({
        currThis: this,
        content: content,
        loading: false,
      })
    }).catch(err => {
      console.log(err)
      this.setData({
        loading: false
      })
    })
  },

  toPreview: function (e) {
    if (this.data.type === 'img') {
      const img = e.currentTarget.dataset.img
      wx.previewImage({
        current: img, 
        urls: [img]
      })
    }
  }

})