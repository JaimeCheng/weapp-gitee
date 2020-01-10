const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const redirectOld = () => {
  const lastTab = wx.getStorageSync('lastTab')
  const lastPage = wx.getStorageSync('lastPage')
  if (lastTab) {
    wx.switchTab({
      url: lastTab
    })
  } else if (lastPage) {
    wx.redirectTo({
      url: lastPage
    })
  } else {
    wx.redirectTo({
      url: '../index/index',
    })
  }
}
module.exports = {
  formatTime: formatTime,
  redirectOld: redirectOld
}
