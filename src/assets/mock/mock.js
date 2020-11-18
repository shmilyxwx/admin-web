/*
 * @Author: wuzhen
 * @Date: 2019-12-21 13:47:38
 * @LastEditors: fightWz
 * @LastEditTime: 2020-05-13 17:10:41
 * @Description: 菜单数据
 */
const Mock = require('mockjs')
// 菜单管理
const menus = () => {
  const res = {
    data: [
      {
        id: 1,
        title: '控制台',
        name: 'home',
        path: '/',
        icon: 'fa-menu-1',
        parentId: 0,
        sort: 1
      },
      {
        id: 10,
        title: '组件',
        name: 'components',
        path: '/',
        icon: 'fa-menu-2',
        parentId: 0,
        sort: 2,
        children: [
          {
            id: 11,
            title: '表单',
            name: 'components-form',
            path: '/components/form',
            icon: '',
            parentId: 10,
            sort: 1
          },
          {
            id: 12,
            title: '表单验证',
            name: 'components-form-verify',
            path: '/components/form/verify',
            icon: '',
            parentId: 10,
            sort: 2
          },
          {
            id: 13,
            title: 'table表格',
            name: 'components-table',
            path: '/components/table',
            icon: '',
            parentId: 10,
            sort: 3
          },
          {
            id: 14,
            title: 'svg图标',
            name: 'components-svg',
            path: '/components/svg',
            icon: '',
            parentId: 10,
            sort: 4
          }
        ]
      },
      {
        id: 100,
        title: '系统管理',
        name: 'system',
        path: '',
        icon: 'fa-menu-3',
        parentId: 0,
        sort: 100,
        children: [
          {
            id: 101,
            title: '菜单管理',
            name: 'system-menu',
            path: '/system/menu',
            icon: '',
            parentId: 100,
            sort: 1
          },
          {
            id: 103,
            title: '角色管理',
            name: 'system-role',
            path: '/system/role',
            icon: '',
            parentId: 100,
            sort: 1
          },
          {
            id: 104,
            title: '管理员管理',
            name: 'system-user',
            path: '/system/user',
            icon: '',
            parentId: 100,
            sort: 1
          }
        ]
      }
    ],
    code: 200
  }
  return new Promise(resolve => {
    resolve(res)
  })
}

// 权限列表
const permission = () => {
  const res = {
    data: [
      {
        id: 1,
        menu_id: 101,
        title: '列表',
        api: '/permission',
        methods: 'GET'
      },
      {
        id: 1,
        menu_id: 101,
        title: '新增',
        api: '/permission',
        methods: 'POST'
      },
      {
        id: 2,
        menu_id: 101,
        title: '删除',
        api: '/permission',
        methods: 'DELETE'
      },
      {
        id: 3,
        menu_id: 104,
        title: '删除',
        api: '/permission',
        methods: 'DELETE'
      }
    ],
    code: 200
  }
  return new Promise(resolve => {
    resolve(res)
  })
}

// 角色列表
const roles = () => {
  const res = {
    data: [
      {
        name: '管理员',
        identify: 'admin',
        status: 1
      }
    ],
    code: 200
  }
  return new Promise(resolve => {
    resolve(res)
  })
}
// const roles = () => {
//   const res = Mock.mock({
//     "data|10": [
//       {
//         "name|1": ["管理员", "编辑员", "发布员"]
//       }
//     ],
//     code: 200
//   });
//   return new Promise(resolve => {
//     resolve(res);
//   });
// };

// 模拟表格数据
const tableData = () => {
  const res = Mock.mock({
    'data|15': [
      {
        'id': '@id',
        'name': '@name',
        'cname': '@cname',
        'phone': /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3})$/,
        'string': '@string(7,20)',
        'number|100-1000': 1,
        'integer': '@integer(10, 30)',
        'float': '@float(60, 1000, 2, 2)',
        'boolean': '@boolean',
        'date': '@date',
        'time': '@time',
        'datetime': '@datetime',
        'now': '@now',
        'url': '@url',
        'email': '@email',
        'region': '@region',
        'city': '@city',
        'province': '@province',
        'county': '@county',
        'upper': '@upper(@title)',
        'guid': '@guid',
        'image100': '@image(100x100)',
        'image200': '@image(200x200)',
        'image300': '@image(300x300)',
        'image': '@image(100x200)',
        'title': '@title',
        'ctitle': '@ctitle(5,20)',
        'cparagraph': '@cparagraph',
        'csentence': '@csentence',
        'range': '@range(1, 10)',
        'type|1-5': 1
      }
    ],
    code: 200
  })
  return new Promise(resolve => {
    resolve(res)
  })
}

// 点击返回成功
const resSuccess = () => {
  const res = {
    msg: '操作成功',
    code: 200
  }
  return new Promise(resolve => {
    resolve(res)
  })
}

export default {
  menus,
  permission,
  roles,
  tableData,
  resSuccess
}
