<template>
  <div class="err-msg" :style="{top:topStr}" v-if="isShow && errsList && errsList.length>0" @click="hide">
    <div v-for="(row,idx) in errsList" class="item" :key="idx">
      <div class="row"><span class="p-r-4">*</span><span>{{row.message || row}}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'funErrMsg',
  props: {
    topStr: {
      type: String,
      default: '0px'
    },
    errs: {
      default: [],
      require: true
    }
  },
  data () {
    return {
      isShow: false,
      errsList: []
    }
  },
  watch: {
    errs: {
      handler (newVal) {
        console.log(newVal, newVal && Array.isArray(newVal) && newVal.length > 0)
        if (newVal && Array.isArray(newVal) && newVal.length > 0) {
          this.errsList = newVal.concat([])
          this.isShow = true
          setTimeout(() => {
            this.isShow = false
          }, 4000)
        }
      },
      deep: true
    }
  },
  methods: {
    show () {
      this.isShow = true
    },
    hide () {
      this.isShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .err-msg {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 199;
    width: 100%;
    background: $fun-red-color;
    color: #fff;
    font-size: 12px;
    padding: 10px 15px;
    box-sizing: border-box;
    text-align: left;
  }

  .item {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }

    .label {

    }

    .content {
      .row {
        margin-top: 6px;

        &:last-child {
          margin-top: 0;
        }
      }
    }
  }
</style>
