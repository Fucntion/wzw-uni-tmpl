import { fetch } from '@/common/request'

// 统计
export const sendAnalysisData = (param, options) => fetch({
  act: 'clickRecord',
  param,
  options
})
// 优惠券列表
export const getCouponList = (param, options) => fetch({
  act: 'getCouponList',
  param,
  options
})

// 获取评论
export const getCommitList = (param, options) => fetch({
  act: 'get_commit',
  param,
  options
})

// 获取活动详情
export const getActiveInfo = (param, options) => fetch({
  act: 'getActiveInfo',
  param,
  options
})

// 获取赠品列表
export const getShopGiftList = (param, options) => fetch({
  act: 'getShopGiftList',
  param,
  options
})

// 获取广告
export const getAdvertList = (param, options) => fetch({
  act: 'getAdvertList',
  param,
  options
})

// 获取分享海报
export const getBizShare = (param, options) => fetch({
  act: 'getBizShare',
  param,
  options
})

// 会员等级列表或详情
export const getUserLevel = (param, options) => fetch({
  act: 'getUserLevel',
  param,
  options
})

export const getProductCountInfo = (param, options) => fetch({ act: 'get_users_info', param, options })

// 获取商城首页装修配置
export const getSkinConfig = (param, options) => fetch({ act: 'get_shophome', param, options })

// 获取预览配置(首页)
export const getSkinPreData = (param, options) => fetch({ act: 'get_skin_data', param, options })

// 获取自定义页面配置(自定义页面)
export const getDiySkinConfig = (param, options) => fetch({ act: 'get_makeup_home_data', param, options })

// 获取地址
export const getAreaByPid = (param, options) => fetch({ act: 'getAreaByPid', param, options })

export const getProdDetail = (param, options) => fetch({ act: 'prod_detail', param, options })

// 长链接转换短链接
export const traslateShorten = (param, options) => fetch({ act: 'save_redis_data', param, options })

// 获取全局配置
export const getSystemConf = (param, options) => fetch({ act: 'shopconfig', param, options })

// jssdk签名
export const getJsSign = (param, options) => fetch({ act: 'share_config', param, options })

// 获取海报模板
export const getPosterList = (param, options) => fetch({ act: 'getPosterList', param, options })

// 获取海报模板详情
export const getPosterDetail = (param, options) => fetch({ act: 'getPosterDetail', param, options })

// 获取分销中心-分销二维码
export const getDistributeWxQrcode = (param, options) => fetch({ act: 'get_distribute_wxqrcode', param, options })

// 获取乡镇
export const getTown = (param, options) => fetch({ act: 'get_town', param, options })

// 大转盘开始
export const rotateBegin = (param, options) => fetch({ act: 'beginTurn', param, options })

// 获取中奖记录
export const getRotateRecord = (param, options) => fetch({ act: 'getPrizeRecord', param, options })

// 大转盘初始化
export const rotateInit = (param, options) => fetch({ act: 'initTurn', param, options })

// 根据经纬度和精确定位设置获取对应的地区id
export const getLocationByCoordinate = (param, options) => fetch({ act: 'getLocationByCoordinate', param, options })