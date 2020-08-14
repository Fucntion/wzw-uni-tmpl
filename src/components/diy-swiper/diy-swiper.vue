<template>
  <div class="wrap">
    <swiper
      v-if="imgList.length>0"
      :style="{width:w,height:h,padding:config.paddingStr}"
      class="swiper"
      @change="indexChangeEvent"
      :indicator-dots="config.indicatorDots==='circle'"
      :autoplay="autoplay"
      :circular="circular"
      :indicator-color="dotsColor"
      :indicator-active-color="dotsActiveColor"
      :interval="interval"
      :duration="duration">
      <swiper-item class="swiper-item" v-for="(img,idx) in imgList" :key="idx" @click="bindClick(idx)">
        <image @load="handleImgLoad" :id="'img'+idx" mode="widthFix" class="swiper-item-img" :src="img"></image>
      </swiper-item>
    </swiper>
    <div class="dot-list" v-if="config.indicatorDots==='line'">
        <span
          v-for="(img,idx) in imgList"
          :key="idx"
          class="dot-item"
          :class="{active:current===idx}"
          :style="{backgroundColor:current===idx?dotsActiveColor:dotsColor}"></span>
    </div>
  </div>
</template>
<script>
import { getArrColumn, getDomain } from '@/common/helper'
import { linkTo, linkToEasy } from '@/common/fun'
import { getAdvertList } from '@/api/common'
import { Exception } from '@/common/Exception'

// https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html
export default {
  name: 'DiySwiper',
  props: {
    // paddingStr: {
    //   type: String,
    //   default: '0px'
    // },
    boxDidth: {
      default: 750,
      type: Number
    },
    height: {
      default: '250rpx',
      type: String
    },
    itemwidth: {
      default: '750rpx',
      type: String
    },
    itemheight: {
      default: '250rpx',
      type: String
    },
    // indicatorDots: {
    //   type: [Boolean, String],
    //   default: false
    // },
    // circular: {
    //   default: true,
    //   type: Boolean
    // },
    vertical: {
      default: false
    },

    position: {
      default: '',
      type: String
    },
    cateId: {
      default: '',
      type: String
    },
    code: {
      default: '',
      type: String
    },
    confData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      lists: [],

      config: {
        paddingStr: '0px',
        indicatorDots: 'none'
      },
      boxw: [],
      boxh: [],
      urls: [],
      imgList: [],
      current: 0,
      circular: true,
      autoplay: true,
      dotsColor: 'rgba(0,0,0,.3)',
      dotsActiveColor: '#26c78d',
      interval: 5000,
      duration: 500
    }
  },
  computed: {
    w () {
      try {
        return this.boxw[this.current]
      } catch (e) {
        return this.width
      }
    },
    h () {
      try {
        return this.boxh[this.current]
      } catch (e) {
        return this.height
      }
    }
  },
  watch: {},
  components: {},
  methods: {
    async _init_func () {
      console.log('layout-ad init_func', this.confData)

      const { value, config, style } = this.confData
      this.lists = value.list
      this.config = config
      // this.style = style
      // console.log(config, style)

      const { dotsColor, dotsActiveColor } = style
      var { interval, duration, autoplay = true, loop = true } = config
      interval = Number(interval)
      console.log(config, style)
      if (dotsColor) this.dotsColor = dotsColor
      if (dotsActiveColor) this.dotsActiveColor = dotsActiveColor
      if (interval > 0) this.interval = interval<10?5000:interval; //需要兼容老数据啊。。。 毫秒
      console.log(this.interval)
      if (duration>0) this.duration = duration
      this.circular = loop
      this.autoplay = autoplay
      // img_src: "https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202006101709465178.jpg"
      // link: ""
      // linkType: null
      this.imgList = getArrColumn(this.lists, 'img_src').map(url => getDomain(url))
      this.urls = getArrColumn(this.lists, 'link')
    },
    bindClick (idx) {
      linkTo(this.lists[idx])
    },
    handleImgLoad (e) {
      const { width, height } = e.detail

      const idx = e.target.id.replace('img', '')

      this.$set(this.boxw, idx, this.boxDidth + 'rpx')
      this.$set(this.boxh, idx, this.boxDidth * height / width + 'rpx')

      // console.log(this.boxh, this.boxw)
    },
    indexChangeEvent (event) {
      const { current } = event.detail
      this.current = current
    }
  },
  created () {
    this._init_func()
  }
}
</script>

<style scoped lang="scss">
  .wrap {
    position: relative;
    background: #fff;

    .swiper {

      &-item {
        position: relative;

        &-img {
          width: 100%;
        }

        &-cover {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          @include cover-img(contain);
        }
      }

    }

    .dot-list {
      display: flex;
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);

      .dot-item {
        width: 30rpx;
        height: 4rpx;
        margin-right: 6rpx;

        &:last-child {
          margin-right: 0;
        }

        &.active {
          //background: $fun-primary-color;
        }
      }
    }
  }

</style>
