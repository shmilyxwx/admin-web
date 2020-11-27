/*
 * @Author: fightWz
 * @Date: 2020-04-27 14:30:13
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-01 14:36:19
 * @Description: 内容管理
 */
const routes = [
  {
    path: '/authorityManagement',
    component: () => import('@/views/layout'),
    redirect: '/authorityManagement/userManagement',
    name: 'authorityManagement',
    meta: {
      title: '权限管理'
    },
    children: [
      {
        path: '/authorityManagement/userManagement',
        name: 'authorityManagement-userManagement',
        component: () => import('@/views/authorityManagement/userManagement'),
        meta: {
          title: '广告商列表',
          routeName: 'authorityManagement-userManagement',
          user_type: 1
        }
      }
    ]
  }
]

export default routes
