import { WX_JSSDK_INIT } from '@/common/uni'
import { isWeiXin, urlencode } from '@/common/helper'
import Storage from '@/common/Storage'
import { confirmOrderPayStatus } from '@/api/order'
import { traslateShorten } from '@/api/common'

/**
 *
 * @param vm 传this
 * @param pay_type 支付类型
 * @param payRequestData orderPay的res
 *
 */

// 示例
//
// do something 下单和余额支付的逻辑自己维护，这里只管拿到了支付参数之后的。
// 如果在页面中的话，必须设置payScuessCall和payFailCall
//
// orderPay(payConf).then(res => {
//     unipayFunc(_self,_self.pay_type,res);
// },err=>{
//     uni.showModal({
//         title:'提示',
//         content:'获取支付参数失败:'+err.msg
//     })
// }).catch(e=>{
//
// })
//

const Pay = (vm, pay_type, payRequestData) => {
  const _self = vm
  const res = payRequestData

  let provider = 'wxpay'
  let orderInfo = {}

  // #ifdef H5

  // 微信h5
  if (pay_type === 'wx_h5') {
    const redirect_url = res.data.mweb_url + '&redirect_url=' + urlencode(location.origin + '/fre/pagesA/active/ActivationCodeSuccess?order_id=' + res.data.order_id)
    location.href = redirect_url
    return
  }

  // 阿里h5
  if (pay_type === 'alipay') {
    // 公众号麻烦一点
    if (isWeiXin()) {
      const users_id = Storage.get('users_id')

      const fromurl = res.data.arg// encodeURIComponent(res.data.arg);

      // 字符串
      let nocestr = ''
      traslateShorten({ data: fromurl }).then(res => {
        nocestr = res.data.key
        // uni.navigateTo({
        //     url:`/pages/pay/wx/wx?users_id=${users_id}&nocestr=`+nocestr
        // })

        const str = `/fre/pages/pay/wx/wx?users_id=${users_id}&nocestr=` + nocestr

        const url = location.origin + str

        // 强制页面刷新
        location.href = url
      }, err => {
        // error('获取支付宝支付参数失败');
      })
    } else {
      document.write(res.data.arg)
      document.getElementById('alipaysubmit').submit()
    }

    return
  }

  // 下面只能是微信公众号的
  if (!isWeiXin()) return
  const { timestamp, nonceStr, signType, paySign } = res.data

  // 直接支付
  WX_JSSDK_INIT(_self).then((wxEnv) => {

    // 关键字？？package
    wxEnv.chooseWXPay({
      timestamp,
      nonceStr,
      package: res.data.package,
      signType,
      paySign,
      success: function (res) {
        // 支付成功后的回调函数
        _self.paySuccessCall(res)
      },
      fail (err) {
        _self.payFailCall(err)
      }
    })
  }).catch((e) => {
  })
  return

  // #endif

  // #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-ALIPAY

  // #endif

  // #ifdef MP-WEIXIN

  provider = 'wxpay'
  orderInfo = res.data
  delete orderInfo.timestamp

  const prepay_id = orderInfo.package.split('=')[1]
  uni.requestPayment({
    ...orderInfo,
    provider,
    success: function (res) {
      _self.paySuccessCall(res)
    },
    fail: function (err) {
      console.log(err)
      _self.payFailCall(err)
    }
  })
  return
  // #endif

  // app支付，有微信有支付宝

  // #ifdef APP-PLUS

  if (pay_type === 'ali_app') {
    const provider = 'alipay'
    const orderInfo = res.data.arg

    uni.requestPayment({
      provider,
      orderInfo, // 微信、支付宝订单数据
      success: function (res) {
        _self.paySuccessCall(res)
      },
      fail: function (err) {
        // uni.showModal({
        //     title:'支付错误',
        //     content:JSON.stringify(err)
        // })
      }
    })

    return
  }

  // app微信
  if (pay_type === 'wx_app') {
    provider = 'wxpay'
    orderInfo = res.data
    uni.requestPayment({
      provider,
      orderInfo, // 微信、支付宝订单数据
      success: function (res) {
        _self.paySuccessCall(res)
      },
      fail: function (err) {
        _self.payFailCall(err)
      }
    })
    return
  }
  // #endif

  // 头条的支付  会有微信和支付宝
  // #ifdef MP-TOUTIAO

  const service = 1

  // if(pay_type === 'ali_app'){
  //     provider = 'alipay';
  //     service = 4;
  // }
  //
  // if(pay_type === 'wx_h5'){
  //     provider = 'wxpay';
  //     service = 3;
  // }

  orderInfo = res.data

  delete orderInfo.Order_ID

  const conf = {
    provider,
    service,
    orderInfo
  }

  // 固定值：1（拉起小程序收银台）开发者如果不希望使用头条小程序收银台，service设置为3/4时，可以直接拉起微信/支付宝进行支付：service=3： 微信API支付，不拉起小程序收银台；service=4： 支付宝API支付，不拉起小程序收银台。其中service=3、4，仅在1.35.0.1+基础库(头条743+)支持
  uni.requestPayment({
    provider,
    _debug: 1,
    service,
    orderInfo, // 微信、支付宝订单数据
    getOrderStatus (res) {
      const { out_order_no } = res

      return new Promise(function (resolve, reject) {
        // 商户前端根据 out_order_no 请求商户后端查询微信支付订单状态

        confirmOrderPayStatus({ order_no: out_order_no }).then(res => {
          if (res.data) {
            resolve({ code: 0 })
          } else {
            resolve({ code: 2 })
          }
        }, err => {
        })
        // setTimeout(function(){
        //
        // },500)
      })
    },
    success: function (res) {
      _self.paySuccessCall(res)
    },
    complete: function (res) {

    },
    fail: function (err) {
      _self.payFailCall(res)
      // uni.showModal({
      //     title:'支付错误',
      //     content:JSON.stringify(err)
      // })
    }
  })
  return
  // #endif
}

export default Pay
