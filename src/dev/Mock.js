import { sleep } from '@/common/helper'

const data = {

}
/**
 * Mock专用，解决没有api但是需要模拟多个有序异步操作的情况
 */
export default class Mock {
  /**
   * 模拟同步操作
   * @param name
   * @returns {*}
   */
  static getData (name) {
    return data[name]
  }

  /**
   * 模拟异步操作
   * @param name
   * @param time
   * @returns {Promise | Promise<unknown>}
   */
  static getDataByRequest (name, time = 1000) {
    return sleep(this.getData, name, time)
  }
}
