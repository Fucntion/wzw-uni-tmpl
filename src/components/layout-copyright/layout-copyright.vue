<style lang="scss" scoped>
  .wrap {
    text-align: center;
    padding: 20rpx;

    .logo {
      margin-bottom: 20 rx;
      width: 76rpx;
      height: 30rpx;
    }

    .text {
      font-size: 24rpx;
      color: #999;
    }
  }
</style>
<template>
  <div class="wrap" v-if="!isCustom">
    <img class="logo" :src="'/static/client/copyright.png'|domain" />
<!--    <p class="text">真产品聚划算就在网中网</p>-->
  </div>
</template>
<script>
import ENV from '@/common/env'
export default {
  name: 'LayoutCopyright',
  data () {
    return {
      isCustom: ENV.isCustom
    }
  }
}
</script>
