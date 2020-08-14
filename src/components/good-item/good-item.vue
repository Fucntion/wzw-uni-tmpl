<style scoped lang="scss">
.product-panel{
  &.left-right{
    display: flex;
    align-items: center;
    .product-info{
      margin-left: 10px;
      flex: 1;
    }
  }
  &.top-bottom{

  }
}

.product-title{
  overflow: hidden;
  text-overflow: ellipsis;
  /*line-height: 1.3;*/
}

//如果父组件要覆盖样式，那么自己用deep就好了
.product-cover{
  @include cover-img();
  /*width: 300rpx;*/
  /*height: 300rpx;*/
}
</style>
<template>
  <div class="product-panel" :class="[mode]" :style="{marginBottom}" @click="clickFn(vo)">
    <slot name="cover">
      <div class="product-cover" :style="{width:coverWidth,height:coverWidth,backgroundImage:'url('+getDomainUrl(vo.ImgPath)+')',borderRadius:coverRadius}" ></div>
    </slot>
    <div class="product-info">
      <slot name="title"><div class="product-title c3 m-t-10 m-b-10" :style="{FontSize:titleFontSize,height:titleBoxHeight,lineHeight:titleLineHeight}"><wzw-live-tag :room_id="vo.room_id" :product-info="vo" />{{vo.Products_Name}}</div></slot>
      <slot name="sales"><div v-if="sales" class="sales c9 fz-14">已售{{vo.Products_Sales}}件</div></slot>
      <div class="price-box">
        <slot name="sellingPrice">
          <span class="price-selling" :style="{fontSize:priceSignSize}"><span>￥</span><span class="" :style="{fontSize:priceNumSize}">{{vo.Products_PriceX}}</span></span>
        </slot>
        <slot name="marketPrice">
          <span v-if="marketPrice" class="price-market fz-12 text-through p-l-4"><span>￥</span><span>{{vo.Products_PriceY}}</span></span>
        </slot>
      </div>
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<script>
import { getDomain, getPreviewThumb, toGoodsDetail } from '@/common/helper'
import WzwLiveTag from '@/components/wzw-live-tag/wzw-live-tag'

export default {
  name: 'GoodsItem',
  components: { WzwLiveTag },
  props: {
    priceSignSize: {
      type: String,
      default: '12px'
    },
    priceNumSize: {
      type: String,
      default: '14px'
    },
    coverWidth: {
      type: String,
      default: '300rpx'
    },
    titleLineHeight: {
      type: String,
      default: '18px'
    },
    titleFontSize: {
      type: String,
      default: '14px'
    },
    coverRadius: {
      type: String,
      default: '0px'
    },
    // 文本几行
    titleRowNum: {
      type: Number,
      default: 2
    },
    marginBottom: {
      type: String,
      default: '10px'
    },
    marketPrice: {
      type: Boolean,
      default: false
    },
    sales: {
      type: Boolean,
      default: false
    },
    vo: {
      required: true,
      type: Object
    },
    // 可选值为left-right top-bottom 上下结构和左右结构
    mode: {
      type: String,
      default: 'left-right'
    },
    // 每行几个
    rowNum: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {}
  },
  computed: {
    titleBoxHeight () {
      const titleLineHeight = parseInt(this.titleLineHeight)
      return isNaN(titleLineHeight) ? 'auto' : (titleLineHeight * this.titleRowNum + 'px')
    }
  },
  methods: {
    clickFn (goods) {
      toGoodsDetail(goods)
    },
    getDomainUrl: (url) => getPreviewThumb(url)
  }
}
</script>
