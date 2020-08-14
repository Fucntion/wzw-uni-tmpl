/**
 * promise化接口
 */
const Promisify = (functionName, params) => {
  return new Promise((resolve, reject) => {
    uni[functionName]({
      success: res => resolve(res),
      fail: res => reject(res),
      ...params// 把解构放在后面，可以覆盖success
    })
  })
}

export default Promisify
