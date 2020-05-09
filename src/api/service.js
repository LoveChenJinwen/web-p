// 使用MIX方法，解决多继承的问题
import serviceConfig from '@/service/service.json'

function mix (...mixins) {
  class Mix { }
  for (const mixin of mixins) {
    copyProperties(Mix.prototype, mixin) // 拷贝实例属性
    copyProperties(Mix.prototype, Reflect.getPrototypeOf(mixin)) // 拷贝原型属性
  }

  return Mix
}

function copyProperties (target, source) {
  for (const key of Reflect.ownKeys(source)) {
    if (key !== 'constructor' &&
      key !== 'prototype' &&
      key !== 'name'
    ) {
      const desc = Object.getOwnPropertyDescriptor(source, key)
      Object.defineProperty(target, key, desc)
    }
  }
}

// 引用需要继承的类
const classArray = []
serviceConfig.forEach(io => {
  const classObj = require(`@/service/${io}`)
  const FunObj = classObj.default
  classArray.push(new FunObj())
})

/**
 * 所有接口
 */
export default class service extends mix(...classArray) {

}
