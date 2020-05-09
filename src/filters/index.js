import moment from 'moment'
export default {
  // 格式化时间
  date (value, format = 'YYYY-MM-DD') {
    if (!value) return ''
    return new moment(value).format(format)
  }
}
