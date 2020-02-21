// miniprogram/pages/repo/issue.js
const REPO = require('../../api/repo.js')
const getDateDiff = require('../../utils/util.js').getDateDiff

Page({

  /**
   * 页面的初始数据
   */
  data: {
    owner: '',
    repo: '',
    active: 0,
    o_page: 1,
    o_total_pages: null,
    c_page: 1,
    c_total_pages: null,
    per_page: 20,
    open: null,
    closed: null,
    loading: true,
    btmloading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.query) {
      var query = JSON.parse(options.query)
      this.setData({
        owner: query.owner,
        repo: query.repo
      })
      query.state = 'open'
      query.page = this.data.o_page
      this.fetchIssues(query)
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  fetchIssues: function (query) {
    query.owner = this.data.owner
    query.repo = this.data.repo
    query.per_page = this.data.per_page
    REPO.getRepoIssues(query).then(res => {
      res.forEach(el => {
        const stamp = new Date(el.updated_at).getTime()
        el.updated_at = getDateDiff(stamp)
      })
      if (query.state === 'open') {
        if (!this.data.open) {
          this.setData({
            open: []
          })
        }
        const open = this.data.open.concat(res)
        this.setData({
          open: open,
          loading: false,
          btmloading: false
        })
        if (res.length < this.data.per_page) {
          this.setData({
            o_total_pages: this.data.o_page
          })
        }
      }
      if (query.state === 'closed') {
        if (!this.data.closed) {
          this.setData({
            closed: []
          })
        }
        const closed = this.data.closed.concat(res)
        this.setData({
          closed: closed,
          loading: false,
          btmloading: false
        })
        if (res.length < this.data.per_page) {
          this.setData({
            c_total_pages: this.data.c_page
          })
        }
      }
    }).catch(err => {
      console.log(err)
      this.setData({
        loading: false,
        btmloading: false
      })
    })
  },

  tabChange: function (e) {
    this.setData({ active: e.detail.index })
    var query = {}
    if (!e.detail.index && !this.data.open) {
      query = {
        page: this.data.o_page,
        state: 'open'
      }
    }
    if (e.detail.index & !this.data.closed) {
      query = {
        page: this.data.c_page,
        state: 'closed'
      }
      this.setData({
        loading: true
      })
    }
    this.fetchIssues(query)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.active == 0 && !this.data.o_total_pages) {
      this.setData({
        btmloading: true,
        o_page: this.data.o_page + 1
      })
      const query = {
        page: this.data.o_page,
        state: 'open'
      }
      this.fetchIssues(query)
    }
    if (this.data.active == 1 && !this.data.c_total_pages) {
      this.setData({
        btmloading: true,
        c_page: this.data.c_page + 1
      })
      const query = {
        page: this.data.c_page,
        state: 'closed'
      }
      this.fetchIssues(query)
    }
  },

  toDetail: function (e) {
    const query = {
      owner: this.data.owner,
      repo: this.data.repo,
      number: e.currentTarget.dataset.item.number
    }
    wx.navigateTo({
      url: `../repo/comment?query=${JSON.stringify(query)}`
    })
  }
})