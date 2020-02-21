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
      url: '../explore/explore',
    })
  }
}
const getDateDiff = (dateTimeStamp) => {
  var result = ''
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  var halfamonth = day * 15
  var month = day * 30
  var year = month * 12
  var now = new Date().getTime()
  var diffValue = now - dateTimeStamp
  if(diffValue < 0){return;}
  var yearC = diffValue/year
  var monthC =diffValue/month
  var weekC =diffValue/(7*day)
  var dayC =diffValue/day
  var hourC =diffValue/hour
  var minC =diffValue/minute
  if(yearC>=1){
    result="" + parseInt(yearC) + " 年前"
  } else if(monthC>=1){
      result="" + parseInt(monthC) + " 个月前"
  }
  else if(weekC>=1){
      result="" + parseInt(weekC) + " 周前"
  }
  else if(dayC>=1){
      result=""+ parseInt(dayC) +" 天前"
  }
  else if(hourC>=1){
      result=""+ parseInt(hourC) +" 小时前"
  }
  else if(minC>=1){
      result=""+ parseInt(minC) +" 分钟前"
  }else
  result="刚刚"
  return result
}

module.exports = {
  formatTime: formatTime,
  redirectOld: redirectOld,
  getDateDiff: getDateDiff
}
