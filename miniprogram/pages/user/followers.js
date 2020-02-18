// miniprogram/pages/user/followers.js
const USER = require('../../api/user.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    total_pages: null,
    username: '',
    users: null,
    loading: true,
    btmloading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.login) {
      this.setData({
        username: options.login
      })
      this.fetchUsers()
    }
  },
  
  fetchUsers: function () {
    const query = {
      username: this.data.username,
      page: this.data.page
    }
    USER.getFollowers(query).then(res => {
      if (!this.data.users) {
        this.setData({
          users: []
        })
      }
      const users = this.data.users.concat(res)
      this.setData({
        users: users,
        loading: false,
        btmloading: false
      })
      if (res.length === 0) {
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
    this.setData({
      btmloading: true,
      page: this.data.page + 1
    })
    this.fetchUsers()
  }

})