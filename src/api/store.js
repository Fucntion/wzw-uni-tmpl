import { fetch } from '@/common/request'

// 获取商家信息
export const getBizInfo = (param, options) => fetch({
  act: 'getBizInfo',
  param,
  options
})

// 获取限时抢购
export const getBizSpikeList = (param, options) => fetch({
  act: 'bizSpikeList',
  param,
  options
})

// 获取指定商家门店信息
export const getStoreList = (param, options) => fetch({
  act: 'getStoreList',
  param,
  options
})

// 获取门店相册
export const getAlbumList = (param, options) => fetch({
  act: 'getAlbumList',
  param,
  options
})

// 获取指定类别的照片
export const getPhotoList = (param, options) => fetch({
  act: 'getPhotoList',
  param,
  options
})

// 获取商家的分享码
export const getBizShare = (param, options) => fetch({ act: 'getBizShare', param, options })


