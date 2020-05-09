import Http from '../api/http/'

export default class Test extends Http {
  login () {
    return super.post('login', ...arguments)
  }
}
