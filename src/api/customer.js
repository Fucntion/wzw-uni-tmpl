import { fetch } from '@/common/request'
import Storage from '@/common/Storage'



export const getBizUserList = (param, options) => fetch({
  act: 'getBizUserList',
  param,
  options
})
export const jifenProdOrder = (param, options) => fetch({
  act: 'jifen_prod_order',
  param,
  options
})


export const confirmJifenProdOrder = (param, options) => fetch({
  act: 'confirm_jifen_prod_order',
  param,
  options
})

export const cancelJifenProdOrder = (param, options) => fetch({
  act: 'cancel_jifen_prod_order',
  param,
  options
})


export const getSmsCode = (param, options) => fetch({
  act: 'login_sms',
  param,
  options
})

// 退出登录
export const bindUserClientId = (param, options) => fetch({
  act: 'user_uuid_set',
  param,
  options
})

// 修改登录密码
export const updateUserLoginPsw = (param, options) => fetch({
  act: 'update_user_login_psw',
  param,
  options
})
// 修改支付密码
export const updateUserPayPsw = (param, options) => fetch({
  act: 'update_user_pay_psw',
  param,
  options
})

// 更新用户手机号  获取验证码
export const updateMobileSms = (param, options) => fetch({
  act: 'update_mobile_sms',
  param,
  options
})

// 更新用户手机号
export const updateUserMobile = (param, options) => fetch({
  act: 'update_user_mobile',
  param,
  options
})

export const userLogin = (data, options) => {
  // 获取推荐人id
  let owner_id = Storage.get('owner_id')
  if (!owner_id) {
    owner_id = 0
  }
  const params = {
    ...data,
    owner_id
  }
  return fetch({
    act: 'user_login',
    param: params,
    options
  })
}
// 获取可领取的优惠券
export const getCoupon = (param, options) => fetch({
  act: 'get_unaccalimed_coupon',
  param,
  options
})

export const getUserInfo = (param, options) => fetch({
  act: 'get_user_info',
  param,
  options
})
export const transferIntegral = (param, options) => fetch({
  act: 'transfer_integral',
  param,
  options
})
export const userIntegralRecord = (param, options) => fetch({
  act: 'user_integral_record',
  param,
  options
})

export const updateUserInfo = (param, options) => fetch({
  act: 'update_user_info',
  param,
  options
})

export const jifenProdShippingPrice = (param, options) => fetch({ act: 'jifen_prod_shipping_price', param, options })
export const jifenProdPay = (param, options) => fetch({ act: 'jifen_prod_pay', param, options })
export const jifenProdDetail = (param, options) => fetch({ act: 'jifen_prod_detail', param, options })
export const getShipping = (param, options) => fetch({ act: 'get_shipping', param, options })
export const jifenProdDuihuan = (param, options) => fetch({ act: 'jifen_prod_duihuan', param, options })
// 积分兑换产品列表
export const getJifenProd = (param, options) => fetch({ act: 'get_jifen_prod', param, options })

// 用户获取系统消息
export const getUserMessage = (param, options) => fetch({ act: 'get_user_message', param, options })
// 用户已读系统消息
export const readUserMessage = (param, options) => fetch({ act: 'read_user_message', param, options })

export const getAddressList = (param, options) => fetch({ act: 'get_address', param, options })
export const delAddress = (param, options) => fetch({ act: 'del_address', param, options })
export const addAddress = (param, options) => fetch({ act: 'add_address', param, options })
export const editAddress = (param, options) => fetch({ act: 'edit_address', param, options })
// 用户领取优惠券
export const getUserCoupon = (param, options) => fetch({ act: 'receiveCoupon', param, options })

// 获取收藏列表
export const getFavouriteProdList = (param, options) => fetch({ act: 'get_favourite_prod_list', param, options })

// 用户购物车产品数量
export const CartList = (param, options) => fetch({ act: 'get_cart', param, options })

// 用户购物车产品数量
export const DelCart = (param, options) => fetch({ act: 'del_cart', param, options })

// 获取签到页信息
export const getSignin = (param, options) => fetch({ act: 'get_signin', param, options })
// 签到
export const userSignin = (param, options) => fetch({ act: 'signin', param, options })

// 评论回复
export const commentReply = (param, options) => fetch({ act: 'commentReply', param, options })

export const getRightsCard = (param, options) => fetch({ act: 'getRightsCard', param, options })

// 检测商品或者商家是否收藏
export const checkFavourite = (param, options) => fetch({ act: 'check_prod_favourite', param, options })

// 新增收藏
export const addFavourite = (param, options) => fetch({ act: 'add_favourite_prod', param, options })

// 取消收藏
export const cancelFavourite = (param, options) => fetch({ act: 'cancel_favourite_prod', param, options })

// 创建权益卡订单
export const createRightsCardOrder = (param, options) => fetch({ act: 'createRightsCardOrder', param, options })

// 支付权益卡订单
export const rightsCardPay = (param, options) => fetch({ act: 'rightsCardPay', param, options })

// 支付权益卡订单
export const getTaskCenter = (param, options) => fetch({ act: 'get_task_center', param, options })

// 获取用户资金变动记录
export const getUserMoneyRecord = (param, options) => fetch({ act: 'user_money_record', param, options })

// 获取用户的余额记录
export const getUserChargeRecord = (param, options) => fetch({ act: 'user_charge_record', param, options })

// 余额充值
export const depositBalance = (param, options) => fetch({ act: 'deposit_balance', param, options })

// 余额转出
export const transferBalance = (param, options) => fetch({ act: 'transfer_balance', param, options })

// 获取余额充值优惠
export const getBalance = (param, options) => fetch({ act: 'get_balance', param, options })

// 获取分销中心首页数据
export const getDisInit = (param, options) => fetch({ act: 'get_dis_init', param, options })

// 获取团队对应等级人数
export const getDisTeamCount = (param, options) => fetch({ act: 'get_dis_team_count', param, options })

// 获取团队对应等级人数
export const getDisTeamList = (param, options) => fetch({ act: 'get_dis_team_list', param, options })

// 获取用户提现方式
export const getUserWithdrawMethod = (param, options) => fetch({ act: 'get_user_withdraw_method', param, options })

// 用户新增提现方式
export const addUserWithdrawMethod = (param, options) => fetch({ act: 'add_user_withdraw_method', param, options })

// 获取商城提现方式
export const getShopWithdrawMethod = (param, options) => fetch({ act: 'get_shop_withdraw_method', param, options })

// 申请提现
export const withdrawApply = (param, options) => fetch({ act: 'withdraw_apply', param, options })

// 分销商提交订单
export const getWithdrawConfig = (param, options) => fetch({ act: 'get_withdraw_config', param, options })

// 获取结算详情
export const settlement = (param, options) => fetch({ act: 'settlement', param, options })

// 获取结算列表
export const getSettlements = (param, options) => fetch({ act: 'get_settlements', param, options })

// 获取申请提现记录
export const getWithdrawRecordList = (param, options) => fetch({ act: 'get_withdraw_record_list', param, options })

// 删除提现方式
export const delUserWithdrawMethod = (param, options) => fetch({ act: 'del_user_withdraw_method', param, options })

// 获取分销功能模块
export const getFuncModule = (param, options) => fetch({ act: 'getFuncModule', param, options })

// 分销佣金 管理列表
export const getManageRecordList = (param, options) => fetch({ act: 'getManageRecordList', param, options })

// 申请成为区域代理
export const agentApply = (param, options) => fetch({ act: 'agent_apply', param, options })

// 区域代理支付
export const agentApplyPay = (param, options) => fetch({ act: 'agent_apply_pay', param, options })

// 股东支付
export const shaApplyPay = (param, options) => fetch({ act: 'sha_apply_pay', param, options })

// 取消代理申请
export const cancelAgentApply = (param, options) => fetch({ act: 'cancel_agent_apply', param, options })
// 取消股东申请
export const cancelShaApply = (param, options) => fetch({ act: 'cancel_sha_apply', param, options })

// 申请成为股东
export const shaApply = (param, options) => fetch({ act: 'sha_apply', param, options })

// 获取成为分销商配置信息
export const disApplyInit = (param, options) => fetch({ act: 'dis_apply_init', param, options })

// 申请成为分销商
export const disApply = (param, options) => fetch({ act: 'dis_apply', param, options })

// 获取区域代理申请记录
export const getAgentApply = (param, options) => fetch({ act: 'get_agent_apply', param, options })

// 获取股东申请记录
export const getShaApply = (param, options) => fetch({ act: 'get_sha_apply', param, options })

// 购买分销商
export const disBuy = (param, options) => fetch({ act: 'dis_buy', param, options })

// 获取佣金列表 爵位
export const getNobiRecordList = (param, options) => fetch({ act: 'get_nobi_record_list', param, options })

// 获取佣金列表分销
export const getDisRecordList = (param, options) => fetch({ act: 'get_dis_record_list', param, options })

// 获取佣金列表 股东
export const getShaRecordList = (param, options) => fetch({ act: 'get_sha_record_list', param, options })

// 获取佣金列表 区域代理
export const getAgentRecordList = (param, options) => fetch({ act: 'get_agent_record_list', param, options })

// 获取分销微信二维码
export const getDistributeWxQrcode = (param, options) => fetch({ act: 'get_distribute_wxqrcode', param, options })

// 获取爵位晋升
export const nobiInfo = (param, options) => fetch({ act: 'nobi_info', param, options })

// 获取分销商信息
export const getUserDisInfo = (param, options) => fetch({ act: 'get_user_dis_info', param, options })

// 获取分销商信息
export const getDisUserList = (param, options) => fetch({ act: 'get_dis_user_list', param, options })

// 修改分销商分享语 店名  头像信息
export const updateUserDisInfo = (param, options) => fetch({ act: 'update_user_dis_info', param, options })

// 获取区域代理
export const agentInfo = (param, options) => fetch({ act: 'agent_info', param, options })

// 获取股东
export const shaInit = (param, options) => fetch({ act: 'sha_init', param, options })

// 获取
export const getBalanceRank = (param, options) => fetch({ act: 'get_balance_rank', param, options })

// 分销累计利润接口
export const getBalanceDetail = (param, options) => fetch({ act: 'getBalanceDetail', param, options })

// 推广小助手 添加文章
export const addPromotionArticle = (param, options) => fetch({ act: 'add_promotion_article', param, options })

// 获取团队业绩来源
export const getTeamSalesList = (param, options) => fetch({ act: 'getTeamSalesList', param, options })

// 获取分享赚和浏览量
export const getShareView = (param, options) => fetch({ act: 'getShareView', param, options })

// 用户浏览商家历史
export const userBizView = (param, options) => fetch({ act: 'userBizView', param, options })
