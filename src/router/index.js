import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import * as Cookies from 'js-cookie'
Vue.use(VueRouter)

let asyncRoutes = []
const requireContext = require.context('./', true, /\.js$/)
requireContext.keys().forEach(filename => {
  if (filename === './index.js') {
    return
  }
  const routerModule = requireContext(filename)
  asyncRoutes = [...asyncRoutes, ...(routerModule.default || routerModule)]
})
const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }, ...asyncRoutes
]
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  const storage = JSON.parse(localStorage.getItem('vuex'))
  const token = Cookies.get('token')
  if (token && storage && storage.menuNames && storage.menuNames.length) {
    const menuNames = storage.menuNames
    const menuPath = '/' + menuNames[0].replace(/\-/g, '/')
    // 如果登录地址跳转到首页或者是重定向页面
    if (to.path === '/login' && menuNames.length) {
      next({
        path: to.query.redirect || menuPath,
        replace: true
      })
      return
    }
    if (menuNames && !menuNames.includes(to.meta.routeName)) {
      next({
        path: menuPath,
        replace: true
      })
      return
    }
    next()
    return
  }
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
})
export default router
