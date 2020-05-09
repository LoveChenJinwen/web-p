import axios from 'axios'
import qs from 'qs'

// 兼容IE10
if (!location.origin) location.origin = `${location.protocol}//${location.host}`

let baseURL = 'ops-p-api/'
let origin = 'http://www.baidu.api.com'

// 生产环境配置
if (process.env.NODE_ENV === 'production') {
  baseURL = location.origin + '/djzchina-ops-p-api/'
  origin = location.origin + '/'
}

const instance = axios.create({
  baseURL: baseURL,
  timeout: 2 * 60 * 1000
})

instance.interceptors.response.use(function (response) {
  // Do something with response data
  const res = instance.custom_interceptors.success(response)
  if (res) {
    return res
  }
  return response
}, function (error) {
  const res = instance.custom_interceptors.error(error)
  if (res) {
    error = res
  }
  // 这里做错误处理
  return Promise.reject(error)
})

// 格式化参数
function formatParams (data) {
  return qs.stringify(data, {
    skipNulls: true
  })
}

/**
  * 下载文件
  * @param {String} url
  * @param {Object} params
  */
function download (url, params = {}, callback = function () { }) {
  return new Promise((resolve, reject) => {
    const iframeId = 'download-iframe-link'
    let iframe = document.getElementById(iframeId)
    if (!iframe) {
      iframe = document.createElement('iframe')
      iframe.id = iframeId
      iframe.style.display = 'none'
      document.body.appendChild(iframe)
    }
    // 如果传入的是一个链接，则直接下载
    if (url.indexOf('http') === 0) {
      iframe.src = url
    } else {
      iframe.src = `${baseURL}${url}?${formatParams(params)}`
    }
    // 监听加载完成
    const timer = setInterval(() => {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
      if (iframeDoc.readyState === 'complete' || iframeDoc.readyState === 'interactive') {
        callback()
        clearInterval(timer)
      }
    }, 500)
    iframe.onload = function () {
      try {
        let text = iframe.contentWindow.document.body.innerText
        text = JSON.parse(text)
        resolve(text)
      } catch (error) {
        reject(error)
      }
    }

    iframe.onerror = function (e) {
      reject(e)
    }
  })
}

export default class {
  constructor () {
    // 当前请求实例
    this.instance = instance
    // 基础API地址
    this.baseURL = baseURL
    // 原始地址
    this.origin = origin
    // 返回原始的axios对象
    this.$http = axios
    // 取消标记源，用来取消请求
    this.CancelTokenSource = () => axios.CancelToken.source()
    // 下载方法
    this.download = download
  }

  /**
   * POST请求
   * @param {String} url - 接口地址
   * @param {Object} data - 当query不为空时，data为RequestPayload请求方式的值
   * @param {Object} query - url参数，在RequestPayload请求方式时使用
   * @param {Object} extendParams - axios拓展参数
   */
  post () {
    let url = arguments[0]
    let data = {}
    let query = null
    let extendParams = Object.create(null)

    if (arguments.length > 1) data = arguments[1]
    if (arguments.length > 2) query = arguments[2]
    if (arguments.length > 3) extendParams = arguments[3]

    // 如果传了query参数，则代码为request payload请求
    if (query != null) {
      url += '?' + formatParams(query)
    } else {
      if (['[object FormData]', '[object HTMLFormElement]'].includes(data.toString())) {
        // 如果是FormData格式，则不进行编码
      } else {
        // 如果传的是数组，则不处理
        if (Array.isArray(data) === false) {
          // 检测是否对象里包含对象
          let isCheckObject = false
          for (const key of Object.keys(data)) {
            if (data[key] && typeof data[key] === 'object') {
              isCheckObject = true
              break
            }
          }
          // 如果对象里不包括对象，则使用urlencoded模式请求
          if (isCheckObject === false) {
            // 格式转换，如果为null，则不传
            data = formatParams(data)
          }
        }
      }
    }

    return this.instance({
      method: 'POST',
      url: url,
      data: data,
      ...extendParams
    })
  }

  /**
   * GET请求
   * @param {String} url - 接口地址
   * @param {Object} query - url参数
   * @param {Object} extendParams - axios拓展参数
   */
  get () {
    const url = arguments[0]
    let params = Object.create(null)
    let extendParams = Object.create(null)

    if (arguments.length > 1) params = arguments[1]
    if (arguments.length > 2) {
      extendParams = arguments[2]
      if (extendParams === 'download') {
        return this.download(url, params, arguments[3])
      }
    }

    return this.instance({
      method: 'GET',
      url: url,
      params: params,
      ...extendParams
    })
  }
}
