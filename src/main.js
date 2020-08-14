import Vue from 'vue'
import App from './App'

import T from './common/langue/i18n'
import locales from './common/langue/locales'

import './common'
import store from '@/store'

import moment from './libs/moment.min'
// moment.locale('zh-cn')
uni.$moment = moment

Vue.config.productionTip = false

App.mpType = 'app'

// #ifdef MP-WEIXIN
// var fundebug = require('./common/tool/fundebug.1.3.1.min.js')
// fundebug.init({
//   apikey: 'ab3768ddf58459d44700a70887908eec81a865d913cd9e2d599063a8345fd5ec'
// })
// uni.$fundebug = fundebug

// #endif

// 设置语言
T.registerLocale(locales)
T.setLocale()

const app = new Vue({
  ...App,
  store
})
app.$mount()
