<style lang="scss" scoped>
.page-full-loading{
  position: fixed;
  z-index: 199;
  background-color: #fff;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image{
  width: 80px;
  height: 80px;
}
</style>
<template>
<div class="page-full-loading" v-if="isShow">
  <image class="image" src="/static/spinner.gif"></image>
</div>
</template>
<script>
export default {
  name: 'layout-page-loading',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  watch: {
    show: {
      immediate: true,
      handler (nval) {
        console.log('nvalnvalnvalnvalnval is',nval)
        this.isShow = nval === true
      }
    }
  },
  methods: {
    showFn () {
      this.isShow = true
    },
    closeFn () {
      this.isShow = false
    }
  }

}
</script>
