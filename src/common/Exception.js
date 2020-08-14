import { modal, toast } from '@/common/fun'
import ENV from '@/common/env'

/**
 * 异常类——构造函数模式
 */
export function Exception () {

}

/**
 * 异常类——es6模式
 */
// export class Exception {
//   constructor () {
//   }
//
//   handle
// }

/**
 * 自定义处理错误
 * @param msg
 * @constructor
 */
function handle (e) {
  if (typeof e === 'string') {
    e = new Error(e)
  }
  if (typeof e === 'object' && e.hasOwnProperty('msg')) {
    e = new Error(e.msg)
  }
  if (typeof e === 'object' && e.hasOwnProperty('errMsg')) {
    e = new Error(e.errMsg)
  }

  if (e === 'nocare' || e.message === 'nocare') return
  let { message = '错误信息', type = 'toast', icon = 'none' } = e
  if (typeof e !== 'object') {
    message = e
  }
  // 开发模式下，全部都弹出来
  // if (ENV.isDev) { type = 'modal'; message = '开发调试信息:' + message; console.log(e) }
  if (type === 'toast') toast(message, icon)
  if (type === 'modal') modal(message)

  return ({
    message,
    type,
    icon
  })
}

Exception.prototype = {
  constructor: Exception
}
Exception.handle = handle
