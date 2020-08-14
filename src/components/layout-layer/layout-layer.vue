<template>
  <div class="popup-wrap" v-if="ifshow">
    <div @tap="ableClose" @touchmove.stop.prevent class="popup-layer" :style="{backgroundColor:bgColor,bottom:bottomStr}"></div>
    <div :class="[positions]"
         :style="{backgroundColor:mainBgColor,borderTopLeftRadius:radius,borderTopRightRadius:radius,bottom:bottomStr}" ref="popRef" class="popup-content"
         @tap.stop="stopEvent">
      <slot name="title"><div v-if="title" class="p-10 text-center c4">{{title}}</div></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutLayer',
  props: {
    title: {
      type: String
    },
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
      default: 'bottom'
    },
    extClass:{
      type:String,
      default:''
    },
    bottomStr: {
      type: String,
      default: ''
    },
    showPop: {
      type: Boolean,
      default: false
    },
    radius: {
      type: String,
      default: '0px'
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      ifshow: false
    }
  },
  mounted () {
    if (this.showPop) {
      this.show()
    }
  },
  watch: {
    positions (newVal) {
    },
    showPop (value) {
      if (value) {
        this.show()
      } else {
        this.close()
      }
    }
  },
  methods: {
    show () {
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
    }
  }
}
</script>
<style lang="scss" scoped>
  .popup-wrap{
    width: 750rpx;
  }
  .popup-layer {
    position: fixed;
    z-index: 99;
    background-color: rgba(0, 0, 0, .5);
    width: 100%;
    top: 0px;
    left: 0px;
    bottom: 0px;
    overflow: hidden;
  }

  .popup-content {
    position: fixed;
    z-index: 102;
    overflow: hidden;
  }

  .center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .top-center {
    top: 20%;
    left: 50%;
    transform: translate(-50%);
  }

  .top {
    top: 10%;
    left: 50%;
    transform: translate(-50%);
  }

  .bottom {
    bottom: 0;
    left: 0;
  }
</style>
