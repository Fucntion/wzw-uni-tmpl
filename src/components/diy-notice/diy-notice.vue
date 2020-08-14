<template>
  <view class="notice wrap">
    <view class="flex content" :style="{background:notice.style.bgColor}">
<!--      <view class="funicon icon-gonggao icon" :style="{color:notice.style.iconColor}"></view>-->
      <layout-icon type="icongonggao" :color="notice.style.iconColor"></layout-icon>
      <div class="flex1 title" :style="{color:notice.style.color}">
        <div class="content-box" id="content" :style="{marginLeft: marginLeft + 'px'}">{{notice.value.content}}</div>
      </div>
    </view>
  </view>
</template>
<script>
import { deepCopyStrict } from '@/common/helper'
import LayoutIcon from '@/components/layout-icon/layout-icon'

const styleDefault = {}
export default {
  name: 'DiyNotice',
  props: {
    index: {
      required: true
    },
    confData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      number: 0,
      time: 100,
      marginLeft: 0,
      an: null,
      fullWidth: 0,
      notice: {}
    }
  },
  computed: {
    style () {
      return deepCopyStrict(styleDefault, this.notice.style)
    },

    text () {
      return {
        id: this.number,
        val: this.notice.value.list[this.number]
      }
    }

  },
  watch: {},
  components: { LayoutIcon },
  beforeDestroy () {
    this.pauseAn()
  },
  methods: {
    restartAn () {
      this.$nextTick(function () {
        this.startAn()
      })
    },
    startAn: function () { // 开始
      const _self = this
      const res = uni.getSystemInfoSync()
      // this.fullWidth = res.screenWidth;

      let width = res.screenWidth// document.getElementById('canvas').offsetWidth;

      const query = uni.createSelectorQuery().in(this)
      query.select('#content').boundingClientRect(data => {
        width = data.width
      }).exec()

      _self.an = setInterval(() => {
        if (_self.marginLeft * (-1) > width) {
          _self.marginLeft = _self.fullWidth
        }
        _self.marginLeft -= 2
      }, _self.time)
    },
    stopAn: function () { // 停止
      this.prevLeft = this.marginLeft
      this.marginLeft = this.fullWidth
      clearInterval(this.an)
      // this.$emit('on-stop-An');
    },
    pauseAn: function () { // 暂停动画
      clearInterval(this.an)
    },
    itemClick: function (item, e) {
      this.$emit('on-item-click', item)
    }
    // startMove() {
    //   let _self = this;
    //   setTimeout(function () {
    //     if (_self.number === _self.notice.value.list.length - 1) {
    //       _self.number = 0;
    //     } else {
    //       _self.number += 1;
    //     }
    //     _self.startMove();
    //   }, 2000)
    // },

  },
  mounted () {
    // this.$nextTick().then(res => {
    //   this.startMove()
    // })

  },
  created () {
    const _self = this
    const res = uni.getSystemInfoSync()
    // this.fullWidth = res.screenWidth;
    this.fullWidth = res.screenWidth// document.getElementById('canvas').offsetWidth;
    this.marginLeft = this.fullWidth

    this.notice = this.confData

    this.$nextTick(function () {
      this.startAn()
    })
  }
}
</script>

<style scoped lang="scss">
  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s linear;
  }

  .slide-leave-to {
    opacity: 0.1;
    transform: translateY(-20px);
  }

  .slide-enter {

    transform: translateY(20px);
  }

  .inner-container {
    height: 36px
  }

  .text2 {
    display: flex;
    overflow: hidden;

    line-height: 36px;
    font-size: 14px;
  }

  .tip {
    padding: 0 10px;

  }

  .content {
    flex: 1;
    text-overflow: ellipsis;
  }

  .wrap {
    background: white;

  }

  .content {
    padding:6px 10px;height:28px;width:750rpx;overflow: hidden;box-sizing: border-box;
  }

  .icon {
    font-size: 16px;
    margin-right: 10px;

    /*color: #ff732e;*/
  }

  .title {
    color: #666;
    font-size: 14px;
    line-height: 20px;
    height: 20px;
    overflow: hidden;
    position: relative;

    .content-box {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      white-space: nowrap;
    }
  }

</style>
