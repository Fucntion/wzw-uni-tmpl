<template>
  <div class="tab wrap" :class="tab.config.position"
       :style="{background:tab.style.bgColor,margin:tab.config.position === 'left'?tab.style.wrapmargin:0+'px'}">
    <div class="tabs">
      <li :class="{active:tabActive===idx}" :id="'tab-item'+idx" @click="clickTab(item,idx)" v-for="(item,idx) in tab.value.list"><span>{{item.title}}</span></li>
    </div>
    <div class="tabs-panel">
      <div class="box" :class="[className]"
           :style="{paddingLeft:tab.style.wrapmargin+'px',paddingRight:tab.style.wrapmargin+'px'}">
        <ul class="list">
          <li v-for="(item,idx) in goodsList" @click="goDetail(item)" class="item"
              :class="[idx%2==0?'even':'odd',tab.config.radius=='round'?'round':'',tab.config.showmode]"
              :style="[itemMarginObj(idx)]"
          >
            <div class="cover"
                 :style="{width:itemw,height:itemH,backgroundSize:tab.config.fill?tab.config.fill:'cover',backgroundImage:'url('+domainFunc(item.ImgPath)+')'}">
              <div v-show="tab.config.attr.tag.show" :class="tab.config.attr.tag.style"
                   v-if="['new','hot'].indexOf(tab.config.attr.tag.style)!==-1" class="tag">
                {{tab.config.attr.tag.style=='hot'?'hot':'new'}}
              </div>
              <div v-show="tab.config.attr.tag.show" v-else class="tag img"><img
                :src="tab.config.attr.tag.img|domain" /></div>
            </div>
            <div class="info" :style="{width:itemw}" :class="{empyInfo:isEmpeyInfo}">
              <div class="left">
                <div v-show="tab.config.attr.title.show" class="title"><wzw-live-tag :room_id="item.room_id" :product-info="item" />{{item.Products_Name}}</div>
                <div v-show="tab.config.attr.desc.show" class="fz-12 graytext desc">
                  {{item.Products_BriefDescription||'暂无介绍'}}
                </div>
                <!--                <div v-show="tab.config.attr.price.show" class="price"><span class="sign">￥</span>{{item.Products_PriceX}}-->
                <!--                </div>-->
              </div>
              <div class="bottom-box">
                <div v-show="tab.config.attr.price.show" class="price"><span class="sign">￥</span>{{item.Products_PriceX}}
                </div>
                <div v-show="tab.config.attr.buybtn.show" class="buybtn"
                     :class="'theme'+tab.config.attr.buybtn.style">
                  {{tab.config.attr.buybtn.text||'购买'}}
                </div>
              </div>

            </div>
          </li>

          <!--因为参数是带了limit,所以这里不会为负数-->
          <!--          <li v-for="(item,idx) in (limit-goodsList.length)" class="item"-->
          <!--              :class="[idx%2==0?'even':'odd',tab.config.radius=='round'?'round':'',tab.config.showmode]"-->
          <!--              :style="[itemMarginObj(idx)]"-->
          <!--          >-->
          <!--            <div class="cover"-->
          <!--                 :style="{width:itemw,height:itemw,backgroundImage:'url('+domainFunc(infoTmpl.ImgPath)+')'}">-->
          <!--              <div v-show="tab.config.attr.tag.show" :class="tab.config.attr.tag.style"-->
          <!--                   v-if="['new','hot'].indexOf(tab.config.attr.tag.style)!==-1" class="tag">-->
          <!--                {{tab.config.attr.tag.style=='hot'?'hot':'new'}}-->
          <!--              </div>-->
          <!--              <div v-show="tab.config.attr.tag.show" v-else class="tag img"><img-->
          <!--                :src="tab.config.attr.tag.img|domain"/></div>-->
          <!--            </div>-->
          <!--            <div class="info" :style="{width:itemw}" :class="{empyInfo:isEmpeyInfo}">-->
          <!--              <div class="left">-->
          <!--                <div v-show="tab.config.attr.title.show" class="title">{{infoTmpl.Products_Name}}</div>-->
          <!--                <div v-show="tab.config.attr.desc.show" class="fz-12 graytext desc">-->
          <!--                  {{infoTmpl.Products_BriefDescription||'暂无介绍'}}-->
          <!--                </div>-->
          <!--                <div v-show="tab.config.attr.price.show" class="price"><span class="sign">￥</span>{{infoTmpl.Products_PriceX}}-->
          <!--                </div>-->
          <!--              </div>-->
          <!--              <div v-show="tab.config.attr.buybtn.show" class="buybtn" :class="'theme'+tab.config.attr.buybtn.style">-->
          <!--                {{tab.config.attr.buybtn.text||'购买'}}-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </li>-->
        </ul>

      </div>
    </div>

  </div>
</template>
<script>

import { getProductList } from '@/api/product'
import { getDomain, toGoodsDetail } from '@/common/helper'
import { lazyImgUrl } from '../../common'
import { linkTo } from '@/common/fun'
import WzwLiveTag from '@/components/wzw-live-tag/wzw-live-tag'

export default {
  name: 'DiyTab',
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
      infoTmpl: {
        Products_ID: 33,
        Products_Name: '商品名称',
        Products_PriceX: 99.99,
        Products_BriefDescription: '商品简介',
        ImgPath: ''
      },
      fullHeight: 0,
      tabActive: 0,
      currentTab: null,
      goodsList: [],
      tab: {
        style: {},
        value: { list: [] },
        config: {}
      },
      fullWidth: 0
    }
  },
  computed: {
    limit () {
      return this.tab.value.list[this.tabActive].cate_id ? this.tab.value.list[this.tabActive].limit : 6
    },
    goods () {
      return {}
    },
    isEmpeyInfo () {
      return this.tab.config.attr.title.show && !this.tab.config.attr.desc.show && !this.tab.config.attr.price.show && !this.tab.config.attr.buybtn.show
    },
    w () {
      return this.fullWidth
    },
    h () {
      return this.fullHeight
    },
    itemH () {
      let full = this.fullWidth
      const ratio = this.tab.config.ratio ? this.tab.config.ratio : 1
      let num = 0

      if (this.tab.config.showmode === 'border-bgwhite') {
        full -= 4// 4个边框
      }

      // 内边不是乘以3 而是1
      // 375-90-30-10 = 245px
      if (this.tab.config.style === 2) {
        if (this.tab.config.position === 'left') {
          num = (full - 90 - this.tab.style.wrapmargin * 2 - this.tab.style.margin * 1) / 2
        } else {
          num = (full - this.tab.style.wrapmargin * 2 - this.tab.style.margin * 1) / 2
        }
      }

      if (this.tab.config.style === 1) {
        // 内边不是乘以3 而是1
        num = (full - 90 - this.tab.style.wrapmargin * 2)
      }
      //
      if (this.tab.config.style === 3) {
        // 内边不是乘以3 而是1
        num = 200

        return num * ratio + 'rpx'
      }

      if (this.tab.config.style === 4) {
        num = full / 3
      }

      if (num > 0) {
        return num * ratio + 'px'
      }

      return 'auto'
    },
    itemw () {
      let full = this.fullWidth

      if (this.tab.config.showmode === 'border-bgwhite') {
        full -= 4// 4个边框
      }

      if (this.tab.config.style === 1) {
        if (this.tab.config.position === 'left') {
          return (full - 90 - this.tab.style.wrapmargin * 2) + 'px'
        }

        return (full - this.tab.style.wrapmargin * 2) + 'px'
      }

      if (this.tab.config.style === 3) {
        // return 140 + 'px';

        return 200 + 'rpx'
      }

      // 内边不是乘以3 而是1
      // 375-90-30-10 = 245px
      if (this.tab.config.style === 2) {
        if (this.tab.config.position === 'left') {
          return (full - 90 - this.tab.style.wrapmargin * 2 - this.tab.style.margin * 1) / 2 + 'px'
        }

        return (full - this.tab.style.wrapmargin * 2 - this.tab.style.margin * 1) / 2 + 'px'
      }

      if (this.tab.config.style === 4) {
        return full / 3 + 'px'
      }
      return 'auto'
    },
    className () {
      return 'style' + this.tab.config.style
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
    // 'tab.value.list':{
    //   handler(val){
    //       this.loadGoodsList()
    //   }
    // },
    currentTab: {
      deep: true,
      immediate: true,
      handler (val) {
        this.loadGoodsList()
      }
    }
  },
  components: { WzwLiveTag },
  methods: {
    goDetail (goods) {
      
      toGoodsDetail(goods)

    },
    clickTab (item, idx) {
      this.$set(this, 'tabActive', idx)
      this.$set(this, 'currentTab', item)
      // if (this.tabActive === idx) {
      //   return;
      // }
      // this.tabActive = idx
      // this.currentTab = item;
    },
    loadGoodsList () {
      const val = this.currentTab
      if (!val) return
      const { list = [], cate_id = [], limit } = val

      // 如果值还没有设置的话
      if (cate_id.length === 0) {
        this.goodsList = []
        return
      }

      const param = { pageSize: limit }// cate_id.length===0 && limit ? limit : 900}
      if (cate_id.length > 0) {
        param.Cate_ID = cate_id.join(',')
      } else {
        // param.Products_ID = list.join(',')
      }

      getProductList(param).then(res => {
        this.goodsList = res.data
      })
    },
    itemMarginObj (idx) {
      const conf = this.tab.style.margin
      let { left = conf, top = conf, bottom = 0, right = conf } = {}
      // {marginBottom:tool.style.margin+'px',marginLeft:idx%2==0?tool.style.margin:tool.style.margin/2+'px',marginRight:idx%2==0?tool.style.margin/2:tool.style.margin+'px'}
      switch (this.tab.config.style) {
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

          left = idx % 2 === 0 ? 0 : conf / 2
          right = idx % 2 === 0 ? conf / 2 : 0
          break
      }

      if (idx === 0) top = 0
      // 这个需要是2
      if (idx === 1 && this.tab.config.style === 2) top = 0

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
    const _self = this

    const res = uni.getSystemInfoSync()
    _self.fullWidth = res.screenWidth
    _self.fullHeight = res.screenHeight

    this.tab = this.confData
    this.currentTab = this.tab.value.list[0]

    this.loadGoodsList()
  }

}
</script>

<style scoped lang="scss">

  .wrap {
    background: #f8f8f8;
    position: relative;

  }

  //无边框白底 有边框白底 无边框透明底
  /*'noborder-bgwhite','border-bgwhite','noborder-nobg'*/
  .noborder-bgwhite {

  }

  .border-bgwhite {
    box-sizing: border-box;
    border: 1px solid #e3e3e3;
  }

  .noborder-nobg {
    .info {
      background: none !important;
    }
  }

  .wrap.left {
    border-bottom: 1px solid #e7e7e7;
    height: 667px;
    position: relative;

    .tabs {
      color: #444;
      width: 90px;
      overflow-x: hidden;
      /*overflow-y: scroll;*/
      position: absolute;
      left: 0;
      top: 0;
      /*bottom: 0;*/
      border-right: 1px solid #e7e7e7;

      li {
        font-size: 16px;
        display: block;

        /*text-align: center;*/
        overflow-x: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        height: 44px;
        cursor: pointer;
        text-align: center;
        color: #666;
        border-bottom: 1px solid #e7e7e7;

        &.active {
          border-left: 2px solid #f56c6c;
          color: #333;
        }

        span {

          line-height: 44px;

        }
      }
    }

    .tabs-panel {
      /*margin-left: 90px;*/
      position: absolute;
      left: 90px;
      top: 0;
      right: 0;
      height: 667px;
      overflow-x: hidden;
      overflow-y: scroll;
      /*margin-right: 10px;*/
      /*padding-top: 10px;*/
    }

  }

  .wrap.top {

    .tabs {
      color: #444;
      white-space: nowrap;
      padding: 0 10px;
      margin-bottom: 10px;
      overflow-x: scroll;
      overflow-y: hidden;

      li {
        display: inline-block;
        margin-right: 10px;
        height: 36px;
        cursor: pointer;
        color: #666;
        font-size: 16px;

        &.active {
          color: #444;

          span {
            border-bottom: 2px solid #f56c6c;
          }

        }

        span {

          line-height: 32px;
          padding-bottom: 8px;

        }
      }
    }

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

    height: 24px;
    line-height: 24px;
    color: white;
    text-align: center;
    padding: 0 8px;
    border-radius: 0 0 6px 0;
    font-size: 12px;

    &.img {
      background: none;

      img {
        position: absolute;
        width: 32px;
        height: 20px;
        left: 0;
        top: 0;
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
