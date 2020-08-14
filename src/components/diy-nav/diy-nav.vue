<template>
  <view class="nav wrap" :style="{background:style.bgColor}">
    <view class="box style1" v-if="nav.value.list">
      <view class="list" :class="displayStyle" :style="{display:nav.value.list.length<6?'flex':'block'}">
        <view @click="go(item)" v-for="(item,idx) in nav.value.list" :key="idx" class="item"
              :style="{flex:nav.value.list.length<6?'1':''}">
          <view v-if="nav.config.type===1" class="cover"
                :style="{backgroundImage:'url('+domainFunc(item.img)+')'}">
          </view>
          <view class="title" :style="{color:style.color}">{{item.title}}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>

import { getDomain } from '@/common/helper'
import { linkTo } from '@/common/fun'

export default {
  name: 'DiyNav',
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
      nav: {
        value: {
          list: []
        }
      }
    }
  },
  computed: {
    displayStyle () {
      return this.nav.value.list.length < 6 ? 'isflex' : 'isblock'
    },
    className () {
      return 'style1'// +this.nav.config.style
    },
    style () {
      return this.nav.style// deepCopyStrict(this.coupon.styleDefault, this.coupon.style);
    }
  },
  filters: {
    str2num (val) {
      return parseInt(val)
    }
  },
  watch: {},
  components: {},
  methods: {
    go (item) {
      linkTo(item)
    },
    domainFunc (url) {
      return getDomain(url)
    }

  },
  created () {
    this.nav = this.confData
  }
}
</script>

<style scoped lang="scss">

  .wrap {

    padding: 0 10px;
  }

  .box {
    .list {

      .item {
        // margin-right: 15px;
        text-align: center;
        cursor: pointer;

        .cover {
          @include cover-img(contain, 0, none);

          width: 36px;
          height: 36px;
          margin: 6px auto;
        }

        .title {
          height: 22px;
          line-height: 22px;
          text-align: center;
          font-size: 14px;
          /*color: #444;*/
        }
      }
    }
  }

  .style1 {

    .list {

      &.isflex {
        .item {
          .cover {
            /*width: 44px;*/
            /*height: 44px;*/
          }
        }
      }

      &.isblock {
        white-space: nowrap;
        overflow-x: scroll;

        .item {
          margin-right: 15px;
          padding: 0 6px;
        }
      }

      .item {
        display: inline-block;
        /*height: 70px;*/
        overflow-y: hidden;
        /*max-width: 50px;*/

        .title {
          overflow-y: hidden;
          /*text-overflow: ellipsis;*/
        }
      }
    }
  }

</style>
