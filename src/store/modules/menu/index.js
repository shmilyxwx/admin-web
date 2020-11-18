/*
 * @Author: fightWz
 * @Date: 2020-04-27 15:11:37
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-21 18:23:04
 * @Description: 导航菜单
 */
import { getAdminMenu } from '@/request/api'

// 序列化菜单
export function fetchMenus(menus) {
  const res = [[], []]
  menus.forEach(v => {
    const tmp = { ...v }
    if (tmp.child) {
      const permisions = fetchMenus(tmp.child)
      permisions[0].forEach(m => {
        res[0].push(m)
      })
      permisions[1].forEach(m => {
        res[1].push(m)
      })
    }
    if (v.permision && v.permision.length) {
      v.permision.forEach(m => {
        res[0].push(m)
      })
    }
    if (v.path !== '/') {
      res[1].push(v.name)
    }
  })
  return res
}

const module = {
  state: {
    menus: [],
    menuNames: [],
    permision: []
  },
  mutations: {
    set_menus(state, data) {
      state.menus = data
    },
    set_menuNames(state, data) {
      state.menuNames = data
    },
    set_permision(state, data) {
      state.permision = data
    }
  },
  actions: {
    // 获取菜单
    getMenuData({ commit }) {
      return new Promise((resolve, reject) => {
        getAdminMenu().then(res => {
          commit('set_menus', res.data)
          const menus = fetchMenus(res.data)
          commit('set_permision', menus[0])
          commit('set_menuNames', menus[1])
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
export default module
