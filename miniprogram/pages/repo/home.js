// miniprogram/pages/repo/home.js
const REPO = require('../../api/repo.js')
const Base64 = require('../../utils/base64.js').Base64

Page({

  /**
   * 页面的初始数据
   */
  data: {
    owner: '',
    repo: '',
    detail: {},
    repourl: '',
    readme: '',
    loading: true,
    no: '暂无描述',
    empty: '--',
    currThis: {},
    host: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.path) {
      const path = options.path.split('/')
      this.setData({
        owner: path[0],
        repo: path[1]
      })
      const query = {
        owner: this.data.owner,
        repo: this.data.repo
      }
      this.fetchData(query)
      this.fetchReadme(query)
    }
  },

  fetchData: function (query) {
    REPO.getRepoInfo(query).then(res => {
      this.setData({
        detail: res,
        loading: false,
        repourl: `${res.namespace.html_url}/${res.path}`
      })
    }).catch(err => {
      console.log(err)
      this.setData({
        loading: false
      })
    })
  },

  fetchReadme: function (query) {
    REPO.getRepoReadme(query).then(res => {
      this.setData({
        host: res.download_url.substring(0, res.download_url.lastIndexOf('/') + 1),
        currThis: this,
        readme: Base64.decode(res.content),
      })
    }).catch(err => {
      console.log(err)
    })
  },

  copyIt: function (e) {
    const data = e.currentTarget.dataset.text
    if (data) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.text,
        success (res) {
          wx.showToast({
            title: '链接已复制！'
          })
        }
      })
    }
  },

  toView: function () {
    const query = {
      owner: this.data.owner,
      repo: this.data.repo,
      name: this.data.detail.human_name,
      sha: this.data.detail.default_branch
    }
    wx.navigateTo({
      url: `../repo/dir?query=${JSON.stringify(query)}`
    })
  },

  toIssue: function () {
    const query = {
      owner: this.data.owner,
      repo: this.data.repo
    }
    wx.navigateTo({
      url: `../repo/issue?query=${JSON.stringify(query)}`
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})