// miniprogram/pages/repo/file.js
const REPO = require('../../api/repo.js')
const Base64 = require('../../utils/base64.js').Base64
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
    empty: '空文件'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.query) {
      const query = JSON.parse(options.query)
      this.setData({
        owner: query.owner,
        repo: query.repo,
        name: query.name,
        sha: query.sha
      })
      wx.setNavigationBarTitle({
        title: query.name
      })
      this.fetchData(query)
    }
  },

  fetchData: function (query) {
    REPO.getRepoBlob(query).then(res => {
      this.setData({
        currThis: this,
        content: Base64.decode(res.content),
        loading: false,
      })
    }).catch(err => {
      console.log(err)
      this.setData({
        loading: false
      })
    })
  }

})