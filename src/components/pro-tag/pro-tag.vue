<template>
  <div class="product" @click="openNext" :style="{marginRight:index%2===0?'50rpx':'0rpx'}">
    <div :style="{backgroundImage:'url('+getPreviewThumb(pro_src,'-r400')+')'}" class="pro-img"></div>
    <div class="pro-name"><wzw-live-tag :room_id="productInfo.room_id" :product-info="productInfo" />{{pro_name}}</div>
    <div class="pro-price flex">
      <div class="new-price">
        <div class="small-font">￥</div>
        {{pro_price}}
      </div>
      <div class="old-price small-font">￥{{pro_price_old}}</div>
    </div>
  </div>
</template>
<script>
import { linkToEasy } from '@/common/fun'
import {getPreviewThumb} from '@/common/helper'
import WzwLiveTag from '@/components/wzw-live-tag/wzw-live-tag'

export default {
  components: { WzwLiveTag },
  props: {
    productInfo: {
      required: true,
      type: Object,
      default: () => {
        return { room_id: 0 }
      }
    },
    prod_id: {
      type: String,
      default: ''
    },
    index: {
      type: Number
    },
    pro_src: {
      type: String,
      default: ''
    },
    pro_name: {
      type: String,
      default: ''
    },
    pro_price: {
      type: [String, Number],
      default: '0.00'
    },
    pro_price_old: {
      type: [String, Number],
      default: '0.00'
    }
  },
  methods: {
    getPreviewThumb,
    openNext () {
      const url = '/pages/product/detail?prod_id=' + this.prod_id
      linkToEasy(url)
    }
  }
}
</script>
<style lang="scss" scoped>
  .product {
    width: 310rpx;
    margin-bottom: 50rpx;

    .pro-img {
      display: block;
      width: 310rpx;
      height: 310rpx;
      border-radius: 6rpx;
      @include cover-img();
    }

    .pro-name {
      font-size: 26rpx;
      color: #333;
      margin: 20rpx 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .pro-price {
      align-items: center;
    }

    .small-font {
      display: inline;
      font-size: 24rpx;
    }

    .new-price {
      color: #E41515;
      font-size: 34rpx;
      margin-right: 10rpx;
    }

    .old-price {
      color: #AFAFAF;
      text-decoration: line-through;
    }
  }
</style>
