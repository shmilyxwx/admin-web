/*
 * @Author: fightWz
 * @Date: 2020-04-24 13:19:22
 * @LastEditors: wuzhen
 * @LastEditTime: 2020-04-24 16:22:34
 * @Description: 登录路由
 */
const routes = [
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [{
      path: '/survey',
      name: 'survey',
      meta: {
        title: '首页',
        routeName: 'survey'
      },
      component: () => import('@/views/survey')
    }]
  }
]
export default routes
