// pages/account/account.js
import store from '../../store/store'
import create from '../../store/create'
const USER = require('../../api/user.js')
const REPO = require('../../api/repo.js')

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    empty: '--',
    repos: '-'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.update()
    wx.setStorageSync('lastTab', '../account/account')
    wx.setStorageSync('lastPage', '')
    if (!this.store.data.token) {
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      this.fetchInfo()
      // this.fetchRepos()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  fetchInfo: function () {
    USER.getMyInfo(this.store.data.token).then(res => {
      this.setData({
        userInfo: res
      })
    }).catch(err => {
      console.log(err)
    })
  },

  fetchRepos: function () {
    const query = {
      sort: 'pushed',
      per_page: 100
    }
    REPO.getMyRepos(query).then(res => {
      this.setData({
        repos: res.length < 100 ? res.length : '99+'
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
            title: '内容已复制！'
          })
        }
      })
    }
  },

  feedback: function () {
    wx.navigateToMiniProgram({
      appId: 'wx8abaf00ee8c3202e',
      extraData: {
        id: '125954'
      }
    })
  },

  logout: function () {
    const _this = this
    wx.showModal({
      content: '确定要退出登录吗？',
      success (res) {
        if (res.confirm) {
          wx.removeStorageSync('token')
          _this.store.data.token = ''
          _this.store.update()
          wx.redirectTo({
            url: '../login/login',
          })
        }
      }
    })
  }

})