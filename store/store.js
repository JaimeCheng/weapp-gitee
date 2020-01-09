export default {
  data: {
    token: '', //更改我会刷新所有页面,不需要再组件和页面声明data依赖
  },
  globalData: ['token'],
  //默认 false，为 true 会无脑更新所有实例
  //updateAll: true
}