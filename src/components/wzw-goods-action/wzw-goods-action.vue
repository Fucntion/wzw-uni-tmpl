<template>
  <div>
    <div class="bottom-last flex flex-justify-between">
      <div class="left-bottom">
        <div class="bottom-q" @click="goStore">
          <div style="display: flex;justify-content: center;margin-bottom: 6rpx">
            <layout-icon type="iconicon-home" size="22" color="#666666"></layout-icon>
          </div>
          <div>
            进店
          </div>
        </div>
<!--        <div class="bottom-q" @click="goShare">-->
<!--          <div style="display: flex;justify-content: center;margin-bottom: 6rpx">-->
<!--            <layout-icon type="iconicon-share" size="20" color="#666666"></layout-icon>-->
<!--          </div>-->
<!--          <div>-->
<!--            分享-->
<!--          </div>-->
<!--        </div>-->
        <div class="bottom-q" @click="toIm">
          <div style="display: flex;justify-content: center;margin-bottom: 6rpx">
            <layout-icon weight="bold" type="iconicon-test1" size="20" color="#666666"></layout-icon>
          </div>
          <div>
            客服
          </div>
        </div>
        <div class="bottom-q" @click="tofavorite">
          <div style="display: flex;justify-content: center;margin-bottom: 6rpx">
            <layout-icon v-if="isFavorite" weight="bold" type="iconshoucang18-copy" size="20" color="#ff0000"></layout-icon>
            <layout-icon v-else weight="bold" type="iconicon-favorite" size="20" color="#666666"></layout-icon>

          </div>
          <div>
            收藏
          </div>
        </div>
      </div>
      <div class="bottom-btn">
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutIcon from '@/components/layout-icon/layout-icon.vue'
import { linkToEasy } from '@/common/fun'

export default {
  components: { LayoutIcon },
  props: {
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    bindLeftClick () {
      this.$emit('bindLeftClick')
    },
    bindRightClick () {
      this.$emit('bindRightClick')
    },
    toIm () {
      // linkToEasy('/pagesA/support/Im')
      // linkToEasy('/pages/demo')
      this.$emit('goIM')
    },
    tofavorite () {
      this.$emit('tofavorite')
    },
    goStore () {
      this.$emit('goStore')
    },
    goShare () {
      this.$emit('goShare')
    }
  }
}
</script>

<style lang="scss" scoped>
  .bottom-last {
    width: 750rpx;
    height: 106rpx;
    padding: 10rpx 10rpx 10rpx 0;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    box-sizing: border-box;
    align-items: center;
  }

  .left-bottom {
    height: 86rpx;
    display: flex;
    align-items: center;
    //flex:1;
    width: 306rpx;
    //padding-left: 54rpx;
  }

  .bottom-q {
    font-size: 12px;
    color: #666666;
    //width: 80rpx;
    flex: 1;
    text-align: center;
  }

  .left-btn {
    width: 214rpx;
    height: 86rpx;
    line-height: 86rpx;
    text-align: center;
    border-radius: 42rpx;
    color: #fff;
    background: #85D4B8;//行内可以覆盖
  }

  .right-btn {
    margin-left: 10rpx;
    width: 240rpx;
    height: 86rpx;
    line-height: 86rpx;
    text-align: center;
    color: #fff;
    border-radius: 42rpx;
    background: #26C78D;//行内可以覆盖
  }

  .bottom-btn {
    display: flex;
    align-items: center;
  }

  .price-q {
    font-size: 12px;
    color: #ffffff;
  }

  .price-w {
    font-size: 15px;
    color: #ffffff;
  }

  .price-e {
    font-size: 13px;
    color: #ffffff;
  }

  .price-r {
    font-size: 17px;
    color: #ffffff;
  }

</style>
