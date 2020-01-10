export default {
  data: {
    token: '', //更改我会刷新所有页面,不需要再组件和页面声明data依赖
    gitee: {
      grant_type: 'password',
      client_id: '9c7770063adbbe57921e0bdc9cdb085dc553016b341959eed677ffa1d576828a',
      client_secret: '35f6127b0b08cd37fe81b2b5a04537a1eb96bd1f481862d09ea016e908c27fa9',
      scope: 'user_info projects pull_requests issues notes'
    }
  },
  globalData: ['token'],
  //默认 false，为 true 会无脑更新所有实例
  //updateAll: true
}