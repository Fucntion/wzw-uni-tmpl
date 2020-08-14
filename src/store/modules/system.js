import Storage from '@/common/Storage'
import { modal } from '@/common/fun'
import { getSystemConf } from '@/api/common'
import { objTranslate } from '@/common/helper'

const state = {
  initData: false,
  tabbarCurrentIndex: 0,
  tabTags: [0, 0]
}

const mutations = {
  SET_CURRENT_TABBAR (state, idx) {
    state.tabbarCurrentIndex = idx
  },
  SET_TABBAR_TAG (state, { idx, num }) {
    // state.tabTags[idx] = num
    const tempTags = objTranslate(state.tabTags)
    console.log(tempTags)
    tempTags[idx] = num
    state.tabTags = objTranslate(tempTags)
  },
  SET_INIT_DATA (state, value) {
    state.initData = value
    Storage.set('initData', value, 1)

    // app分享小程序的时候有用到
    if (value && value.login_methods) {
      const login_methods = value.login_methods
      for (var i in login_methods) {
        if (i !== 'component_appid' && login_methods[i].type === 'wx_lp' && login_methods[i].authorizer_user_name) {
          Storage.set('WX_MINI_ORIGIN_ID', login_methods[i].authorizer_user_name)
        }
      }
    }
  }
}

const actions = {
  tabbarTagAdd: ({ state, commit }, { idx, num = 1 }) => {
    console.log(idx, num)
    const tempNum = state.tabTags[idx]
    const newNum = tempNum + num // 可以正负
    if (newNum < 0) throw Error('数据不能为负')
    commit('SET_TABBAR_TAG', { idx, num: newNum })
  },
  tabbarTagClear: ({ state, commit }, { idx }) => {
    commit('SET_TABBAR_TAG', { idx, num: 0 })
  },
  setTabActiveIdx: ({ commit }, value) => {
    commit('SET_CURRENT_TABBAR', value)
  },
  // async 相当于 隐式的promise
  async loadInitData ({ commit, state }, opts = {}) {
    try {
      const { isOnline = false } = opts
      let initData = state.initData || Storage.get('initData')
      if (isOnline || !initData || JSON.stringify(initData) === '{}') {
        initData = await getSystemConf({}, { onlyData: 1 }).catch(({ msg = '' }) => { throw Error(msg || '获取全局配置失败') })
      }
      commit('SET_INIT_DATA', initData)
      return initData
    } catch (e) {
      modal(e.message)
    } finally {

    }
  }
}

const getters = {
  getTabbarTags: (state) => () => {
    return state.tabTags
  },
  tabbarCurrentIndex: (state) => state.tabbarCurrentIndex ? state.tabbarCurrentIndex : 0,
  initData: (state) => state.initData || Storage.get('initData')
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
