<template>
  <view>
    <view v-show="ifshow" @tap="ableClose" @touchmove.stop.prevent class="popup-layer"
          :style="{backgroundColor:bgColor}"></view>
    <view @touchmove.stop.prevent v-show="ifshow"
          :class="[positions]"
          :style="{backgroundColor:mainBgColor}"
          ref="popRef" class="popup-content" @tap.stop="stopEvent">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'LayoutModal',
  model: {
    prop: 'showPop',
    event: 'change'
  },
  props: {
    bgColor: {
      type: String,
      default: 'rgba(0,0,0,.5)'
    },
    mainBgColor: {
      type: String,
      default: '#fff'
    },
    positions: {
      type: String,
      default: 'center'
    },
    showPop: {
      type: Boolean,
      default: false
    },
    // direction: {
    //   type: String,
    //   default: 'bottom' // 方向  top，bottom，left，right
    // },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      ifshow: false // 是否展示,
    }
  },
  computed: {},
  mounted () {
    if (this.showPop) {
      this.show()
    }
  },
  watch: {
    showPop (value) {
      if (value) {
        this.show()
      } else {
        this.close()
      }
    }
  },
  methods: {
    show (events) {
      this.ifshow = true
    },
    close () {
      this.ifshow = false
    },
    ableClose () {
      if (this.autoClose) {
        this.close()
        this.$emit('maskClicked')
      }
    },
    stopEvent (event) {
    },
    doSome () {

    }

  }
}
</script>

<style lang="scss" scoped>
  .popup-layer {
    position: fixed;
    z-index: 99;
    background-color: rgba(0, 0, 0, .5);
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    overflow: hidden;
  }

  .popup-content {
    padding: 10px;
    position: fixed;
    z-index: 100;
    /*background-color: #FFFFFF;*/
    //transition: all .3s ease;
    overflow: hidden;
    // border:1px solid red;
    border-radius: 6px;
    left: 50%;

    &.center {
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &.top {
      top: 10%;
      transform: translate(-50%);;
    }
  }
</style>
