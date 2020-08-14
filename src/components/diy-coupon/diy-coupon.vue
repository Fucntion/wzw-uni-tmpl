<template>
  <div class="coupon coupon-list wrap" v-if="couponList.length>0" :style="{background:coupon.style.bgColor}">
    <div v-if="coupon.config.type==1 && couponList.length>0">
      <div v-if="couponList.length<4" class="list style1 style1flex">
        <div @click="getCoupon(item)" class="item" v-for="(item,idx) in couponList" :key="idx">
          <p class="title">满{{item.Coupon_Condition}}享</p>
          <p class="info"> {{item.Coupon_UseType ==
            0?item.Coupon_Discount+'折扣':'￥'+item.Coupon_Cash+'减免'}}</p>
          <!-- <p class="area">({{item.Coupon_UseArea==0?'实体店':'微商城'}})</p> -->
        </div>
      </div>
      <div v-else class="list style1 style1block">
        <div @click="getCoupon(item)" class="item" v-for="(item,idx) in couponList" :key="idx">
          <p class="title">满{{item.Coupon_Condition}}享</p>
          <p class="info"> {{item.Coupon_UseType ==
            0?item.Coupon_Discount+'折扣':'￥'+item.Coupon_Cash+'减免'}}</p>
          <!-- <p class="area">({{item.Coupon_UseArea==0?'实体店':'微商城'}})</p> -->
        </div>
      </div>
    </div>

    <div class="list style2" v-if="coupon.config.type== 2 && couponList.length>0">
      <div @click="getCoupon(item)" class="item" v-for="(item,idx) in couponList" :key="idx">
        <div class="c">
          <p v-if="item.Coupon_UseType === 0">满￥{{item.Coupon_Condition}} {{item.Coupon_Discount+'折'}}</p>
          <p v-else><span>满￥{{item.Coupon_Condition}} 减 {{item.Coupon_Cash+'元'}}</span></p>
        </div>
      </div>
    </div>
    <div class="list style3" v-if="coupon.config.type== 3 && couponList.length>0">
      <div @click="getCoupon(item)" class="item" v-for="(item,idx) in couponList" :key="idx">
        <div class="c">
          <p v-if="item.Coupon_UseType === 0">满￥{{item.Coupon_Condition}} {{item.Coupon_Discount+'折'}}</p>
          <p v-else><span>满￥{{item.Coupon_Condition}} 减 {{item.Coupon_Cash+'元'}}</span></p>
        </div>
        <div class="r">
          <div class="go">立即领取</div>
        </div>
      </div>
    </div>
    <div class="list style4" v-if="coupon.config.type== 4 && couponList.length>0">
      <div @click="getCoupon(item)" class="item" v-for="(item,idx) in couponList" :key="idx">
        <div class="c">
          <div class="cwrap">
            <p v-if="item.Coupon_UseType === 0">满￥{{item.Coupon_Condition}} {{item.Coupon_Discount+'折'}}</p>
            <p v-else><span>满￥{{item.Coupon_Condition}} 减 {{item.Coupon_Cash+'元'}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="couponList.length<1" class="text-center graytext fz-12 padding10-r">
      <!--没有优惠券-->
    </div>

  </div>
</template>
<script>
import { getCoupon, getUserCoupon } from '@/api/customer'
import { getCouponList } from '@/api/common'
import { error, hideLoading, showLoading, toast } from '@/common/fun'
import { getArrColumn } from '@/common/helper'

/**
 * 某个值是否在指定数组内存在（指定键值)
 * @param val
 * @param arr
 * @param index
 * @return {boolean}
 */
function is_index_has (val, arr, index) {
  for (var item of arr) {
    if (Number(item[index]) === Number(val)) {
      return true
    }
  }
  return false
}

export default {
  name: 'DiyCoupon',
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
      coupon: {
        value: {
          list: []
        }
      },
      isAllowCouponList: []
    }
  },
  computed: {
    // ...mapGetters(['userInfo']),
    couponList () {
      if (this.coupon.value.list.length < 1) {
        return []
      }

      const arr = []; const confData = this.coupon.value.list

      console.log(getArrColumn(this.isAllowCouponList,'Coupon_ID'), getArrColumn(confData,'Coupon_ID'))
      // 只有在允许获得的优惠券里面才可以
      for (var coupon of confData) {
        if (is_index_has(coupon.Coupon_ID, this.isAllowCouponList, 'Coupon_ID')) {
          arr.push(coupon)
        }
      }

      console.log(arr)
      return arr
    },
    style () {
      // return deepCopyStrict(this.coupon.styleDefault, this.coupon.style);
    }

  },
  filters: {},
  watch: {},
  components: {},
  methods: {
    getCoupon (couponInfo) {
      showLoading('领取中')
      getUserCoupon({ coupon_id: couponInfo.Coupon_ID }).then(res => {
        toast('领取成功')
        getCouponList({
          pageSize: 999,
          front_show: 1,
          status: 3
        }, { errtip: false }).then(res => {
          hideLoading()
          this.isAllowCouponList = res.data
        }).catch(err => {
          console.log(err.errMsg)
          hideLoading()
        })
      }, (err) => {
        hideLoading()
        error('领取优惠券失败:' + err.msg)
      })
    }
  },
  async created () {
    // console.log(this.confData)
    this.coupon = this.confData

    // 要拿到可以领取的。。
    getCouponList({
      pageSize: 999,
      front_show: 1,
      status: 3
    }, { errtip: false }).then(res => {
      this.isAllowCouponList = res.data
      // console.log(this.isAllowCouponList)
    }).catch(err => {
      error(err.msg)
    })
  }
}
</script>

<style scoped lang="scss">
  .wrap {
    padding: 0 10px 0 10px;
  }

  .list {
    .item {
      p {
        margin: 0;
        padding: 0;
      }
    }
  }

  /*.coupon-list::-webkit-scrollbar {*/
  /*  display: none;*/
  /*}*/

  /*.list::-webkit-scrollbar {*/
  /*  display: none;*/
  /*}*/

  .style4 {
    /*margin: 0 10px 0;*/
    /*padding-top: 10px;*/
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;

    .item {
      /*display: flex;*/
      display: inline-block;
      height: 70px;
      position: relative;
      margin-right: 10px;
      &:last-child{
        margin-right: 0;
      }

      &:before, &:after {
        background-image: url("/static/diy/coupon-left.png");
        content: "";
        position: absolute;
        top: 0;
        width: 15px;
        height: 100%;
        background-size: 100% 100%;
      }

      &:after {
        right: 0;
        transform: rotateY(180deg);
      }

      .l {
      }

      .c {
        margin: 0 15px;
        background-color: #e74c2c;
        padding: 10px 6px;
        box-sizing: border-box;
        color: white;
        height: 70px;
        line-height: 40px; //padding10
        text-align: center;
        font-size: 14px;

        .cwrap {
          padding: 5px;
          border: 1px solid #c1c1c1;
          /*margin: 10px;*/
        }

        /*.title {*/
        /*  font-size: 22px;*/

        /*  font-family: "Microsoft YaHei";*/

        /*  .money {*/

        /*    margin-left: 4px;*/
        /*    font-weight: 300;*/
        /*  }*/
        /*}*/
      }

      /*.r {*/
      /*  width: 120px;*/
      /*  position: relative;*/
      /*  background-size: 100% 100%;*/
      /*  background-repeat: no-repeat;*/
      /*  background-position: left center;*/

      /*  .go {*/
      /*    position: absolute;*/
      /*    left: 50%;*/
      /*    top: 50%;*/
      /*    font-size: 12px;*/
      /*    color: white;*/
      /*    transform: translate(-50%, -50%);*/
      /*  }*/
      /*}*/
    }
  }

  .style3 {
    /*margin: 0 10px 0;*/
    /*padding-top: 10px;*/

    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;

    .item {

      height: 70px;
      display: inline-block;
      margin-right: 20px;
      position: relative;
      padding-right: 100px;

      background: white;
      &:last-child{
        margin-right: 0;
      }

      &:before {
        background-image: url("/static/diy/coupon-left.png");
        content: "";
        position: absolute;
        top: 0;
        left: -10px;
        width: 10px;
        height: 100%;
        background-size: 100% 100%;
      }

      .c {

        /*margin-left: 10px;*/
        height: 70px;
        font-size: 14px;
        color: white;
        line-height: 70px;
        text-align: center;
        background-color: #e74c2c;
        padding: 0 10px;

        /*.title {*/
        /*  font-size: 22px;*/

        /*  font-family: "Microsoft YaHei";*/

        /*  .money {*/

        /*    margin-left: 4px;*/
        /*    font-weight: 300;*/
        /*  }*/
        /*}*/
      }

      .r {
        float: right;
        height: 70px;
        width: 100px;
        position: absolute;
        right: 0px;
        top: 0;
        /*position: relative;*/
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: left center;
        background-image: url('/static/diy/coupon-right.png');

        .go {
          position: absolute;
          left: 50%;
          top: 50%;
          font-size: 12px;
          color: white;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  .style2 {
    /*margin: 0 10px 0;*/
    /*padding-top: 10px;*/

    /*height: 72px;*/
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;

    .item {
      display: inline-block;
      position: relative;
      height: 70px;
      margin-right: 6px;
      /*display: flex;*/
      font-size: 16px;
      background: white;

      &:last-child{
        margin-right: 0;
      }

      &:before, &:after {
        background-image: url("/static/diy/coupon-left.png");
        content: "";
        position: absolute;
        top: 0;
        width: 10px;
        height: 100%;
        background-size: 100% 100%;
      }

      &:after {
        right: 0;
        transform: rotateY(180deg);
      }

      .c {
        font-size: 14px;
        text-align: center;
        line-height: 70px;
        color: #555;
        background-color: #e74c2c;
        color: white;
        margin: 0 10px;
        padding: 0 10px;

        .title {
          font-family: "Microsoft YaHei";

          .money {
            margin-left: 4px;
            font-weight: 300;
          }
        }
      }

    }
  }

  .style1block {
    /*height: 72px;*/
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;

    .item {
      height: 70px;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      font-size: 14px;
      display: inline-block;
      margin-right: 6px;
      background: #e74c2c;
      color: white;
      padding: 6px 20px;

      &:last-child{
        margin-right: 0;
      }

      .title {

      }

      .info {
        font-size: 12px;
        margin: 4px 0;
      }

      .area {
        font-size: 12px;
      }
    }
  }

  .style1 {
    .item {
      padding: 15px 20px !important;
    }
  }

  .style1flex {
    height: 72px;
    width: 100%;
    display: flex;

    .item {
      flex: 1;
      height: 72px;
      box-sizing: border-box;

      text-align: center;
      font-size: 14px;
      margin-right: 10px;
      background: #e74c2c;
      color: white;
      padding: 6px 20px;

      &:last-child {
        margin-right: 0;
      }

      .title {

      }

      .info {
        font-size: 12px;
        margin: 4px 0;
      }

      .area {
        font-size: 12px;
      }
    }
  }

</style>
