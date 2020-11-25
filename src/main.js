import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'normalize.css/normalize.css'
import 'nprogress/nprogress.css'
import '@/theme/index.less'
import '@/components/index.js'
import Common from '@/utils/index.js'
import config from '@/config'
import '@/icons/index.js'
import validate from '@/utils/formValidation'
import moment from 'moment'
Vue.prototype.$commonJS = Common
// 引入 v-charts
import VCharts from 'v-charts'
Vue.use(VCharts)
Vue.use(ViewUI, {
  transfer: true
})
Vue.config.productionTip = false
Vue.prototype.$config = config
// 全局注册应用配置
Vue.prototype.$validate = validate
// 全局配置日期格式化
Vue.prototype.$fmtMoment = (date, format, isDay = false) => {
  if (date) {
    return moment(date).format(format || 'YYYY-MM-DD HH:mm:ss')
  }
  return null
}
// 全局注册中间件传值
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
