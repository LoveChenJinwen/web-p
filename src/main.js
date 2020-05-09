import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/** ******** 引入element-ui组件 *************/
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

/** ******** 全局样式 *************/
import './style/index.less'

/** ******** 引入element-ui组件 *************/
import api from './api'

/** ******** 全局过滤器、指令 *************/
import filters from './filters'

import directives from './directives'

// 引入自定义组件
import components from './components/global'

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(api)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
Vue.use(components)

// 通过监听storage改变 同一浏览器刷新
window.addEventListener('storage', function (e) {
  if (e.key === (Vue.api.storage.baseName + '_loginChange')) { // 当key为loginChange，说明正在登录
    location.href = location.pathname + '#/login'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
