import BaseApi from './lib/'
import Service from './service'

class Api extends BaseApi {
  constructor () {
    super()
    this.service = new Service()
  }
}
export default {
  install (Vue) {
    if (this.installed) return
    this.installed = true

    Vue.api = Vue.prototype.api = new Api()
    // 将api属性设置为不可写，为了防止某些插件冲突
    Object.defineProperty(Vue, 'api', {
      configurable: false, // 不可删除
      writable: false // 不可写
    })
    Object.defineProperty(Vue.prototype, 'api', {
      configurable: false, // 不可删除
      writable: false // 不可写
    })
  }
}
