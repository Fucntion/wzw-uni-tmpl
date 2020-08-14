<template>
  <view @click="toSearch" v-if="style.position==='absolute'" class="search wrap absolute" :style="[getWrapStyle]">
    <view class="box" :class="{'round':search.config.type==='round'}">
      <icon class="icon" type="search" :color="style.color" size="16" />
      <!-- <input :placeholder="placeholderText" class="input fz-14" disabled :style="{height:style.height+'px',lineHeight:style.height-8+'px',backgroundColor:style.inputBgColor,color:style.color}" /> -->
      <view class="input fz-14"
            :style="{height:style.height+'px',lineHeight:style.height+'px',backgroundColor:style.inputBgColor,color:style.color}">
        {{placeholderText}}
      </view>
    </view>
  </view>
  <view @click="toSearch" v-else class="search wrap" :style="[getWrapStyle]">
    <view class="box" :class="{'round':search.config.type==='round'}">
      <icon class="icon" type="search" :color="style.color" size="16" />
      <view class="input fz-14"
            :style="{height:style.height+'px',lineHeight:style.height+'px',backgroundColor:style.inputBgColor,color:style.color}">
        {{placeholderText}}
      </view>
    </view>
  </view>
</template>
<script>
import { linkTo } from '@/common/fun'

const styleDefault = {
  // bgColor: '#fff',
  // height: 30,
  // color: '#444',
  // inputBgColor: '#f2f2f2',
  // position:'inherit',
  // x:0,
  // y:0
}
export default {
  name: 'DiySearch',
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
      search: {}
    }
  },
  computed: {
    placeholderText () {
      if (this.search.value && this.search.value.hot) {
        return this.search.value.hot.join(' ')
      }
      return ''
    },
    getWrapStyle () {
      if (this.style && this.style.position === 'absolute') {
        return {
          background: this.style.bgColor,
          // left:this.style.x+'px',
          top: this.style.y + 'px',
          position: 'absolute'
        }
      }

      return {
        background: this.style.bgColor,
        position: 'inherit'
      }
    },
    style () {
      if (this.search && this.search.style) {
        return this.search.style
      }
      return {}
    }

  },
  filters: {
    placeholderStr (hot) {
      const str = hot.join(' ')
      if (str) return str
      return '请输入内容'
    }
  },
  watch: {},
  components: {},
  methods: {
    toSearch () {
      // let path = '/pages/classify/search'
      const path = '/pages/search/index?keyword=' + this.placeholderText
      linkTo({
        link: path,
        linkType: 'default'
      })
    }
  },
  mounted () {
  },
  created () {
    this.search = this.confData
  }

}
</script>

<style scoped lang="scss">

  .wrap {
    width: 100%;
    padding: 10px 0;

    &.absolute {
      /*&:hover{*/
      /*  border: 1px dashed #298df8;*/
      /*}*/

      /* #ifdef APP-PLUS */
      margin-top: var(--status-bar-height);
      /* #endif */

      box-sizing: border-box;
      z-index: 2;
    }

    .box {
      margin: 0 15px;
      position: relative;

      .input {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #DCDFE6;
        padding: 0 30px;

        &::placeholder {
          color: #999;
        }
      }

      .icon {
        position: absolute;
        top: 50%;
        width: 30px;
        transform: translateY(-50%);
        -webkit-transition: all .3s;
        text-align: center;
        color: #C0C4CC;
      }
    }

    .round {
      .input {
        border-radius: 4px;
      }
    }
  }

</style>
