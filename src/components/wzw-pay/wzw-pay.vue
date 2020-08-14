<template>
  <view>
    <view v-show="ifshow" @tap="ableClose" @touchmove.stop.prevent class="pay-mask">
    </view>
    <div class="zhezhao" v-if="password_input">
      <div class="input-wrap">
        <div>请输入余额支付密码</div>
        <input type="password" class="input" placeholder="请输入密码" @input="user_password">
        <div class="btns">
          <div @click="cancelInput" class="btn">取消</div>
          <div @click="confirmInput" class="btn">确定</div>
        </div>
      </div>
    </div>

    <view ref="popRef" class="popup-content" @tap.stop="stopEvent" :style="_location">

      <block v-for="(item,index) in initData.pay_arr" :key="index">
        <div class="iMbx" v-if="index!=='remainder_pay'||(is_use_money)" @click="chooseType(index)">
          <div class="c_method">
            {{item}}
            <text>￥{{pay_money}}</text>
          </div>
        </div>
      </block>

      <div class="safearea-box2"></div>
    </view>

    <view v-if="aliPayUrl" class="aliPayUrl">
      <navigator :url="aliPayUrl"></navigator>
    </view>
  </view>
</template>

<script>

import { mapActions } from 'vuex'

import { confirm, error } from '@/common/fun'
import { orderPay } from '@/api/order'
import { GetQueryByString, isWeiXin, urlencode } from '@/common/helper'
import Storage from '@/common/Storage'
// #ifdef H5
// #endif
// import { unipayFunc } from '../common/pay'
import Pay from '@/common/Pay'
import { Exception } from '@/common/Exception'

function noop () {
}

export default {
  name: 'WzwPay',
  props: {
    is_use_order_pay: {
      type: Boolean,
      default: true
    },
    // 是否支持余额支付
    is_use_money: {
      type: Boolean,
      default: true
    },
    // 是否自动显示
    isOpen: {
      type: Boolean,
      default: true
    },
    // 是否点击蒙层就自动关闭
    autoClose: {
      type: Boolean,
      default: true
    },
    // 订单ID，非必填。有的地方就没有Order_ID
    Order_ID: {
      type: String
    },
    // 剩余支付的钱
    pay_money: {
      type: [Number, String],
      require: true
    },
    // 使用的余额，可能是数字，也可能是字符串
    use_money: {
      type: [Number, String],
      require: true
    },
    // 额外的信息非必填

    // 是否需要发票
    need_invoice: {
      type: Boolean,
      default: false
    },
    // 发票信息
    invoice_info: {
      type: String
    },
    // 订单备注
    order_remark: {
      type: String
    },

    // #ifndef MP-TOUTIAO
    paySuccessCall: {
      // type:Function,
      default: noop
    },
    payFailCall: {
      type: Function,
      default: noop
    },
    payCanceCall: {
      type: Function,
      default: noop
    }
    // #endif

  },
  data () {
    return {
      timer: null,
      aliPayUrl: '',
      iftoggle: false,
      direction: 'top', // 强制在底部
      ifshow: false, // 是否展示,
      translateValue: -100, // 位移距离
      user_pay_password: '', // 余额支付密码
      password_input: false,
      totalMoney: 0, // 应支付金额
      pay_type: 'remainder_pay', // remainder_pay余额支付，余额补差    wechat 微信支付  ali 支付宝支付
      // #ifdef MP-TOUTIAO
      paySuccessCall: null,
      payErrorCall: null,
      payCanceCall: null
      // #endif

    }
  },
  computed: {
    _translate () {
      const transformObj = {
        top: `transform:translateY(${-this.translateValue}%)`
        // 'bottom': `transform:translateY(${this.translateValue}%)`,
        // 'left': `transform:translateX(${-this.translateValue}%)`,
        // 'right': `transform:translateX(${this.translateValue}%)`
      }
      return transformObj[this.direction]
    },
    _location () {
      const positionValue = {
        top: 'bottom:0px;width:100%;'
        // 'bottom': 'top:0px;width:100%;',
        // 'left': 'right:0px;height:100%;',
        // 'right': 'left:0px;height:100%;',
      }
      return positionValue[this.direction] + this._translate
    },
    initData () {
      return this.$store.state.system.initData
    },
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    }
  },
  onLoad () {

  },
  created () {
    const self = this

    // #ifdef MP-TOUTIAO
    self.paySuccessCall = self.$store.state.payTempObj.paySuccessCall
    self.payFailCall = self.$store.state.payTempObj.payFailCall
    self.payCanceCall = self.$store.state.payTempObj.payCanceCall
    // #endif

    // 自动打开
    if (this.isOpen) {
      setTimeout(function () {
        self.show()
      }, 100)
    }

    // #ifdef H5
    if (isWeiXin()) {
      this.code = GetQueryByString(location.href, 'code')

      if (this.code) {
        this.pay_type = 'wx_mp'// 需要手动设置一下

        // Storage.set('code',this.code)
        this.self_orderPay(1)
      }
    }
    // #endif
  },
  methods: {
    ...mapActions({
      getInitData: 'system/loadInitData'
    }),
    // 取消输入支付密码
    cancelInput () {
      this.password_input = false
    },
    // 用户输入密码完毕
    user_password (e) {
      this.user_pay_password = e.detail.value
    },
    // 确定输入支付密码
    confirmInput (e) {
      this.self_orderPay()
      this.password_input = false
    },
    show (events) {
      this.ifshow = true

      let _open = setTimeout(() => {
        this.translateValue = 0
        _open = null
      }, 100)

      let _toggle = setTimeout(() => {
        this.iftoggle = true
        _toggle = null
      }, 300)

      console.log(this)

      // this.translateValue = 0;
    },
    close () {
      // this.ifshow = false;
      // this.translateValue = -100;

      if (this.timer !== null || !this.iftoggle) {
        return
      }
      this.translateValue = -100
      this.timer = setTimeout(() => {
        this.ifshow = false
        this.timer = null
        this.iftoggle = false
        // this.$emit('closeCallBack', null);
        // this.$emit('change',false)
      }, 300)
    },
    ableClose () {
      if (this.autoClose) {
        this.close()
      }
    },
    // 获取用户支付方式
    chooseType (name) {
      this.pay_type = name
      this.close()

      if (name === 'remainder_pay') {
        if (this.userInfo.hasOwnProperty('User_PayPassword') && !this.userInfo.User_PayPassword) {
          confirm({
            title: '提示',
            content: '该操作需要设置支付密码,是否前往设置?',
            confirmText: '去设置',
            cancelText: '暂不设置'
          }).then(res => {
            uni.navigateTo({
              url: '/pagesA/user/UpdateUserPsw?type=1&is_back=1'
            })
          }).catch(err => {
            error('请选择其他支付方式')
          })
          return
        }
        this.password_input = true// 弹出密码输入框
        return
      }

      try {
        let useMoney = this.use_money
        if (typeof useMoney === 'string' && isNaN(useMoney)) {
          useMoney = JSON.parse(useMoney)
          // 对象
          if (Object.prototype.toString.call(useMoney) === '[object Object]') {
            // 有使用余额的
            if (Object.values(useMoney).filter(val => val > 0).length > 0) {
              this.password_input = true
              return
            }
          }
        } else {
          if (parseFloat(this.use_money) > 0) {
            this.password_input = true
            return
          }
        }
      } catch (e) {
        Exception.handle(e)
      }

      // 未使用余额支付, 直接调用
      this.self_orderPay()
    },
    async $_init_wxpay_env () {
      const initData = await this.getInitData()

      const login_methods = initData.login_methods
      const component_appid = login_methods.component_appid

      let channel = null

      // 根据服务器返回配置设置channels,只有微信公众号和小程序会用到component_appid
      // 而且状态可以灵活控制 state为1
      for (var i in login_methods) {
        // && login_methods[i].state ??状态呢？
        if (i !== 'component_appid' && login_methods[i].state) {
          channel = ['wx_mp'].indexOf(login_methods[i].type) === -1 ? {
            ...login_methods[i]
          } : {
            ...login_methods[i],
            component_appid
          }
          break
        }
      }

      if (!channel) {
        this.$error('未开通公众号支付')
        return false
      }

      // 如果url有code去掉
      let {
        origin,
        pathname,
        search,
        hash
      } = window.location
      const strArr = []
      if (search.indexOf('code') !== -1) {
        const tempArr = search.split('&')
        for (var i of tempArr) {
          // 过滤多余的参数
          if (i.indexOf('code') === -1 && i.indexOf('state') === -1 && i.indexOf('appid') === -1) {
            strArr.push(i)
          }
        }
        let newSearchStr = strArr.join('&')
        if (newSearchStr.indexOf('?') === -1) {
          newSearchStr = '?' + newSearchStr
        }

        search = newSearchStr
      }

      const REDIRECT_URI = urlencode(origin + pathname + search + hash)

      let wxAuthUrl = null

      if (channel.component_appid) {
        // 服务商模式登录
        wxAuthUrl =
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${channel.appid}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=${channel.component_appid}#wechat_redirect`
      } else {
        // 公众号自己的appid用于登录
        wxAuthUrl =
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${channel.appid}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
      }

      window.location.href = wxAuthUrl
    },
    // 统一方法
    async self_orderPay (is_forward) {
      const _self = this
      let payConf = {}

      // 不是跳转的
      if (!is_forward) {
        payConf = {
          Order_ID: this.Order_ID,
          pay_type: this.pay_type,
          pay_money: this.pay_money, // 剩余支付的钱
          use_money: this.use_money, // 使用的余额
          user_pay_password: this.user_pay_password, // 余额支付密码
          need_invoice: this.need_invoice,
          invoice_info: this.invoice_info,
          order_remark: this.order_remark
        }
        const obj = {
          pay_type: this.pay_type,
          user_pay_password: this.user_pay_password // 余额支付密码
        }
        if (!this.is_use_order_pay) {
          this.$emit('payMehtod', obj)
          return
        }

        // 如果用户支付金额为0，即全部用余额
        if (Number(this.pay_money) === 0) {
          this.pay_type = 'remainder_pay'
        }
        // 用户选择余额支付
        if (this.pay_type === 'remainder_pay') {
          orderPay(payConf, {
            errtip: false,
            mask: true,
            tip: '正在加载中'
          }).then(res => {
            _self.paySuccessCall()
          }, err => {
            uni.showModal({
              title: '提示',
              content: err.msg,
              showCancel: false
            })
          }).catch(e => {

          })
          return
        }
      }

      if (this.pay_type === 'unionpay') {
        error('即将上线')
        return
      }

      if (this.pay_type === 'ali_app') {

      }

      // 下面都是微信

      // 需要格外有一个code

      // #ifdef H5

      // 微信h5
      if (this.pay_type === 'wx_h5') {
        payConf.pay_type = 'wx_h5'
      }

      // 阿里h5
      if (this.pay_type === 'alipay') {
        payConf.pay_type = 'alipay'
      }

      // 公众号需要code
      if (this.pay_type === 'wx_mp') {
        if (!isWeiXin()) {
          error('请在微信内打开')
          return
        }

        const isHasCode = this.code || GetQueryByString('code')
        // 已经用过的code不再用
        if (isHasCode && isHasCode !== Storage.get('isUseCode')) {
          // 拿到之前的配置
          payConf = {
            ...Storage.get('temp_order_info'),
            code: isHasCode,
            pay_type: 'wx_mp'
          }

          Storage.set('isUseCode', isHasCode)
        } else {
          // 存上临时的数据
          Storage.set('temp_order_info', payConf)
          // 去掉转吧
          this.$_init_wxpay_env()
          return
        }
      }

      // #endif

      // #ifdef MP-TOUTIAO
      // #endif

      // #ifdef MP-WEIXIN
      payConf.pay_type = 'wx_lp'

      await new Promise((resolve) => {
        uni.login({
          success: function (loginRes) {
            payConf.code = loginRes.code
            resolve()
          }
        })
      })
      // #endif

      orderPay(payConf, {
        mask: true,
        tip: '正在加载中'
      }).then(res => {
        Pay(this, this.pay_type, res)
      }).catch(err => {
        uni.showModal({
          title: '提示',
          content: '获取支付参数失败:' + err.msg
        })
      })
    },
    stopEvent (event) {
    }
  }
}
</script>

<style lang="less" scoped>
  .pay-mask {
    position: fixed;
    z-index: 900000;
    background: rgba(0, 0, 0, .3);
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    overflow: hidden;
  }

  .popup-content {
    position: fixed;
    z-index: 1000000;
    background: #FFFFFF;
    transition: all .3s ease;
    overflow: hidden;
    /*border-top-left-radius: 20rpx;*/
    /*border-top-right-radius: 20rpx;*/
  }

  .safearea-box2 {
    height: constant(safe-area-inset-bottom);
    height: env(safe-area-inset-bottom);
    width: 100%;
    background: white;
  }

  .iMbx {
    text-align: center;
    padding: 0 20rpx;
    font-size: 28rpx;
    color: #333;

    .c_method {
      padding: 37rpx 0;
      border-bottom: 2rpx solid #E6E6E6 !important;
    }

    & .c_method:first-child {
      color: #F43131;
    }

    & .c_method:nth-last-child(1) {
      border: none;
    }
  }

  .zhezhao {
    left: 0;
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    z-index: 1000;

    .input-wrap {
      background: #fff;
      color: #000;
      text-align: center;
      width: 90%;
      margin: 400rpx auto;
      padding: 40rpx 50rpx 30rpx;
      box-sizing: border-box;
      font-size: 28rpx;
      border-radius: 10rpx;

      .input {
        margin: 40rpx 0;
        border: 1px solid #efefef;
        /*height: 80rpx;*/
        /*line-height: 80rpx;*/
        height: 20px;
        line-height: 20px;
        padding: 10px 0px;
      }

      .btns {
        display: flex;
        justify-content: space-around;
        height: 60rpx;
        line-height: 60rpx;

        .btn {
          flex: 1;
        }
      }
    }
  }
</style>
