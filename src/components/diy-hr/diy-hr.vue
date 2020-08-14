<template>
  <view :style="{paddingTop:style.margin+'px',paddingBottom:style.margin+'px'}">
    <view
      :style="{borderBottomWidth:style.height+'px',borderBottomColor:style.color,borderBottomStyle:hr.config.type}"
      class="hr"></view>
  </view>
</template>
<script>
import { deepCopyStrict } from '@/common/helper'

const styleDefault = {
  color: '#e7e7e7',
  margin: '4',
  height: '1'
}
export default {
  name: 'DiyHr',
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
      hr: {}
    }
  },
  computed: {
    style () {
      return deepCopyStrict(styleDefault, this.hr.style)
    }
  },
  watch: {},
  components: {},
  methods: {},
  created () {
    // 用这个来搞事啊
    this.hr = this.confData
  }
}
</script>

<style scoped lang="stylus">
  .hr
    height 0
    width 100%
</style>
