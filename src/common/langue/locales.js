/**
 * 语言包配置文件，为了不和业务的变量重名，所有语言包配置变量需要用使用一个类似命名空间的变量命名.所有变量都用t_开头
 * 不得用一个单词来命名变量，如果是顶级变量需要用comm开头（即需要有1-2个下划线)。
 * 如果是其他的变量，可以根据业务模块来做开头
 * eg. 弹出确认是否删除订单  't_order_confirm_DeleteText 即可
 * eg. 公共的错误提示  't_comm_errMsgTip 即可
 */

// 后续有其他语言的，也独立一个文件类配置
import ZHCN from './locales.zh-cn'

export default {

  // 英文
  en: {
    t_comm_Time: 'time'
  },

  // 中文
  'zh-cn': ZHCN,

  // 繁体
  'zh-hk': {
    t_comm_Time: '時間'
  },

  // 俄罗斯
  ru_RU: {
    t_comm_Time: '  '
  },

  // 韩国
  ko_KR: {
    t_comm_Time: '철학'
  },

  // 日本
  ja_JP: {
    t_comm_Time: '時間'
  }
}
