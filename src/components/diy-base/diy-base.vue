<template>
  <view class="base wrap">
    <view v-if="base.config.style==2" class="cover style2"
          :style="{backgroundImage:'url('+domainFunc(base.config.cover)+')'}">
      <div class="logotitle">
        <div class="flex">
          <img class="logo" style="margin-top: 8px" :src="info.ShopLogo|domain" />
          <div class="title">
            <div style="line-height: 32px">{{info.ShopName}}</div>
            <div class="flex" style="line-height: initial">
              <div class="total fz-12">全部商品{{info.prod_total}}</div>
              <div class="new fz-12" style="margin-left: 4px;"> 上新{{info.prod_isnew_total}}</div>
            </div>
          </div>
        </div>
      </div>
      <view v-if="base.config.style===2" class="round">
        <view class="mask"
              :style="{height:3.5933*W+'px',width:3.5933*W+'px',backgroundSize:W+'px',backgroundImage:'url('+domainFunc(base.config.cover)+')'}"></view>
      </view>
    </view>
    <view v-else class="cover style1" :style="{backgroundImage:'url('+domainFunc(base.config.cover)+')'}">
      <div class="logotitle">
        <div class="flex">
          <img class="logo" style="margin-top: 8px" :src="info.ShopLogo|domain" />
          <div class="title">
            <div style="line-height: 32px">{{info.ShopName}}</div>
            <div class="flex" style="line-height: initial">
              <div class="total fz-12">全部商品{{info.prod_total}}</div>
              <div class="new fz-12" style="margin-left: 4px;"> 上新{{info.prod_isnew_total}}</div>
            </div>
          </div>
        </div>
      </div>
      <!--      <view v-if="base.config.style===2" class="round">-->
      <!--        <view class="mask" :style="{height:3.5933*W+'px',width:3.5933*W+'px',backgroundSize:W+'px',backgroundImage:'url('+domainFunc(base.config.cover)+')'}"></view>-->
      <!--      </view>-->
    </view>

  </view>
</template>
<script>
import { getProductCountInfo } from '@/api/common'
import { getDomain } from '@/common/helper'

export default {
  name: 'DiyBase',
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
      base: {},
      info: {}
    }
  },
  computed: {
    className () {
      return 'style' + this.base.config.style
    },
    W () {
      const res = uni.getSystemInfoSync()
      return res.screenWidth ? res.screenWidth : 375
    },
    style () {
      // return deepCopyStrict(this.coupon.styleDefault, this.coupon.style);
    }

  },
  filters: {
    str2num (val) {
      return parseInt(val)
    }
  },
  watch: {},

  methods: {
    domainFunc (url) {
      return getDomain(url)
    }

  },
  created () {
    this.base = this.confData

    getProductCountInfo().then(res => {
      this.info = res.data
    })
  }
}
</script>

<style scoped lang="scss">

  .wrap {
    overflow: hidden;
    position: relative;
  }

  .cover {
    @include cover-img();
    height: 100%;
  }

  .style1 {
    height: 160px;
    color: white;
    position: relative;
    background-color: #d2dee7;

    .logotitle {
      position: absolute;
      left: 30px;
      bottom: 20px;
      /*display: flex;*/
    }

    .logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .title {
      /*line-height: 40px;*/
      margin-left: 10px;
    }

    .desc {
    }

    .total {
    }

    .new {
    }
  }

  .style2 {
    height: 185px;
    color: white;
    position: relative;
    background: none !important;
    /*border: 1px solid black;*/
    /*border-bottom-right-radius: 50% 15%;*/
    /*border-bottom-left-radius: 50% 15%;*/
    /*border-top: none;*/
    /*overflow: hidden;*/

    .round {
      position: absolute;
      bottom: 0px;
      left: 0;
      right: 0;
      height: 40px;
      /*overflow: hidden;*/
      background: none;
      /*z-index: 0;*/

      .mask {
        position: absolute;
        background-position: bottom center;

        /*background-repeat: no-repeat;*/
        border-radius: 50%;
        left: 50%;
        bottom: 0px;
        transform: translateX(-50%)
      }
    }

    .logotitle {
      position: absolute;
      left: 30px;
      bottom: 50px;
      display: flex;
      z-index: 3;
    }

    .logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .title {
      line-height: 40px;
      margin-left: 10px;
    }

    .desc {
    }

    .total {
    }

    .new {
    }
  }

</style>
