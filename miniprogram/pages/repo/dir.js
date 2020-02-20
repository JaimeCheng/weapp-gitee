// miniprogram/pages/repo/dir.js
const REPO = require('../../api/repo.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    owner: '',
    repo: '',
    sha: '',
    name: '',
    root: {},
    loading: true
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
    REPO.getRepoTree(query).then(res => {
      this.setData({
        root: res,
        loading: false,
      })
    }).catch(err => {
      console.log(err)
      this.setData({
        loading: false
      })
    })
  },

  toView: function (e) {
    const query = {
      owner: this.data.owner,
      repo: this.data.repo,
      name: e.currentTarget.dataset.path,
      sha: e.currentTarget.dataset.sha
    }
    if (e.currentTarget.dataset.type === 'tree') {
      wx.navigateTo({
        url: `../repo/dir?query=${JSON.stringify(query)}`
      })
    } else {
      wx.navigateTo({
        url: `../repo/file?query=${JSON.stringify(query)}`
      })
    }
  },
})