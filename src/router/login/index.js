/*
 * @Author: fightWz
 * @Date: 2020-04-24 13:19:22
 * @LastEditors: wuzhen
 * @LastEditTime: 2020-04-24 16:22:34
 * @Description: 登录路由
 */
const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      'title': 'Login - 登录',
      'hideInMenu': true
    },
    component: () => import('@/views/login')
  }
]
export default routes
