const container = '.gl-main-scroll'
let scrollDom = null
let element = null
const getScrollTop = function (e) {
  if (container) return e.scrollTop
  const scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop
  return scrollTop
}
const handleScroll = function () {
  const scrollTop = getScrollTop(scrollDom)
  const result = getOffsetTopByEl()
  if (result <= scrollTop + 64) {
    element.classList.add('gl-table-fix-head')
  } else {
    element.classList.remove('gl-table-fix-head')
  }
}

const getOffsetTopByEl = function () {
  let yPosition = 0
  let nextElement = element
  while (nextElement) {
    yPosition += (nextElement.offsetTop)
    nextElement = nextElement.offsetParent
  }
  return yPosition
}

export default {
  inserted: function (el) {
    scrollDom = document.querySelector(container)
    const containerDom = scrollDom || window
    if (!containerDom) {
      console.error(`[watch scroll] Element '${container}' was not found. `)
      return
    }
    element = el
    containerDom.addEventListener('scroll', handleScroll)
  },
  updated (el) {
    scrollDom = document.querySelector(container)
    const containerDom = scrollDom || window
    if (!containerDom) {
      console.error(`[watch scroll] Element '${container}' was not found. `)
      return
    }
    element = el
    containerDom.addEventListener('scroll', handleScroll)
  },
  unbind: function () {
    const containerDom = scrollDom || window
    if (scrollDom) {
      containerDom.removeEventListener('scroll', handleScroll)
    }
    element = null
  }
}
