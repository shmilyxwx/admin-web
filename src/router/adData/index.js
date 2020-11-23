/*
 * @Author: fightWz
 * @Date: 2020-04-27 14:30:13
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-01 14:36:19
 * @Description: 内容管理
 */
const routes = [
  {
    path: '/adDataManagement',
    component: () => import('@/views/layout'),
    redirect: '/adDataManagement/adData',
    name: 'adDataManagement',
    meta: {
      title: '广告商管理'
    },
    children: [
      {
        path: '/adDataManagement/adUserList',
        name: 'adDataManagement-adUserList',
        component: () => import('@/views/adDataManagement/adUserList'),
        meta: {
          title: '广告商列表',
          routeName: 'adDataManagement-adUserList',
          user_type: 1
        }
      }
    ]
  }
]

export default routes
