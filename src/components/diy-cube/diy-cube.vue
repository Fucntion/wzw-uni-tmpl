<template>
  <div class="cube wrap" :style="{background:cube.style.bgColor}">
    <div class="box" :style="{width:fullW+'px'}">
      <div class="postion-wrap" :style="[getWrapStyle()]">
        <!--所有热区用绝对定位实现-->
        <div @click="go(area)" class="active" :data-idx="area.IDX" :style="[getAreaStyle(area)]"
             v-for="(area,aidx) in cube.value.list" :key="aidx">
          <div class="mask" :style="{backgroundImage:'url('+domainFunc(area.bgimg)+')'}"></div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

import { getDomain } from '@/common/helper'
import { linkTo } from '@/common/fun'

export default {
  name: 'DiyCube',
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
      cube: {},
      CTX: {},
      // colH:0,
      // colW:0,
      fullW: 0

    }
  },
  computed: {

    W () {
      const res = uni.getSystemInfoSync()

      return res.screenWidth - 2 * this.cube.style.wrapmargin
    },
    H () {
      const res = uni.getSystemInfoSync()
      return res.screenWidth * this.cube.config.row / this.cube.config.col
    },
    // colWH(){
    //
    //   const res = uni.getSystemInfoSync();
    //   return (res.screenWidth-2*this.cube.style.wrapmargin)/this.cube.config.row
    // },
    colH () {
      const res = uni.getSystemInfoSync()
      const Height = res.screenWidth * this.cube.config.row / this.cube.config.col
      return Height / this.cube.config.row
    },
    rowW () {
      const res = uni.getSystemInfoSync()

      return (res.screenWidth - 2 * this.cube.style.wrapmargin) / this.cube.config.col
    },
    className () {
      return 'style1'// +this.nav.config.style
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
    // 'cube.value.list':{
    //   deep:true,
    //   immediate:true,
    //   handler:function(val){
    //     if(!val ||val.length<1)return;
    //     let {rownum,colnum} = getRowColSpan(val);
    //     this.colW = (this.W) / (colnum+1)
    //     this.colH = this.fullW*(1-this.cube.style.wrapmargin/this.fullW*2) / (rownum+1)
    //   }
    // },

  },
  components: {},
  methods: {
    go (area) {
      linkTo(area)
    },
    getWrapStyle () {
      const styleObj = {
        marginLeft: this.cube.style.wrapmargin + 'px',
        marginRight: this.cube.style.wrapmargin + 'px',
        width: this.fullW * (1 - this.cube.style.wrapmargin / this.fullW * 2) + 'px',
        height: this.H + 'px'// 高度不变的
      }

      return styleObj
    },
    getAreaStyle (area) {
      const styleObj = {
        left: area.x * this.rowW + 'px',
        top: area.y * this.colH + 'px',
        width: (area.x1 - area.x) * this.rowW + 'px',
        height: (area.y1 - area.y) * this.colH + 'px',

        borderTopWidth: area.y === 0 ? 0 : this.cube.style.margin / 2 + 'px',
        borderLeftWidth: area.x === 0 ? 0 : this.cube.style.margin / 2 + 'px',
        borderRightWidth: area.x1 === this.cube.config.row ? 0 : this.cube.style.margin / 2 + 'px',
        borderBottomWidth: area.y1 === this.cube.config.row ? 0 : this.cube.style.margin / 2 + 'px'

      }
      // if(area.bgimg){
      //   styleObj.backgroundImage = 'url('+getDomain(area.bgimg)+')';
      // }
      return styleObj
    },
    domainFunc (url) {
      return getDomain(url)
    }

  },
  created () {
    this.cube = this.confData

    const res = uni.getSystemInfoSync()
    this.fullW = res.screenWidth

    // 长宽比计算出高度
    this.cube.width = res.screenWidth
    this.cube.height = res.screenWidth * this.cube.config.row / this.cube.config.col

    this.CTX = this.cube
  }
}
</script>

<style scoped lang="scss">

  .postion-wrap {
    position: relative;
    overflow: hidden;
  }

  .active {
    position: absolute;
    border: 1px #f2f2f2 solid;

    .mask {
      @include cover-img(cover, 0, #f2f2f2);
      position: absolute;
      left: 0px;
      bottom: 0px;
      right: 0px;
      top: 0px;

    }

    .img {
      /*position: absolute;*/
      /*left: 0;*/
      /*top: 0;*/
      /*width: 100%;*/
      /*height: 100%;*/
      /*vertical-align: baseline;*/
      /*opacity: 0;*/
    }

    &.act {
      border: 1px rgba(63, 142, 243, 1) solid;

      .delicon {
        visibility: visible;
      }
    }

    box-sizing: border-box;
    //border: 1px #f2f2f2 solid;

    /*background: rgba(63, 142, 243, 0.1);*/
    //box-sizing: border-box;
    /*z-index: 2;*/

    &:hover {
      .delicon {
        visibility: visible;
      }
    }

    .delicon {
      visibility: hidden;
      position: absolute;
      font-size: 20px;
      right: -10px;
      top: -10px;
      z-index: 339;
      cursor: pointer;
      color: #66b1ff;

      &:hover {
        color: #409eff;
      }
    }
  }

  .box {

    position: relative;
    min-height: 20px;
    overflow: hidden;
    //.border();

    .row {
      /*box-sizing: border-box;*/

      .column {
        display: inline-block;
        box-sizing: border-box;

        &:last-child {

          border-right: 0px;
        }

        border-right: 1px solid $fun-border-color;
        border-bottom: 1px solid $fun-border-color;

      }

      &:last-child {
        .column {
          border-bottom: 0px;
        }
      }
    }
  }
</style>
