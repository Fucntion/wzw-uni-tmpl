<template>
  <div >
    <div @tap="ableClose" :animation="maskAnimationData" @touchmove.stop.prevent id="mask" class="popup-layer" v-if="showMask && isShow"></div>
    <div  id="wrap"
          class="popup-wrap"
          :animation="animationData"
          @tap.stop="noop"
          :style="{height:full?'100%':'auto','top':topStr?topStr:'auto',backgroundColor:mainBgColor}"
    >
      <div @touchmove.stop.prevent v-if="title" class="pupup-title">{{title}}</div>
      <slot></slot>
      <div @touchmove.stop.prevent class="safearea-box2"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LayoutPopup',
  props: {
    duration: {
      type: Number,
      default: 300
    },
    showMask: {
      type: Boolean,
      default: true
    },
    animation: {
      type: Boolean,
      default: true
    },
    topStr: {
      type: String
    },
    showPop: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '' // 方向  top，bottom，left，right
    },
    direction: {
      type: String,
      default: 'bottom' // 方向  top，bottom，left，right
    },
    // 是否铺满
    full: {
      type: Boolean,
      default: false
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    mainBgColor: {
      type: String,
      default: '#fff'
    },
    bottomHeight: {
      type: Number || String,
      default: 0
    }
  },
  data () {
    return {
      isShow: false,
      compHeight: null, // 组件高度
      domInfo: {},
      animationData: {},
      maskAnimationData: {},
      menuButtonInfo: {},
      systemInfo: {
        statusBarHeight: 0,
        windowHeight: 0
      }
    }
  },
  mounted () {
    if (this.showPop) {
      this.show()
    }
    
    this.systemInfo = uni.getSystemInfoSync()
    // #ifdef MP-WEIXIN
    this.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    const { height, top, left } = this.menuButtonInfo
    this.diyHeadHeight = top + height + (top - this.systemInfo.statusBarHeight) + 10
    this.diyHeadRight = this.systemInfo.windowWidth - left
    // #endif
  },
  methods: {
    getCompHeightFn () {
      return new Promise((resolve, reject) => {
        const query = uni.createSelectorQuery().in(this)
        query.select('#wrap').boundingClientRect(data => {
          console.log('得到布局位置信息' + JSON.stringify(data))
          // console.log("节点离页面顶部的距离为" + data.top);
          console.log(data)
          resolve(data.height)
        }).exec()
      })
    },
    // 渐入，渐出实现
    linershow: function (opacity) {
      var animation = uni.createAnimation({
        // 持续时间800ms
        duration: 600,
        timingFunction: 'ease'
      })
      // var animation = this.animation
      animation.opacity(opacity).step()
      return animation.export()
    },
    // 滑动渐入渐出
    slideupshow: function (px, opacity, duration, timingFunction = 'ease-in-out') {
      var animation = uni.createAnimation({
        duration,
        timingFunction
      })
      animation.translateY(px).opacity(opacity).step()
      return animation.export()
    },
    noop () {
    },
    show: function () {
      this.isShow = true
      this.maskAnimationData = this.slideupshow('0px', 1, this.duration)
      this.animationData = this.slideupshow('0px', 1, this.duration)
    },
    async close () {
      var transalteY
      
      if (this.compHeight > 0) {
        transalteY = this.compHeight
      } else {
        transalteY = await this.getCompHeightFn()
      }
      // const { windowHeight } = uni.getSystemInfoSync()
      this.animationData = this.slideupshow(`${transalteY}px`, 0.3, this.duration)
      this.maskAnimationData = this.slideupshow('0px', 0, this.duration)
      setTimeout(() => {
        this.isShow = false
      }, this.duration)
    },
    ableClose () {
      if (this.autoClose) {
        this.close()
      }
      this.$emit('maskClicked', this.duration)
    }
  }
}
</script>
<style lang="scss" scoped>
  
  .popup-layer {
    position: fixed;
    z-index: 99;
    background: rgba(0, 0, 0, .6);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    //transform: translateY(100%);
  }
  
  .popup-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    transform:translateY(100%);
    z-index: 100;
    background: #FFFFFF;
    overflow: hidden;
    .pupup-title {
      padding: 30rpx 0 60rpx;
      font-size: 16px;
      text-align: center;
      color: #333;
    }
  }
  
  .safearea-box2 {
    height: constant(safe-area-inset-bottom);
    height: env(safe-area-inset-bottom);
    width: 100%;
  }
</style>
