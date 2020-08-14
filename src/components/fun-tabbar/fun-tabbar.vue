<template>
  <div class="tabbar">
    <view class="tabbar-item-wrap" :class="{active:tabbarCurrentIndex===idx}" v-for="(item,idx) in tabbarConf.list" :key="idx" @click="toItem(idx)">
      <div class="tabbar-item">
        <image :src="tabbarCurrentIndex === idx ? item.selectedIconPath:item.iconPath" class="item-icon"></image>
        <div class="item-title" :style="{color:tabbarCurrentIndex === idx ?tabbarConf.selectedColor:tabbarConf.color}">{{item.text}}</div>
        <div class="item-tag" :class="{circle:tags[idx]<10}" v-if="tags[idx]>0">{{tags[idx]}}</div>
      </div>
    </view>

  </div>
</template>

<script>
import { findArrayIdx } from '@/common/helper'
import { linkToEasy } from '@/common/fun'

export default {
  name: 'fun-tabbar',
  computed: {
    tags () {
      return this.$store.getters['system/getTabbarTags']()
    },
    tabbarCurrentIndex () {
      return this.$store.getters['system/tabbarCurrentIndex']
    }
  },
  watch: {
    tags: {
      deep: true,
      handler (val) {
        console.log(val)
      }
    }
  },
  data () {
    return {
      tabbarConf: {
        borderStyle: 'black',
        color: '#999999',
        selectedColor: '#26C78D',
        list: [
          {
            pagePath: 'pages/index/index',
            iconPath: '/static/tabbar/find.png',
            selectedIconPath: '/static/tabbar/find-a.png',
            text: '发现'
          },
          {
            pagePath: 'pages/support/ImList',
            iconPath: '/static/tabbar/notify.png',
            selectedIconPath: '/static/tabbar/notify-a.png',
            text: '消息'
          },
          {
            pagePath: 'pages/user/Praise',
            iconPath: '/static/tabbar/praise.png',
            selectedIconPath: '/static/tabbar/praise.png',
            text: '好评'
          },
          {
            pagePath: 'pages/order/ShoppingCart',
            iconPath: '/static/tabbar/cart.png',
            selectedIconPath: '/static/tabbar/cart-a.png',
            text: '购物车'
          },
          {
            pagePath: 'pages/user/index',
            iconPath: '/static/tabbar/user.png',
            selectedIconPath: '/static/tabbar/user-a.png',
            text: '我的'
          }
        ]
      }
    }
  },
  methods: {
    toItem (idx) {
      this.$store.dispatch('system/setTabActiveIdx', idx)
      const currentPages = getCurrentPages()
      console.log(currentPages)
      const pageIdx = findArrayIdx(currentPages, { route: this.tabbarConf.list[idx].pagePath })
      if (pageIdx === false) {
        linkToEasy('/' + this.tabbarConf.list[idx].pagePath)
      } else {
        // 退回去，不要跳了
        wx.navigateBack({
          delta: currentPages.length - 1 - pageIdx
        })
      }
    },
    _onClick () {
      this.$emit('click')
    }
  },
  ready () {
    console.log(this.$store.state)
  }
}
</script>
<style lang="scss" scoped>
  .tabbar{
    z-index: 99;
    background: white;
    display: flex;
    position: fixed;
    left: 0;
    border-top:1px solid #eee;
    width: 750rpx;
    bottom: 0;
    padding-bottom: env(safe-area-inset-bottom);
    height: 98rpx;
    .tabbar-item-wrap{
      height: 98rpx;
      flex:1;
      text-align: center;
      color: #888;
      display: flex;
      align-items: center;
      justify-content: center;
      &.active{

      }
      .tabbar-item{
        position: relative;
      }
      .item-tag{
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(100%);
        background: $fun-red-color;
        height: 30rpx;
        line-height: 30rpx;
        padding: 0 6rpx;
        border-radius: 15rpx;
        color: #fff;
        font-size: 20rpx;
        &.circle{
          width: 30rpx;
          padding:  0px 0px 0px 0px;
          border-radius: 50%;
        }
      }
      .item-icon{
        height: 48rpx;
        width: 48rpx;
      }
      .item-title{
        font-size: 20rpx;
      }

    }

  }
</style>
