// miniprogram/pages/repo/comment.js
const REPO = require('../../api/repo.js')
const getDateDiff = require('../../utils/util.js').getDateDiff

Page({

  /**
   * 页面的初始数据
   */
  data: {
    owner: '',
    repo: '',
    number: '',
    issue: {},
    comments: null,
    page: 1,
    total_pages: null,
    per_page: 20,
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
        number: query.number
      })
      wx.setNavigationBarTitle({
        title: '#' + query.number
      })
      this.fetchIssue(query)
    }
  },

  fetchIssue: function (query) {
    REPO.getIssue(query).then(res => {
      const stamp = new Date(res.updated_at).getTime()
      res.updated_at = getDateDiff(stamp)
      this.setData({
        issue: res,
        currThis: this
      })
      this.fetchComments()
    }).catch(err => {
      this.setData({
        loading: false
      })
    })
  },

  fetchComments: function () {
    const query = {
      page: this.data.page,
      per_page: this.data.per_page,
      owner: this.data.owner,
      repo: this.data.repo,
      number: this.data.number
    }
    REPO.getIssueComments(query).then(res => {
      res.forEach(el => {
        const stamp = new Date(el.created_at).getTime()
        el.created_at = getDateDiff(stamp)
      })
      if (!this.data.comments) {
        this.setData({
          comments: []
        })
      }
      const comments = this.data.comments.concat(res)
      this.setData({
        comments: comments,
        loading: false,
        btmloading: false
      })
      if (res.length < this.data.per_page) {
        this.setData({
          total_pages: this.data.page
        })
      }
    }).catch(err => {
      this.setData({
        loading: false,
        btmloading: false
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.total_pages) {
      this.setData({
        btmloading: true,
        page: this.data.page + 1
      })
      this.fetchComments()
    }
  },

  toUser: function (e) {
    wx.navigateTo({
      url: `../user/home?login=${e.currentTarget.dataset.login}`
    })
  }
})