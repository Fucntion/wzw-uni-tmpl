<style lang="scss">
  /*每个页面公共css */
  @import "./assets/app.scss";
</style>
<script>
import ENV from '@/common/env'
import Storage from '@/common/Storage'
import eventHub from '@/common/eventHub'
import IM from '@/common/Im/Im'
import { modal } from '@/common/fun'
// const livePlayer = requirePlugin('live-player-plugin')

export default {
  globalData: {
    videoInstance: []
  },
  onLaunch: function () {
    console.log('App Launch')
  
    Storage.remove('current_lat')
    Storage.remove('current_lng')
    Storage.remove('location_id')
    Storage.remove('formatted_address')

    // eventHub.livePlayer = livePlayer
    console.log('ENV is', ENV)
    // #ifdef MP-WEIXIN
    let _users_id = ''
    if (ENV.isCustom) {
      _users_id = ENV.users_id
    } else {
      const extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
      _users_id = extConfig.users_id
    }
    if (!_users_id) modal('初始化应用失败:users_id')
    // 切换的时候清空资料
    if (Storage.get('users_id') && _users_id !== Storage.get('users_id')) {
      Storage.set('userInfo', {}, 1)
    }
    Storage.set('users_id', _users_id)
    // #endif

    // #ifndef MP-WEIXIN
    Storage.set('users_id', ENV.users_id)
    // #endif

    // 强制读取服务器
    this.$store.dispatch('system/loadInitData', { isOnline: true })
    this.$store.dispatch('theme/refreshTheme')
  },
  onShow: function (options) {
    // 分享卡片入口场景才调用getShareParams接口获取以下参数
    // if (options.scene === 1007 || options.scene === 1008 || options.scene === 1044) {
    //   livePlayer.getShareParams()
    //     .then(res => {
    //       // 房间号
    //       console.log('get room id', res.room_id)
    //       // 用户openid
    //       console.log('get openid', res.openid)
    //       // 分享者openid，分享卡片进入场景才有
    //       console.log('get share openid', res.share_openid)
    //       // 开发者在跳转进入直播间页面时，页面路径上携带的自定义参数，这里传回给开发者
    //       console.log('get custom params', res.custom_params)
    //       const custom_params = typeof res.custom_params === 'string' ? JSON.parse(res.custom_params) : res.custom_params
    //       const { owner_id = 0 } = custom_params
    //       if (owner_id)Storage.set('owner_id', owner_id)
    //     }).catch(err => {
    //       console.log('get share params', err)
    //     })
    // }

    // 初始化信息
    const userInfo = this.$store.getters['user/getUserInfo']()

    // IM
    if (userInfo && userInfo.User_ID && !eventHub.imInstance) {
      // IM全局
      const imInstance = new IM()
      // 设置本地用户信息
      imInstance.setSendInfo({ type: 'user', id: userInfo.User_ID, name: userInfo.User_NickName, avatar: userInfo.User_HeadImg })
      imInstance.start().then(() => {
        imInstance.openListen()
        eventHub.imInstance = imInstance // 全局用一个句柄
      }).catch((e) => { console.log(e) })
    }

    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
    // hide的时候主动关比较好
    if (eventHub.imInstance) {
      // IM全局
      eventHub.imInstance.close()
    }
  },
  onError: function (e) {
    console.log(e)
    // #ifdef MP-WEIXIN
    // uni.$fundebug.notify('onAppError', JSON.stringify(e))
    // #endif
  }
}
</script>
