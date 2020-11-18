import Vue from 'vue'
import Vuex from 'vuex'
import vuexModules from './modules'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: vuexModules,
  getters,
  plugins: [
    createPersistedState({
      reducer(val) {
        return {
          user: {
            token: val.user.token,
            userInfo: val.user.userInfo,
            permision: val.menu.permision
          },
          menuNames: val.menu.menuNames
        }
      }
    })
  ]
})

export default store
