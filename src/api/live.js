import { fetch } from '@/common/request'

// 评论
export const getLiveList = (param, options) => fetch({ act: 'getLiveList', param, options })
