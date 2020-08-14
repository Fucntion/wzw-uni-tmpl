import { fetch } from '@/common/request'
import Storage from '@/common/Storage'



//获取激活码
export const getCodeQrcode = (param, options) => fetch({
  act: 'getCodeQrcode',
  param,
  options
})
//激活码购买
export const buyActiveCode = (param, options) => fetch({
  act: 'buyActiveCode',
  param,
  options
})
// 评论
export const comment = (param, options) => fetch({
  act: 'comment',
  param,
  options
})

// 退款
export const orderRefund = (param, options) => fetch({
  act: 'order_refund',
  param,
  options
})

// 获取申请退货退款
export const getRefund = (param, options) => fetch({
  act: 'get_refund_info',
  param,
  options
})

// 支付购买会员卡订单
export const userLevelPay = (param, options) => fetch({
  act: 'userLevelPay',
  param,
  options
})
// 创建购买会员卡订单
export const createBuyLevelOrder = (param, options) => fetch({
  act: 'createBuyLevelOrder',
  param,
  options
})
// 获取订单操作
export const createOrderCheck = (param, options) => fetch({
  act: 'create_order_check',
  param,
  options
})

// 提交订单
export const createOrder = (param, options) => {
  // 获取推荐人id
  let share_user_id = Storage.get('owner_id')
  if (!share_user_id) {
    share_user_id = 0
  }
  const _param = {
    ...param,
    share_user_id
  }

  return fetch({
    act: 'create_order',
    param: _param,
    options
  })
}

// 获取购物车信息
export const getCart = (param, options) => fetch({
  act: 'get_cart',
  param,
  options
})

// 获取购物车信息
export const updateCart = (param, options) => fetch({
  act: 'update_cart',
  param,
  options
})

// 获取订单详情
export const getOrderDetail = (param, options) => fetch({
  act: 'get_order_detail',
  param,
  options
})

// 订单支付
export const orderPay = (param, options) => fetch({
  act: 'order_pay',
  param,
  options
})

export const confirmOrderPayStatus = (param, options) => fetch({
  act: 'judge_ispay',
  param,
  options
})
// 获取订单列表
export const getOrderList = (param, options) => fetch({
  act: 'get_order',
  param,
  options
})
// 取消订单
export const cancelOrder = (param, options) => fetch({
  act: 'cancel_order',
  param,
  options
})
// 订单确认收货
export const confirmOrder = (param, options) => fetch({
  act: 'confirm_order',
  param,
  options
})
// 获取订单状态角标数
export const getOrderNum = (param, options) => fetch({
  act: 'get_order_num',
  param,
  options
})

// 获取订单模板
export const getBizOrderTemplateList = (param, options) => fetch({
  act: 'getBizOrderTemplateList',
  param,
  options
})

// 获取合单详情
export const getPreOrderDetail = (param, options) => fetch({
  act: 'getPreOrderDetail',
  param,
  options
})

export const delOrder = (param, options) => fetch({
  act: 'del_order',
  param,
  options
})
export const cancelRefund = (param, options) => fetch({
  act: 'cancel_refund',
  param,
  options
})

export const getBackOrder = (param, options) => fetch({
  act: 'get_back_order',
  param,
  options
})
export const getBackOrderDetail = (param, options) => fetch({
  act: 'get_back_order_detail',
  param,
  options
})
export const refundSend = (param, options) => fetch({
  act: 'refund_send',
  param,
  options
})

// 获取拼团的团队
export const getPintuanTeam = (param, options) => fetch({ act: 'get_pintuan_team', param, options })

// 获取订单权益
export const getPayCoupons = (param, options) => fetch({ act: 'getPayCoupons', param, options })

// 线下支付
export const offlinePay = (param, options) => fetch({ act: 'offlinePay', param, options })

// 获取订单物流追踪
export const getOrderExpress = (param, options) => fetch({ act: 'get_order_express', param, options })

// 获取同城配送物流
export const cityOrderExpress = (param, options) => fetch({ act: 'cityOrderExpress', param, options })
