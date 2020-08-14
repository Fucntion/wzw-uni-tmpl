<template>
  <view class="text" @click="go">
    <view v-if="text.style"
          :style="{fontSize:text.style.fontSize+'px',color:text.style.color,background:text.style.bgColor,textAlign:text.style.textAlign}"
          class="text">{{text.value.content}}
    </view>
  </view>
</template>
<script>
import { deepCopyStrict } from '@/common/helper'
import { linkTo } from '@/common/fun'

const styleDefault = {
  color: '#333',
  bgColor: '#e6e6e6',
  fontSize: '14',
  textAlign: 'left'
}
export default {
  name: 'DiyText',
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
      text: {}
    }
  },
  computed: {
    style () {
      return deepCopyStrict(styleDefault, this.text.style)
    }

  },
  watch: {},
  components: {},
  methods: {
    go () {
      linkTo(this.text.value)
    }
  },
  created () {
    // 用这个来搞事啊
    this.text = this.confData
  }
}
</script>

<style scoped lang="stylus">
  .text
    width 100%
</style>
