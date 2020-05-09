import BaseCookie from './baseCookie'
import BaseStorage from './baseStorage'

export default class {
  constructor () {
    this.baseCookie = new BaseCookie()
    this.baseStorage = new BaseStorage()
  }
}
