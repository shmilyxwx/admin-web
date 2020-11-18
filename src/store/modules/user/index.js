/*
 * @Author: fightWz
 * @Date: 2020-04-27 15:58:21
 * @LastEditors: fightWz
 * @LastEditTime: 2020-08-25 11:34:58
 * @Description: user
 */
import { login, logOut } from '@/request/api'
import ViewUI from 'view-design'
import * as Cookies from 'js-cookie'
const module = {
  state: {
    userInfo: {},
    token: '',
    un_read_count: 0,
    keepAlive: ['userManagementList']
  },
  mutations: {
    set_token: (state, data) => {
      state.token = data
    },
    set_userInfo: (state, data) => {
      state.userInfo = data
    },
    set_un_read_count: (state, data) => {
      state.un_read_count = data
    },
    set_keepAlive: (state, data) => {
      state.keepAlive = data
    }
  },
  actions: {
    // 用户名登录
    onLogin({ commit }, userInfo) {
      const userName = userInfo.userName.trim()
      return new Promise(async(resolve, reject) => {
        try {
          const res = await login({
            username: userName,
            password: userInfo.password
          })
          commit('set_userInfo', res.data.admin)
          Cookies.set('token', res.data.access_token, { expires: res.data.expires_in / 24 / 60 / 60 })
          resolve(res)
        } catch (error) {
          if (error && error.msg) {
            ViewUI.Message.error(error.msg)
          } else {
            ViewUI.Message.error('服务器异常')
          }
          reject(error)
        }
      })
    },
    // 登出
    onLogOut() {
      return new Promise(resolve => {
        logOut().then(() => {
          localStorage.clear()
          Cookies.remove('token')
          resolve()
        }).catch(() => {
          localStorage.clear()
          Cookies.remove('token')
          resolve()
        })
      })
    },
    clearStorage() {
      Cookies.remove('token')
      setTimeout(() => {
        location.reload()
      }, 500)
    }
  }
}
export default module
