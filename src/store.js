import Vue from 'vue'
import Vuex from 'vuex'
import state from './store/state'
import * as mutations from './store/mutations'
import system from './store/modules/system'
import user from './store/modules/user'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    system,
    theme,
    user,
    delivery
  },
  state,
  mutations
  // actions,
  // getters
})
