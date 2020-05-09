export default class {
  constructor () {
    this.baseName = 'web-p'
  }

  localSetItem (name, str) {
    if (!name) {
      throw new Error('localSetItem未设置name')
    }
    window.localStorage.setItem(`${this.baseName}_${name}`, JSON.stringify(
      {
        key: name,
        value: str
      }
    ))
  }

  localGetItem (name) {
    try {
      const obj = window.localStorage.getItem(`${this.baseName}_${name}`)
      return JSON.parse(obj).value
    } catch (ex) {
      return null
    }
  }

  localRemoveItem (name) {
    window.localStorage.removeItem(`${this.baseName}_${name}`)
  }

  sessionSetItem (name, str) {
    if (!name) {
      throw new Error('sessionSetItem未设置Name')
    }
    window.sessionStorage.setItem(`${this.baseName}_${name}`, JSON.stringify(
      {
        key: name,
        value: str
      }
    ))
  }

  sessionGetItem (name) {
    try {
      const obj = window.sessionStorage.getItem(`${this.baseName}_${name}`)
      return JSON.parse(obj).value
    } catch (ex) {
      return null
    }
  }

  sessionRemoveItem (name) {
    window.sessionStorage.removeItem(`${this.baseName}_${name}`)
  }
}
