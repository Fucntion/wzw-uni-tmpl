import ENV from '@/common/env'
import { confirm, error, linkToEasy } from './fun'
import { getAccessToken, upload } from './request'
import Storage from '@/common/Storage'
import store from '@/store'

import Schema from 'validate'
import Promisify from '@/common/Promisify'
import { formatNumber } from '@/common/filter'

/**
 * 两个对象的骚操作，并返回一个新对象。这个操作应该避免影响原来的对象.
 * 提示:这个方法只适用于简单值组成的对象
 * @param left
 * @param right
 * @param cover
 * @param insert
 * @returns {*}
 */
export const mergeObject = (left, right, cover = false, insert = false) => {
  const result = {}
  if (!cover && !insert) return Object.assign(result, left, right)

  for (var i in left) {
    result[i] = cover && right.hasOwnProperty(i) ? right[i] : left[i] // 如果tmpl有对应的属性，就覆盖掉
  }

  // 插入只有right中有的属性
  if (insert) {
    for (var j in right) {
      if (!left.hasOwnProperty(j))result[j] = right[j]
    }
  }

  return result
}

export const objTranslate = (obj) => JSON.parse(JSON.stringify(obj))

function checkValue (val, vals) {
  let _val = val
  if (Number.isNaN(val)) {
    _val = 'NaN'
  }
  return vals.indexOf(_val) !== -1
}

/**
 * 清理对象中多余的属性
 * @param obj
 * @param strice
 * @param tip
 * @param clearValues
 * @returns {*}
 */
export const emptyObject = (obj, strice, tip, clearValues = [null, undefined, '', 'null', 'undefined']) => {
  for (var prop in obj) {
    if (checkValue(obj[prop], clearValues)) {
      if (strice) {
        tip && error('参数' + prop + '不能为空')
        console.log('参数' + prop + '不能为空')
        return false
      }
      delete obj[prop]
    }
  }
  return obj
}

/**
 * 指定key，铺平二维数组，一般用于将树状的菜单、分类（数据结构一致，但是利用child这种来标识上下级)
 * 使平铺城1维数组
 */

export const plainArray = (arr, key, newArr) => {
  if (!arr || !key) return false

  for (var item of arr) {
    const tempObj = objTranslate(item)
    if (Object.hasOwnProperty.call(tempObj, key)) {
      delete tempObj[key]
    }
    newArr.push(tempObj)

    if (item && item[key] && Array.isArray(item[key])) {
      plainArray(item[key], key, newArr)
    }
  }
}

/**
 * 从指定的数组(对象组成的数组)，根据键值和值找到下标
 * @param arr
 * @param key
 * @param val
 * @param full 是否返回值和下标，默认只返回下标
 */
export const findArrayIdx = (arr, keyValArr, full = false) => {
  for (var i in arr) {
    if (typeof arr[i] !== 'object') continue

    // 用来比较对象
    if (compareObj(keyValArr, arr[i])) {
      if (!full) return i
      return {
        val: arr[i],
        idx: i
      }
    }
  }
  return false
}

/**
 * 查看对象1中的所有属性在obj2中都有
 * @param obj1
 * @param obj2
 */
export const compareObj = (obj1, obj2) => {
  for (var i in obj1) {
    if (!Object.prototype.hasOwnProperty.call(obj1, i)) continue
    if (!Object.prototype.hasOwnProperty.call(obj2, i) || obj1[i] !== obj2[i]) {
      return false
    }
  }
  return true
}

/**
 * 从元素是对象的一维数组中，获取指定的键名对应的值组成的简单值一维数组.
 * 支持两级（也就是可以获取数组对象中的指定属性的子属性
 * @param arr
 * @param column
 * @returns {[]}
 */
export const getArrColumn = (arr, column) => {
  if (typeof arr !== 'object') {
    throw new Error('第二个参数为一个数组或者对象')
  }
  // if (!Array.isArray(arr)) {
  //   throw new Error('第二个参数为一个数组')
  // }
  if (typeof column !== 'string') {
    throw new Error('键名为字符串')
  }
  if (!column) {
    throw new Error('键名必传')
  }
  const rt = []
  // 这就约束column中没有...号，如果有代表着子属性
  if (column.indexOf('...') !== -1) {
    // 两级
    const key1 = column.split('...')[0]
    const key2 = column.split('...')[1]

    for (var k in arr) {
      if (typeof arr[k] !== 'object') {
        throw new Error('获取的数值为简单值')
      }
      rt.push(arr[k][key1][key2])
    }
  } else {
    for (var k in arr) {
      if (typeof arr[k] !== 'object') {
        throw new Error('获取的数值为简单值')
      }
      rt.push(arr[k][column])
    }
  }
  return rt
}

/**
 * 遍历对象组成的数组，对每个对象的指定键值格式化
 * @param arr
 * @param column
 * @param filterFn
 */
export const formatArrayColumn = (arr, column, filterFn, deepCopy) => {
  try {
    for (var key in arr) {
      arr[key][column] = filterFn(arr[key][column])
    }
    if (deepCopy) return objTranslate(arr)

    return true
  } catch (e) {
    return false
  }
}

/**
 * 获取对象的属性个数
 * @param obj
 * @param stict 严格模式下，只返回自己的，忽略原型链继承的
 * @returns {boolean|number}
 */
export const getObjectAttrNum = (obj, stict = true) => {
  if (typeof stict !== 'object') return false
  if (!stict) return Object.keys(obj).length // 不区分是否继承而来
  let count = 0
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) count++
  }
  return count
}

/**
 * 获取图片
 * @param count
 * @param sizeType
 * @sourceType
 * @returns {Promise<unknown>}
 */
export const chooseImageByPromise = ({ count = 1, sourceType = ['camera', 'album'], sizeType = ['original', 'compressed'] } = {}) => {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count,
      sizeType, // 可以指定是原图还是压缩图，默认二者都有
      success (res) {
        resolve(res.tempFiles)
      },
      fail (err) {
        reject(err)
      },
      complete () {

      }
    })
  })
}

/**
 * 创建配套的task数组
 * @param len
 * @returns {*[]}
 */
export const createUpTaskArr = (len = 1) => {
  const arr = []
  for (var i = 0; i < len; i++) {
    arr[i] = { }
  }
  return arr.concat([])
}

/**
 * 批量上传照片
 * @param imgs string:[]
 * @param name 标识
 * @param data 业务参数:{}
 * @returns {Promise<unknown>}
 */
export const uploadImages = ({ imgs, name = 'image', data, progressList = [] }) => {
  const taskList = []
  // console.log(imgs, 'ssss')
  for (let i = 0; i < imgs.length; i++) {
    const taskItem = upload({
      filePath: imgs[i],
      idx: i,
      name,
      progressList,
      formData: data
    })
    taskList.push(taskItem)
  }

  return new Promise((resolve, reject) => {
    Promise.all(taskList).then((urls) => {
      resolve(urls)
    }).catch((err) => {
      const errMsg = Object.hasOwnProperty.call(err, 'errMsg') ? err.errMsg : err
      reject(errMsg)
    })
  })
}

/**
 * 数据校验
 * @param data
 * @param rule
 * @returns {boolean}
 */
export const validateFun = (data, rule) => {
  const _data = objTranslate(data)
  const rules = new Schema(rule)
  const errors = rules.validate(_data)
  const rt = errors.map(item => item.message)
  return JSON.stringify(rt) === '[]' ? true : rt
}

/**
 * 传入一个数组对象和一个符号
 * @param
 * @param 返回 组成的字符串
 * @returns
 */
export const getString = (arr, key, mbx = 99) => {
  if (!Array.isArray(arr)) {
    throw new Error('数据必传')
  }
  if (mbx === 99) {
    const str = []
    for (const item of arr) {
      str.push(item[key])
    }
    return str
  } else {
    let str = ''
    for (const item of arr) {
      str += item[key] + mbx
    }
    str = str.substring(0, str.length - 1)
    return str
  }
}

export const getDomain = (url) => {
  if (!url) return ''
  if (url.indexOf('http') === -1) return ENV.staticUrl + url
  return url
}

/**
 * 检测是否是分销商
 * @param redirect
 * @return {boolean}
 */
export const checkIsDistribute = (redirect, tip) => {
  // 需要先确认是否已经登录了。。。。。

  const userInfo = store.getters['user/userInfo']

  if (userInfo.Is_Distribute !== 1) {
    if (redirect) {
      if (!tip) {
        uni.navigateTo({
          url: '/pages/distributor/DistributorCenter'
        })
        return
      }

      const initData = store.getters['system/initData']
      const { commi_rename } = initData
      const commi = commi_rename.commi
      confirm({ title: '提示', content: `该操作需要是${commi},请问是否成为${commi}?`, confirmText: '确定', cancelText: '暂不成为' }).then(() => {
        uni.navigateTo({
          url: '/pages/distributor/DistributorCenter'
        })
      }).catch(() => {})
    }
    return false
  }

  return true
}

/**
 * 检测是否登录
 * @param redirect
 * @return {boolean}
 */
export const checkIsLogin = (redirect = 1, tip = 0, isBack = 0) => {
  const access_token = getAccessToken()

  if (!access_token) {
    if (redirect) {
      if (!tip) {
        uni.navigateTo({
          url: '/pages/user/login'
        })
        return false
      }

      confirm({
        title: '提示',
        content: '该操作需要登录,请问是否登录?',
        confirmText: '去登录',
        cancelText: '暂不登录'
      }).then(() => {
        uni.navigateTo({
          url: '/pages/user/login'
        })
      }).catch(() => {
        if (isBack === 1) {
          uni.navigateBack()
        }
      })
    } else {
      return false
    }
    return false
  }

  return true
}

/**
 * 切割字符串，可以有多个
 * @param str
 * @param separator
 * @returns {*|string[]}
 */
export const strSplit = (str, separator = /|,|，||；|\||-|/) => {
  return str.split(separator)
}

export function sleep (fn, par, time = 3000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fn(par)), time)
  })
}

// 会修改模板对象，将他没有的属性加上
function addFun (object, newobj) {
  for (const key in object) {
    if (!object.hasOwnProperty(key)) continue

    if (typeof object[key] === 'object') {
      if (!newobj) continue
      addFun(object[key], newobj[key])
    } else if (typeof object[key] === 'function') {
      continue
    } else {
      if (!newobj || !newobj[key]) continue
      object[key] = newobj[key]
    }
  }
}

export function deepCopyStrict (currentObj, newObject) {
  addFun(currentObj, newObject)
  // mergeData(currentObj, newObject, 1);
  return currentObj
}

/**
 * 快速创建空数组
 * @param len
 * @param item
 * @return {[]}
 */
export const createEmptyArray = (len, item) => {
  if (item === undefined) {
    item = ''
  }

  const tempArr = []

  for (var i = 0; i < len; i++) {
    tempArr[i] = item
  }

  return tempArr
}

export const getCountdownFunc = ({ start_timeStamp, end_timeStamp, current = (new Date()).getTime(), addZero = false, getDay = true } = {}) => {
  let { d = 0, h = 0, m = 0, s = 0 } = {}

  // 时间戳格式转换
  current = parseInt(current / 1000)

  let countTime = 0
  let is_start = false
  let is_end = false

  // 还没开始
  if (start_timeStamp > current && end_timeStamp > current) {
    countTime = start_timeStamp - current
  } else if (end_timeStamp > current && start_timeStamp < current) {
    // 还在进行中

    is_start = true
    countTime = end_timeStamp - current
  } else {
    is_end = true

    // throw "活动信息无效";
  }

  if (getDay) {
    d = parseInt(countTime / (60 * 60 * 24))
  } else {
    d = 0
  }

  h = parseInt((countTime - d * 60 * 60 * 24) / (60 * 60))

  m = parseInt((countTime - d * 60 * 60 * 24 - h * 60 * 60) / 60)
  s = countTime - d * 60 * 60 * 24 - h * 60 * 60 - m * 60

  return {
    d: formatNumber(d),
    h: formatNumber(h),
    m: formatNumber(m),
    s: formatNumber(s),
    is_start,
    is_end
  }
}

// 输入金额时时验证
export function check_money_in (money) {
  if (!(/(^[1-9]([0-9]+)?(\.[0-9]{0,2})?$)|(^(0){1}$)|(^[0-9]\.([0-9]){0,2}?$)/.test(money))) {
    return false
  } else {
    return true
  }
}

/**
 *
 * @param {*} str
 * @param {*} name
 */
export const GetQueryByString = (str, name) => {
  // 获取？号出现几次
  var tempArr = str.split('?')

  // //如果大于1
  if (tempArr.length - 1 > 1) {
    var rt = null
    for (var i in tempArr) {
      var s = tempArr[i]
      var reg1 = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
      var r1 = s.match(reg1) // 匹配目标参数
      if (r1 !== null) {
        rt = decodeURIComponent(r1[2])// 一直覆盖，要最后的就行了
      }
    }

    return rt
  }

  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
  if (!str.split('?')[1]) return null
  var r = str.split('?')[1].match(reg) // 匹配目标参数

  if (r !== null) {
    return decodeURIComponent(r[2])
  }
  return null // 返回参数值
}

export function isWeiXin () {
  // #ifdef H5
  var ua = window.navigator.userAgent.toLowerCase()
  if (
    ua.match(/MicroMessenger/i) === 'micromessenger' &&
    ua.match(/miniProgram/i) &&
    ua.match(/miniProgram/i)[0] === 'miniprogram'
  ) {
    return 'xcx'
  }
  if (ua.match(/MicroMessenger/i) === 'micromessenger' || ((ua.match(/MicroMessenger/i)) && (ua.match(/MicroMessenger/i))[0] === 'micromessenger')) {
    return true
  } else {
    return false
  }
  // #endif

  // #ifndef H5
  return false
  // #endif
}

// 构造分享事件
/**
 *
 * @param path 这个里面无需传owenr_id和users_id
 * @return {string}
 */
export const buildSharePath = (path) => {
  const users_ID = Storage.get('users_id')
  const userInfo = store.state.userInfo || Storage.get('userInfo')
  const User_ID = Storage.get('user_id')

  let search = ''

  if (path.indexOf('users_id') === -1) {
    search += (users_ID ? ('users_id=' + users_ID) : '')
  }

  if (path.indexOf('owner_id') === -1) {
    let owner_id = 0
    if (userInfo.User_ID && userInfo.Is_Distribute === 1) {
      owner_id = userInfo.User_ID
    }
    search += ('&owner_id=' + owner_id)
  }

  let ret = ''
  if (path.indexOf('?') !== -1) {
    ret = path + (search ? '&' : '') + search
  } else {
    ret = path + (search ? '?' : '') + search
  }

  if (ret.indexOf('users_id') === -1) {
    error('组建分享参数失败')
    throw '必须有users_id'
  }

  console.log(`share path is ${ret}`)

  return ret
}

/**
 * 小程序分享到朋友圈
 * @param path
 * @returns {string}
 */
export const buildShrareTimeQuery = () => {
  const users_ID = Storage.get('users_id')
  const userInfo = store.state.userInfo || Storage.get('userInfo')
  let search = ''
  search += (users_ID ? ('users_id=' + users_ID) : '')
  let owner_id = 0
  if (userInfo.User_ID && userInfo.Is_Distribute === 1) {
    owner_id = userInfo.User_ID
  }
  search += ('&owner_id=' + owner_id)
  return search
}

/**
 *获取商品缩略图
 * @param img
 * @param size n3最小
 */
export const getProductThumb = (img, size) => {
  if (!size) size = 'n3'

  const tempArr = img.split('/')
  let name = tempArr.pop()
  name = size + '/' + name

  return [...tempArr, name].join('/')
}

export const urlencode = (str) => {
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+')
}

/**
 * 下载文件
 * @param url
 * @returns {Promise<boolean>}
 */
const downLoadFile = async (url) => {
  try {
    const downRT = await Promisify('downloadFile', { url }).catch(e => { throw Error(e.errMsg) })
    const { tempFilePath } = downRT
    if (!tempFilePath) throw Error('图片下载失败')
    return tempFilePath
  } catch (e) {
    return false
  }
}

/**
 * 保存图片到本地
 * @param fileUrl
 * @param type
 * @returns {Promise<boolean|*>}
 */
export const saveImageToDisk = async ({ fileUrl, type = 'local' }) => {
  try {
    const fileTempPath = type === 'local' ? fileUrl : await downLoadFile(fileUrl)
    await Promisify('saveImageToPhotosAlbum', { filePath: fileTempPath }).catch(e => { throw Error(e.errMsg) })
    return fileTempPath
  } catch (e) {
    return false
  }
}

export const numberSort = function (arr, order_by) {
  if (typeof order_by !== 'undefined' && order_by === 'desc') { // desc
    return arr.sort(function (v1, v2) {
      return v2 - v1
    })
  } else { // asc
    return arr.sort(function (v1, v2) {
      return v1 - v2
    })
  }
}

// ------------ 收货地址函数 -------------
// 数组转化
export const array_change = function (arr) {
  var array = []
  for (var i in arr) {
    array.push({ id: i, name: arr[i] })
  }
  return array
}

// 获取数组下标  用于收货地址选择的显示
export const get_arr_index = function (arr, id) {
  for (var i in arr) {
    if (arr[i].id === id) {
      return parseInt(i)
    }
  }
}
// --------------

export const cutstrFun = (str, len, tip = '..') => {
  if (!str) return ''
  if (str.length < len) return str
  return str.substring(0, len) + tip
}

/**
 * 跳转商品详情页面
 * @param productInfo
 */
export const toGoodsDetail = async (productInfo) => {
  console.log(productInfo)
  const { Products_ID, spike_good_id, price } = productInfo
  let url = ''
  if (!Products_ID) throw Error('产品id必传')
  url = `/pages/product/detail?prod_id=${Products_ID}`

  // 限时抢购
  if (spike_good_id) {
    url += `&mode=spike&spike_good_id=${spike_good_id}`
  }
  // 秒杀
  if (!spike_good_id && price) {
    url += `&mode=seckill&flashsale_id=${productInfo.id}`
  }
  console.log('产品跳转url:' + url)

  // const thumb = productInfo.Products_JSON.ImgPath[0]
  //
  // if (!thumb) {
  //   linkToEasy(url)
  //   return
  // }

  // const { path: thumbTempFilePath } = await Promisify('getImageInfo', { src: thumb }).catch(e => { linkToEasy(url) })

  // Storage.set('thumbTempFilePath', productInfo.Products_JSON.ImgPath[0])

  linkToEasy(url)
}

export const setNavigationBarTitle = (title) => uni.setNavigationBarTitle({ title })

/**
 * 获取滑动事件的参数
 * @param event
 * @returns {{x: number, y: number, type: *}}
 */
export function getTouchEventInfo (event) {
  const type = event.type
  let x = 0
  let y = 0
  const touches = event.changedTouches

  if (touches && touches.length > 0) {
    x = touches[0].clientX
    y = touches[0].clientY
  }

  return {
    type,
    x,
    y
  }
}

export function mixinStyle (defaultStyle, style) {
  if (!defaultStyle) defaultStyle = {}
  if (!style) style = {}

  const rt = objTranslate(defaultStyle)

  for (var i in style) {
    if (!style.hasOwnProperty(i)) continue
    rt[i] = style[i]
  }

  return rt
}

export const getPreviewThumb = (url, ext = '-r200') => {
  var _url = getDomain(url)
  if (!_url) {
    return ''
  }
  if (_url.indexOf('-r') !== -1) {
    return _url
  }
  if (ext)_url += ext
  return _url
}

const Helper = {
  Object: {
    mapList: (list, fn) => {
      list = list.map(fn)
    },
    extend: (o, p) => {
      for (const prop in p) o[prop] = p[prop]
      return o
    },
    // 把p中属性都给o，不覆盖o自有属性
    merge: (o, p) => {
      for (const prop in p) {
        // eslint-disable-next-line no-prototype-builtins
        if (o.hasOwnProperty(prop)) continue
        o[prop] = p[prop]
      }
      return o
    },
    restrict: (o, p) => {
      for (const prop in o) {
        if (!(o in p)) delete o[prop]
      }
      return o
    }
  }
}

export default Helper
