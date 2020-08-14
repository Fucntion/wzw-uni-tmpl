<template>
  <div class="goods wrap" id="goods" v-if="loadFinish && goodsList.length>0"
       :style="{background:goods.style.bgColor,paddingLeft:goods.style.wrapmargin+'px',paddingRight:goods.style.wrapmargin+'px'}">
    <div :class="className">
      <ul class="list">
        <li @click="goDetail(item)" v-for="(item,idx) in goodsList" :key="idx" class="item"
            :class="[idx%2==0?'even':'odd',goods.config.radius=='round'?'round':'',goods.config.showmode]"
            :style="[itemMarginObj(idx)]">
          <div class="cover"
               :style="{width:itemw,height:itemH,backgroundSize:goods.config.fill?goods.config.fill:'cover',backgroundImage:'url('+domainFunc(item.ImgPath)+')'}">
            <div v-show="goods.config.attr && goods.config.attr.tag.show"
                 :class="goods.config.attr.tag.style"
                 v-if="['new','hot'].indexOf(goods.config.attr.tag.style)!=-1" class="tag">
              {{goods.config.attr.tag.style=='hot'?'hot':'new'}}
            </div>
            <div v-show="goods.config.attr.tag.show" v-else class="tag img"><img
              :src="goods.config.attr.tag.img|domain" /></div>

            <div v-if="goods.config.style!=3" class="stamp">距{{item.countdown.is_start?'结束':'开始'}}<span
              class="countdown_tag2">{{item.countdown.d|zero}}</span>天<span class="countdown_tag">{{item.countdown.h|zero}}</span>时<span
              class="countdown_tag">{{item.countdown.m|zero}}</span>分<span class="countdown_tag">{{item.countdown.s|zero}}</span>秒<span
              class="count" v-if="goods.config.style==1">秒杀库存{{item.stock}}</span></div>

            <span class="count" v-if="goods.config.style==3">库存{{item.stock}}</span>

          </div>
          <div class="info" :style="{width:goods.config.style==2?itemw:''}" :class="{empyInfo:isEmpeyInfo}">
            <div class="left">
              <div v-show="goods.config.attr.title.show" class="title">{{item.Products_Name}}</div>
              <div v-show="goods.config.attr.desc.show" class="fz-12 graytext desc">
                {{item.Products_BriefDescription||'暂无介绍'}}
              </div>
              <div v-if="goods.config.style!=1" v-show="goods.config.attr.price.show" class="price"><span
                class="graytext2 fz-12">秒杀价 </span><span class="sign">￥</span><span style="font-weight: 600">{{item.price}}</span><span
                class="graytext2 market-price fz-12"> ￥{{item.Products_PriceX}} </span>
              </div>
            </div>
            <div v-if="goods.config.style==3" class="stamp">距{{item.countdown.is_start?'结束':'开始'}}<span
              class="countdown_tag2">{{item.countdown.d|zero}}</span>天<span class="countdown_tag">{{item.countdown.h|zero}}</span>时<span
              class="countdown_tag">{{item.countdown.m|zero}}</span>分<span class="countdown_tag">{{item.countdown.s|zero}}</span>秒
            </div>
            <div class="bottom-box">
              <div v-if="goods.config.style==1" v-show="goods.config.attr.price.show" class="price"><span
                class="graytext2 fz-12">秒杀价 </span><span class="sign">￥</span><span
                style="font-weight: 600">{{item.price}}</span><span
                class="graytext2 market-price fz-12"> ￥{{item.Products_PriceX}} </span></div>

              <span class="count" v-if="goods.config.style==2">库存{{item.stock}}</span>
              <div v-show="goods.config.attr.buybtn.show" class="buybtn"
                   :class="'theme'+goods.config.attr.buybtn.style">
                {{item.countdown.is_start?'立即购买':'立即预订'}}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>

import { getFlashsaleList as getFlashSaleList } from '@/api/product'
import { lazyImgUrl } from '@/common'
import { getCountdownFunc, createEmptyArray, getDomain,toGoodsDetail } from '@/common/helper'

import { linkTo } from '@/common/fun'

export default {
  name: 'DiyKill',
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
      goodsList: [],
      loadFinish: false,
      infoTmpl: {
        Products_ID: 33,
        Products_Name: '商品名称',
        Products_PriceX: 99.99,
        Products_BriefDescription: '商品简介',
        ImgPath: ''
      },
      goods: {
        config: {
          attr: {
            title: {},
            desc: {},
            price: {},
            buybtn: {}, // 样式1 样式2
            tag: {} // hot new diy 第三个是图片。 都是放在商品左上角
          }
        }
      },
      fullWidth: 0
    }
  },
  computed: {
    limit () {
      if (Array.isArray(this.goods.value.cate_id) && this.goods.value.cate_id.length > 0) {
        return this.goods.value.limit
      } else if (Array.isArray(this.goods.value.list) && this.goods.value.list.length > 0) {
        return this.goods.value.list.length
      } else {
        return 20
      }
    },
    isEmpeyInfo () {
      return !this.goods.config.attr.title.show && !this.goods.config.attr.desc.show && !this.goods.config.attr.price.show && !this.goods.config.attr.buybtn.show
    },
    w () {
      return this.fullWidth + 'px'
    },
    itemw () {
      let full = this.fullWidth

      if (this.goods.config.showmode === 'border-bgwhite') {
        full -= 4// 4个边框
      }

      if (this.goods.config.style === 2) {
        // 内边不是乘以3 而是1
        return (full - this.goods.style.wrapmargin * 2 - this.goods.style.margin * 1) / 2 + 'px'
      }

      if (this.goods.config.style === 1) {
        // 内边不是乘以3 而是1
        return (full - this.goods.style.wrapmargin * 2) + 'px'
      }

      if (this.goods.config.style === 3) {
        // 内边不是乘以3 而是1
        return 200 + 'rpx'
      }

      if (this.goods.config.style === 4) {
        return full / 3 + 'px'
      }
      return 'auto'
    },
    itemH () {
      let full = this.fullWidth
      const ratio = this.goods.config.ratio ? this.goods.config.ratio : 1
      let num = 0

      if (this.goods.config.showmode === 'border-bgwhite') {
        full -= 4// 4个边框
      }
      if (this.goods.config.style === 2) {
        // 内边不是乘以3 而是1
        num = (full - this.goods.style.wrapmargin * 2 - this.goods.style.margin * 1) / 2
      }

      if (this.goods.config.style === 3) {
        // 内边不是乘以3 而是1
        num = 200
        return num * ratio + 'rpx'
      }

      if (this.goods.config.style === 1) {
        // 内边不是乘以3 而是1
        num = full - this.goods.style.wrapmargin * 2
      }

      if (this.goods.config.style === 4) {
        num = full / 3
      }
      if (num > 0) {
        return num * ratio + 'px'
      }
      return 'auto'
    },

    className () {
      // 利用这样的方式，传入className box +style1/2/3/4
      return 'style' + this.goods.config.style + ' box'
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
  watch: {
    'goods.value': {
      immediate: true,
      deep: true,
      handler (val) {
        const _self = this

        if (!val) return
        const { list = [], cate_id = [], limit } = val

        // if(!cate_id)cate_id = []

        // 如果值还没有设置的话
        if (list.length === 0 && cate_id.length === 0) {
          return
        }

        this.goodsList = createEmptyArray(list.length, { countdown: {} })// 空对象

        const param = { pageSize: this.limit }// cate_id.length===0 && limit ? limit : 900}

        // 拼团
        // param.pintuan_flag = 1;
        param.Products_ID = list.join(',')

        getFlashSaleList(param).then(res => {
          this.goodsList = res.data.map(item => {
            item.countdown = {}
            return item
          })

          this.loadFinish = true
        })
      }
    }

  },
  components: {},
  methods: {
    stampFunc () {
      for (var item of this.goodsList) {
        // let start_timeStamp = item.pintuan_start_time,end_timeStamp = item.pintuan_end_time;
        const data = getCountdownFunc({
          start_timeStamp: item.start_time,
          end_timeStamp: item.end_time
        })
        this.$set(item, 'countdown', data)
      }
      // let start_timeStamp = item.pintuan_start_time,end_timeStamp = item.pintuan_end_time;
      //
      // let data = getCountdownFunc({start_timeStamp,end_timeStamp}),rt = null;
      // switch (type) {
      //   case 'd':
      //     rt = data.d;
      //     break;
      //   case 'h':
      //     rt = data.h;
      //     break;
      //   case 'm':
      //     rt = data.m;
      //     break;
      //   case 's':
      //     rt = data.s;
      //     break;
      //   case 'is_start':
      //     rt = data.is_start?'结束':'开始';
      //     break;
      // }

      // return rt;
    },
    goDetail (goods) {
      toGoodsDetail(goods)
      // Products_ID=243
      // const linkObj = {
      //   link: '/pages/detail/spikeDetail?flashsale_id=' + goods.id,
      //   linkType: 'default'
      // }

      // linkTo(linkObj)
    },
    itemMarginObj (idx) {
      const conf = this.goods.style.margin
      let { left = conf, top = conf, bottom = 0, right = conf } = {}
      // {marginBottom:tool.style.margin+'px',marginLeft:idx%2==0?tool.style.margin:tool.style.margin/2+'px',marginRight:idx%2==0?tool.style.margin/2:tool.style.margin+'px'}
      switch (this.goods.config.style) {
        case 1:
          // top = 0;
          left = 0
          right = 0
          break
        case 4:
          // top = 0;
          bottom = 0
          left = 0
          break
        case 3:
          // top = 0;
          left = 0
          right = 0
          break
        case 2:

          // top = 0;
          left = idx % 2 === 0 ? 0 : conf / 2
          right = idx % 2 === 0 ? conf / 2 : 0
          break
      }

      if (idx === 0) top = 0
      // 这个需要是2
      if (idx === 1 && this.goods.config.style === 2) top = 0
      return {
        marginTop: top + 'px',
        marginBottom: bottom + 'px',
        marginLeft: left + 'px',
        marginRight: right + 'px'
      }
    },
    getPic (jsonstr) {
      if (!jsonstr) return ''
      const obj = JSON.parse(jsonstr)
      if (!obj || !obj.ImgPath || obj.ImgPath.length < 1) return ''

      return getDomain(obj.ImgPath[0])
    },
    domainFunc (url) {
      if (!url) {
        return lazyImgUrl// 展位图替换掉吧。。
      }

      return getDomain(url)
    }

  },
  created () {
    const res = uni.getSystemInfoSync()
    this.fullWidth = res.screenWidth

    this.goods = this.confData

    setInterval(this.stampFunc, 1000)
  }

}
</script>

<style scoped lang="scss">

  .wrap {
    background: #f8f8f8;
  }

  .bgimg {

  }

  //无边框白底 有边框白底 无边框透明底
  .noborder-bgwhite {

  }

  .border-bgwhite {

    border: 1px solid #e3e3e3;
  }

  .noborder-nobg {
    .info {
      background: none !important;
    }
  }

  *::-webkit-scrollbar {
    display: none !important;
  }

  .cover {
    @include cover-img();
    height: 100%;
  }

  ul, li {
    @include rest;
    display: block;
  }

  .empyInfo {
    padding: 0 !important;
  }

  .buybtn {
    color: #444;
    padding: 2px 14px;
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    background: #ff4444;
    color: white;
    /*border: 1px solid #409EFF;*/

    &.theme1 {
      background: #ff4444;
      color: white;
      border-radius: 1px;
    }

    &.theme2 {
      color: #ff4444;
      background: white;
      border: 1px solid #ffacac;
    }
  }

  .tag {
    position: absolute;
    left: 0px;
    top: 0px;
    background: red;
    height: 20px;
    line-height: 20px;
    color: white;
    text-align: center;
    padding: 0 8px;
    border-radius: 0 0 4px 0;
    font-size: 12px;

    &.img {
      background: none;

      img {
        position: absolute;
        width: 16px;
        height: 16px;
        left: 0;
        top: 0;
      }
    }
  }

  .market-price {
    text-decoration: line-through;
    padding-left: 10px;
  }

  //在cover里面的
  .cover {
    .stamp {
      font-size: 12px;
      background: rgba(0, 0, 0, .5);
      padding: 6px 2px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      color: #fff;

      .countdown_tag {
        background: #F43131;
        color: white;
        padding: 0 2px;
      }

      .count {
        float: right;
      }
    }
  }

  .style3 {
    .count {
      font-size: 12px;
      background: rgba(0, 0, 0, .5);
      padding: 2px;
      position: absolute;
      right: 0;
      bottom: 0;
      color: #fff;

    }
  }

  .style2 {
    .count {
      font-size: 12px;
      color: #999;
    }
  }

  //在info里面的
  .info {
    .stamp {
      font-size: 12px;

      margin: 6px 0 10px;
      color: #666;

      .countdown_tag {
        background: #F43131;
        color: white;
        padding: 0 2px;
      }
    }
  }

  .round {
    border-radius: 2%;
    overflow: hidden;
  }

  .desc {
    height: 12px;
    line-height: 12px;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  @import "../../assets/goods.scss";

</style>
