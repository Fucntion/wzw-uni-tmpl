<template>
  <view :style="{height:style.height+'px',background:space.style.bgColor}" class="space">

  </view>
</template>
<script>
const styleDefault = {}
export default {
  name: 'DiySpace',
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
      space: {
        style: {}
      }
    }
  },
  computed: {
    style () {
      return this.space.style// deepCopyStrict(styleDefault, this.space.style);
    }
  },
  watch: {},
  components: {},
  methods: {},
  created () {
    // 用这个来搞事啊
    this.space = this.confData
  }
}
</script>

<style scoped lang="stylus">
  .space
    height 0
    width 100%

</style>
