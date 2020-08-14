import Vue from 'vue'
import store from '@/store'
// require('./filter')
import './filter'

// import WzwImTip from '@/components/wzw-im-tip/wzw-im-tip'
// Vue.component('wzw-im-tip', WzwImTip)

require('./Promisify')

// 所有的页面和组件都可用了
Vue.prototype.getPimaryColor = () => {
  return store.getters['theme/pimaryColor']
}

function getCurrentPageRoute () {
  const pageInstanceList = getCurrentPages()
  const currentPagePath = pageInstanceList[pageInstanceList.length - 1].route
  return currentPagePath
}
/**
 * 跳去直播，组件也可以用
 * @param room_id
 */
Vue.prototype.$toRoom = (room_id) => {
  // const roomId = room_id // 填写具体的房间号，可通过下面【获取直播房间列表】 API 获取
  // const customParams = encodeURIComponent(JSON.stringify({
  //   path: getCurrentPageRoute(),
  //   owner_id: store.getters['user/getUserId']()// 公共参数
  // }))
  // // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，
  // // 详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）
  // wx.navigateTo({
  //   url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${customParams}`
  // })
}

export const lazyImgUrl = 'https://new401.bafangka.com/uploadfiles/wkbq6nc2kc/image/20191112154310111.jpg'
