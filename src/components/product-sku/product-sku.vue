<template>
  <view v-if="isShow">
    <layout-popup ref="productSku" @maskClicked="closePro">
      <div class="cartSku" @touchmove.prevent.stop="noop">
        <div class="cartTop">
          <image class="image" @click="showImgDetal" :src="imgShow?imgShow+'-r200':(list.Products_JSON.ImgPath[0]?list.Products_JSON.ImgPath[0]+'-r200':'')"></image>
          <div class="cartTitle">
            <div class="cartTitles flex flex-justify-between">
              <div class=" cart-price">
                ¥<span class="fz-20 fz-b m-l-2">{{postData.price}}</span>
              </div>
              <layout-icon  color="#999999" size="21" type="iconguanbi" @click.stop="close"></layout-icon>

            </div>
            <div class="addInfo c9 m-b-10">
              库存：{{postData.count}}
            </div>
            <div class="addInfo c9" v-if="postData&&postData.id&&postData.Attr_Value_text">
              已选：{{postData.Attr_Value_text}}
            </div>
          </div>
        </div>
        <div class="cartCenter">
          <div class="cartAttr" v-for="(item,i) of list.skujosn_new" :key="i">
            <div class="sku">
              {{item.sku=='mobile_prod_attr_name'?'规格':item.sku}}
            </div>
            <div class="skuValue" v-if="gift === 0">
              <div class="skuview" :class="check_attr[item.sku]==index?'skuCheck':''" @click="selectAttr(index,item.sku)"  v-for="(mbx,index) of item.val" :key="index">{{mbx}}</div>
            </div>
            <div class="skuValue" v-else>
              <div class="skuview" :class="skuval[i]==index?'skuCheck':'unablechoose'"  v-for="(mbx,index) of item.val" :key="index">{{mbx}}</div>
            </div>
          </div>
        </div>
        <div class="numBer" v-if="gift === 0">
          <div class="numBers">
            购买数量
          </div>
          <div class="inputNumber">
            <div class="clicks m-r-1" @click="delNum">-</div>
            <input class="inputq" type="number" v-model="postData.qty" @blur="setCount">
            <div class="clicks" @click="addNum">+</div>
          </div>
        </div>
        <div class="numBer" v-else>
          <div class="numBers">
            购买数量
          </div>
          <div class="inputNumber">
            <div class="clicks m-r-1">-</div>
            <input class="inputq" type="number" value="1" disabled>
            <div class="clicks">+</div>
          </div>
        </div>
      </div>

      <div v-if="hasCart" class="skuBtn">
        <div class="sku-btn cart" @click="updaCart">
          加入购物车
        </div>
        <div class="sku-btn buyNow" @click="buyNow">
          直接购买
        </div>
      </div>
      <button v-else @click="submit" class="cartSub" :class="submitFlag?'':'disabled'">
        确定
      </button>
    </layout-popup>
  </view>
</template>

<script>

import layoutPopup from '@/components/layout-popup/layout-popup.vue'
import { error } from '@/common/fun.js'
import { mergeObject, numberSort } from '@/common/helper'
import Storage from '@/common/Storage'
import LayoutIcon from '@/components/layout-icon/layout-icon'
export default {
  components: { layoutPopup, LayoutIcon },
  props: {
    notSaveNumber: {
      type: Boolean,
      default: false
    },
    isNeedNumber: {
      type: Boolean,
      default: false
    },
    isCart: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'default'
    },
    hasCart: {
      type: Boolean,
      default: false
    },
    productInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    gift: {
      type: Number,
      default: 0
    }
  },
  watch: {
    productInfo: {
      deep: true,
      handler (newVal, oldVal) {
        this.list = newVal
        this.postData.qty = 1
        this.init()
      }
    }
  },
  data () {
    return {
      isShow: true,
      list: {}, // 商品数据
      imgShow: '',
      ind: '',
      submitFlag: false, // 是否可以提交
      postData: {
        qty: 1,
        id: '', // 规格id
        price: '', // 价格
        count: 0// 库存
      },
      check_attr: {}
    }
  },
  methods: {
    noop () {

    },
    showImgDetal () {
      const arr = []
      let str
      if (this.imgShow) {
        str = this.imgShow + '-r420'
      } else {
        str = this.list.Products_JSON.ImgPath[0] + '-r420'
      }
      arr.push(str)
      uni.previewImage({
        urls: arr,
        indicator: 'default',
        current: 0
      })
    },
    updaCart () {
      if (this.productInfo.skuvaljosn) {
        if (!this.submitFlag) {
          uni.showToast({
            title: '请选择正确的规格和数量',
            icon: 'none'
          })
          return
        }
      }

      this.$emit('updaCart', this.postData)
      this.close()
    },
    submit () {
      if (this.productInfo.skuvaljosn) {
        if (!this.submitFlag) {
          uni.showToast({
            title: '请选择正确的规格和数量',
            icon: 'none'
          })
          return
        }
      }

      const skuInfo = JSON.parse(JSON.stringify(this.postData))
      if (this.isCart) {
        this.$emit('updaCart', skuInfo)
      } else {
        this.$emit('submitSure', skuInfo)
      }
      this.close()
    },
    buyNow () {
      if (this.productInfo.skuvaljosn && JSON.stringify(this.productInfo.skuvaljosn) !== '{}') {
        if (!this.submitFlag) {
          uni.showToast({
            title: '请选择正确的规格和数量',
            icon: 'none'
          })
          return
        }
      }

      this.$emit('buyNow', this.postData)
      this.close()
    },
    skuSub () {
      if (!this.submitFlag) return

      this.$emit('sureSku', this.postData)
      this.close()
    },
    selectAttr (index, i) {
      const value_index = index // 选择的属性值索引
      const attr_index = i // 选择的属性索引
      // 记录选择的属性
      const check_attr = Object.assign(this.check_attr, { [attr_index]: value_index }) // 记录选择的属性  attr_index外的[]必须
      // 属性处理
      let check_attrid = []
      const check_attrname = []
      let check_attrnames = []
      for (const i in check_attr) {
        var attr_id = check_attr[i]
        check_attrid.push(attr_id)
        check_attrname[attr_id] = i
      }
      // 数组排序  按从小到大排
      const check_attrid_arr = check_attrid
      check_attrid = numberSort(check_attrid)
      // 获取对应的属性名称
      for (let i = 0; i < check_attrid.length; i++) {
        const attr_id = check_attrid[i]
        const attr_name = check_attrname[attr_id]
        check_attrnames.push(attr_name + ':' + this.list.skujosn[attr_name][attr_id])
      }
      check_attrid = check_attrid.join(';')
      const attr_val = this.list.skuvaljosn[check_attrid] // 选择属性对应的属性值
      // 数组转化为字符串
      check_attrnames = check_attrnames.join(';')
      // 更改第一个规格显示图片
      for (const mbx in this.list.skuvaljosn) {
        const arr = mbx.split(';')
        if (arr[0] === index) {
          // this.imgIndex=index
          this.skuImg = this.list.skuvaljosn[mbx].Attr_Image
          break
        }
      }

      // 属性判断
      if (attr_val) {
        this.postData.id = attr_val.Product_Attr_ID // 选择属性的id
        this.postData.count = attr_val.Property_count // 选择属性的库存
        this.postData.Attr_Value_text = attr_val.Attr_Value_text // 选择属性的名字
        if (this.productInfo.active === 'pintuan') {
          this.postData.price = attr_val.pt_pricex ? attr_val.pt_pricex : this.list.Products_PriceX // 选择属性的价格
        } else {
          this.postData.price = attr_val.Attr_Price ? attr_val.Attr_Price : this.list.Products_PriceX // 选择属性的价格
        }

        this.submitFlag = !(!this.check_attr)
        // this.submitFlag = (!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length !== Object.getOwnPropertyNames(this.list.skujosn).length) ? false : true;
        // 如果是外卖模板需要返回当前规格购物车的数量
        if (this.isNeedNumber) {
          const attr_id = this.postData.id
          const prod_id = this.productInfo.Products_ID
          const isCartHas = this.$store.getters['cart/getRow']({
            attr_id,
            prod_id
          })
          console.log('isCartHas', isCartHas, attr_val)
          // 如果已经存在
          // console.log(mergeObject(this.attrInfo, isCartHas, true),"ssss")
          if (isCartHas !== false) {
            this.postData.qty = isCartHas.num
          } else {
            this.postData.qty = 1// 新增的时候，数量为0
          }
        }
      }
      // 判断属性库存
      if (attr_val && attr_val.Property_count <= 0) {
        this.submitFlag = false
        return false
      }
      this.check_attr = {}
      this.check_attr = check_attr
      this.check_attrid_arr = check_attrid_arr
      this.submit_flag = !((!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length !== Object.getOwnPropertyNames(this.list.skujosn).length))
      // 购买数量处理  大于最高时赋值最高值
      if (this.postData.qty > this.postData.count) {
        this.postData.qty = this.postData.count
      }

      if (this.notSaveNumber) {
        Storage.remove('value_index')
        Storage.remove('attr_index')
      } else {
        Storage.set('value_index', value_index)
        Storage.set('attr_index', attr_index)
      }
    },
    addNum () {
      if (this.postData.qty < this.postData.count) {
        this.postData.qty = Number(this.postData.qty) + 1
      } else {
        uni.showToast({
          title: '购买数量不能大于库存量',
          icon: 'none'
        })
        this.postData.qty = this.postData.count
      }
    },
    delNum () {
      if (this.postData.qty > 1) {
        this.postData.qty -= 1
      } else {
        uni.showToast({
          title: '购买数量不能小于1',
          icon: 'none'
        })
        this.postData.qty = 1
      }
    },
    // 用户手动输入数量
    setCount (e) {
      const amount = e.detail.value
      if (amount <= 0) {
        this.postData.qty = 1
        error('至少购买一件')
        return
      }
      if (amount > this.postData.count) {
        this.postData.qty = this.postData.count
        error('购买数量不能超过库存量')
      }
    },
    init () {
      this.postData.price = this.list.minPrice
      this.postData.count = this.list.Products_Count
      if (this.list.skujosn) {
        let skujosn_new = []
        for (const i in this.list.skujosn) {
          skujosn_new.push({
            sku: i,
            val: this.list.skujosn[i]
          })
        }
        // 新增如果有手机的规格
        for (const i in this.list.skujosn) {
          if (i === 'mobile_prod_attr_name') {
            skujosn_new = [{
              sku: i,
              val: this.list.skujosn[i]
            }]
          }
        }
        // 结束

        this.submitFlag = false
        this.list.skujosn_new = skujosn_new
        this.list.skuvaljosn = this.list.skuvaljosn
      } else {
        // 没有规格就随意了
        this.submitFlag = true
      }
    },
    async show () {
      this.isShow = true
      this.$refs.productSku.show()
      await this.init()
      if (this.notSaveNumber) {
        this.postData.qty = 1
      }

      const value_index = Storage.get('value_index')
      const attr_index = Storage.get('attr_index')
      if (value_index && attr_index) {
        await this.selectAttr(value_index, attr_index)
      }

    },
    closePro () {
      this.submitFlag = false
      this.postData.id = ''
      this.check_attr = {}
    },
    close () {
      this.$refs.productSku.close()
      this.submitFlag = false
      this.postData.id = ''
      this.check_attr = {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .cartSku {
    padding: 0rpx 30rpx;
    z-index: 100;

    .cartTop {
      position: relative;
      display: flex;
      padding-top: 30rpx;
      padding-bottom: 30rpx;
      box-sizing: border-box;
      border-bottom: 1rpx solid #EEEEEE;

      .image {
        width: 160rpx;
        height: 160rpx;
      }

      .cartTitle {
        margin-left: 22rpx;
        font-size: 32rpx;
        //width: 420rpx;
        flex: 1;
        height: 160rpx;

        .cartTitles {
          height: 48rpx;
          margin-bottom: 22rpx;
        }

        .addInfo {
          width: 450rpx;
          font-size: 26rpx;
          height: 26rpx;
          line-height: 26rpx;
        }
      }
    }

    .cartCenter {
      max-height: 300px;
      overflow: scroll;

      .cartAttr {
        //display: flex;
        padding: 30rpx 0rpx;
        box-sizing: border-box;
        border-bottom: 1rpx solid #EEEEEE;

        .sku {
          font-size: 30rpx;
          height: 30rpx;
          line-height: 30rpx;
          width: 140rpx;
          margin-bottom: 24rpx;
        }

        .skuValue {
          display: flex;
          //flex:1;
          flex-wrap: wrap;

          .skuview {
            height: 60rpx;
            line-height: 60rpx;
            font-size: 12px;
            border-radius: 8rpx;
            color: #333333;
            background-color: #F5F5F5;
            margin-right: 26rpx;
            margin-bottom: 26rpx;
            padding: 0rpx 30rpx;
          }

          .unablechoose {
            background: #ddd;
          }
        }
      }
    }

    .numBer {

      display: flex;
      padding: 24rpx 0rpx;
      height: 108rpx;
      border-bottom: 1rpx solid #EEEEEE;
      align-items: center;
      justify-content: space-between;

      .numBers {
        font-size: 30rpx;
        height: 30rpx;
        line-height: 30rpx;
        color: #333333;
      }

      .inputNumber {

        height: 60rpx;
        display: flex;

        .inputq {
          max-width: 120rpx;
          display: inline-block;
          min-width: 80rpx;
          height: 60rpx;
          text-align: center;
          font-size: 32rpx;
          color: #333333;
          padding: 0rpx 32rpx;
          margin-right: 1px;
          background-color: #f5f5f5;
          box-sizing: border-box;
        }

        .clicks {
          font-size: 40rpx;
          color: #333333;
          height: 60rpx;
          line-height: 60rpx;
          width: 66rpx;
          text-align: center;
          border-radius:0px 6rpx 6rpx 0px;
          background-color: #f5f5f5;
        }
      }
    }
  }

  .cartSub {
    width: 100%;
    height: 76rpx;
    background-color: #26C78D;
    font-size: 28rpx;
    line-height: 76rpx;
    text-align: center;
    color: #FFFFFF;
    margin-top: 66rpx;
    border-radius: 0;
    border: none;

    &.disabled {
      background: #999;
    }
  }

  .skuBtn {
    margin-top: 66rpx;
    width: 100%;
    display: flex;
    align-items: center;
    height: 76rpx;
    padding: 0rpx 30rpx  10rpx 30rpx;
    box-sizing: border-box;

    .sku-btn {
      flex: 1;
      height: 76rpx;
      line-height: 76rpx;
      text-align: center;
      color: #FFFFFF;
      font-size: 28rpx;
    }

    .disabled {
      background: #999 !important;
    }

    .cart {
      background-color: #333333;
      //background: linear-gradient(to right, #f6ca44, #f19b38);
      border-bottom-left-radius: 78rpx;
      border-top-left-radius: 78rpx;
    }

    .buyNow {
      background-color: #26C78D;
      //background: linear-gradient(to right, #ee7e30, #eb5928);
      border-bottom-right-radius: 78rpx;
      border-top-right-radius: 78rpx;
    }
  }

  .skuCheck {
    color: #26C78D !important;
    background-color: #E8FFF7 !important;
  }

  .cart-price{
    padding-top: 18rpx;
    height: 30rpx;
    line-height: 30rpx;
    color: #26C78D;
    font-size:13px;
  }
</style>
