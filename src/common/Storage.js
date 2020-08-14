const Storage = {
  set (key, val, cover) {
    try {
      if (val === false) {
        return uni.setStorageSync(key, val)
      } else {
        if (!cover && !val && (val !== 0 || val !== false)) return false
        return uni.setStorageSync(key, val)
      }
    } catch (e) {
      uni.showModal(`设置Storage失败，key：${key}`)
    }
  },

  get (key, defaultValue) {
    try {
      var val = uni.getStorageSync(key)
      if (!val && defaultValue !== undefined) return defaultValue
      return val
    } catch (e) {
      // error
      uni.showModal(`获取Storage失败，key：${key}`)
    }
  },
  remove (key) {
    return uni.removeStorageSync(key)
  },
  clear () {
    return uni.clearStorageSync()
  }
}

export default Storage
