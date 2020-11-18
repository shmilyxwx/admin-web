import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'normalize.css/normalize.css'
import 'nprogress/nprogress.css'
import '@/theme/index.less'
import '@/components/index.js'
Vue.use(ViewUI, {
  transfer: true
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
