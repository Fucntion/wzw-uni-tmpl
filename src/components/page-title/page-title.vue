<template>
  <div class="component-wrap" :style="{backgroundColor: bgcolor}">
    <img class="img" src="/static/title-arrow-left.png"  @click="goBack" v-show="!hiddenBack">
    {{title}}
    <view v-if="dot" class="dotted">
      <view class="dotlist" @click="changeMethod">
        <view class="circle"></view><view class="circle"></view><view class="circle"></view>
      </view>
      <view class="methods" v-if="isShowMethod">
        <view class="method" @click="method(1)">进货记录</view>
        <view class="method" v-if="is_pingtai === 0" @click="method(2)">门店信息</view>
      </view>

    </view>
    <span v-else class="right" @click="rightHandle" v-show="!rightHidden">{{right}}</span>
  </div>
</template>

<script>
import { backFunc } from '@/common/fun'

export default {
  name: 'PageTitle',
  // props: ['title','right','hiddenBack','rightHidden'],
  props: {
    title: {
      type: String,
      default: '标题'
    },
    right: {
      type: String,
      default: '管理'
    },
    hiddenBack: {
      type: Boolean,
      default: false
    },
    rightHidden: {
      type: Boolean,
      default: true
    },
    bgcolor: {
      default: '#f8f8f8'
    },
    // 右上角是三个点
    dot: {
      type: Boolean,
      default: false
    },
    // 是否是平台进货，平台进货的时候，不应该有门店信息
    is_pingtai: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      isShowMethod: false,
      timeid: ''
    }
  },
  methods: {
    goBack () {
      backFunc()
    },
    rightHandle () {
      this.$emit('rightHandle')
    },
    changeMethod () {
      this.isShowMethod = !this.isShowMethod
      if (this.timeid) {
        clearTimeout(this.timeid)
      };
      if (this.isShowMethod) {
        this.timeid = setTimeout(() => {
          this.isShowMethod = false
        }, 3000)
      }
    },
    method (type) {
      this.$emit('methodHandle', type)
      this.isShowMethod = false
    }
  },
  computed: {

  }
}
</script>

<style scoped lang="scss">
  .component-wrap {
    height: 86rpx;
    line-height: 86rpx;
    width: 100%;
    position: relative;
    top: 0;
    font-size: 32rpx;
    color: #333;
    text-align: center;
    z-index: 100;
    .img {
      position: absolute;
      top: 9rpx;
      left: 13rpx;
      width: 23rpx;
      height: 37rpx;
      padding: 20rpx;
    }
    .right {
      position: absolute;
      top: 0;
      right: 20rpx;
      line-height: 86rpx;
    }
    .dotted {
      position: absolute;
      top: 50%;
      right: 20rpx;
      transform: translateY(-50%);
      .dotlist {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20rpx 0 20rpx 20rpx;
        .circle {
          width:8px;
          height:8px;
          background:rgba(153,153,153,1);
          border-radius:50%;
          margin-right: 5rpx;
        }
      }
      .methods {
        position: absolute;
        top: 50rpx;
        right: 0;
        background: #666;
        color: #fff;
        display: flex;
        flex-direction: column;
        width: 167rpx;
        font-size: 24rpx;
        z-index: 1000;
        .method {
          line-height: 65rpx;
        }
        .method:nth-child(2) {
          border-top: 2rpx dotted #fff;
        }
      }
    }
  }
</style>
