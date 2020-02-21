// miniprogram/staticPack/about/author.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  copyIt: function () {
    wx.setClipboardData({
      data: 'https://github.com/JaimeCheng',
      success (res) {
        wx.showToast({
          title: '链接已复制！'
        })
      }
    })
  },
})