import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
import './plugins/avue'
import router from './router'
import axios from 'axios'

import EleForm from 'vue-ele-form'
Vue.use(EleForm)

Vue.config.productionTip = false
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
// 普通接口使用
Vue.prototype.$http = http
// 图片上传使用
Vue.prototype.$httpajax = http
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
