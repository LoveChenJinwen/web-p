export default class {
  /**
   * 获取cookie值
   * @param {String} key  - cookie名称
   */
  getCookie (key) {
    var str = '(^| )' + key + '=([^;]+)(;|$)'
    var reg = new RegExp(str)
    var arr = document.cookie.match(reg)
    if (!arr) return null
    return arr[2]
  }

  /**
   * 设置cookie值
   * @param {String} name - 名称
   * @param {String} value - 值
   * @param {Object} day - 参数
   */
  setCookie (name, value, { domain, path, expires }) {
    const arr = []
    if (domain) arr.push('domain=' + domain)
    if (path) arr.push('path=' + domain)
    if (expires) arr.push('expires=' + expires.toUTCString())
    const str = arr.length > 0 ? arr.join('; ') : ''

    document.cookie = name + '=' + value + '; ' + str
  }

  /**
   * 删除cookie
   * @param {String} name - 名称
   */
  delCookie (name) {
    const today = new Date()
    today.setDate(today.getDate() - 1)
    this.setCookie(name, '', {
      expires: today
    })
  }
}
