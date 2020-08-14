<template>
  <div class="defaults">
    <image :src="'/static/client/defaultImg.png'|domain"></image>
  </div>
</template>

<script>
export default {
  name: 'wzw-empty-img',
  data () {
    return {}
  },
}
</script>
<style lang="scss" scoped>
  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    margin-top: 100rpx;
  }
</style>
