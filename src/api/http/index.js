import BaseHttp from './baseHttp'
import BaseCookie from '../lib/baseCookie'
import BaseStorage from '../lib/baseStorage'

export default class Http extends BaseHttp {
  constructor () {
    super()

    this.instance.custom_interceptors = {
      // 成功处理
      success (response) {
        const res = response.data
        return res
      },
      // 错误处理
      error (error) {
        if (error.response) {
          // 状态为401001，则跳转到登录页面(开发环境的时候后台返回401001是代理有问题，并且状态值返回时500 (|| error.response.status == 500))
          if (error.response.status === 401001) {
            // 如果是在登录页面，则不需要刷新界面，避免死循环
            if (location.hash.indexOf('#/login') !== 0) {
              // 没有登录时，清空cookies和localStorage
              const cookie = new BaseCookie()
              const storage = new BaseStorage()
              cookie.delCookie('ops_p_token')
              storage.localRemoveItem('store')
              location.href = location.pathname
            }
            return '当前用户未登录或登陆超时,请重新登陆'
          }
        }
      }
    }
  }
}
