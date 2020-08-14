
const isDev = process.env.NODE_ENV !== 'production'

// #ifdef H5
		const { origin } = location
// #endif

const users_id = 'wkbq6nc2kc'
// Im相关配置
const IM_WSS_URL = 'wss://newjdtravel.bafangka.com/cus/'
const IM_API_URL = 'https://chat.bafangka.com'

// 测试appid   wxfe5d2621576cf895  域名 https://newo2o.bafangka.com
// 正式appid   wx28e6e80223bd5f0f  域名 https://newo2o.netcnnet.net

//测试
const confByDev = {
  // #ifndef H5
	staticUrl: 'https://newo2o.bafangka.com',
  // #endif
  // #ifdef H5
	staticUrl: isDev ? 'https://newo2o.bafangka.com' : origin,
  // #endif
  apiBaseUrl: 'https://newo2o.bafangka.com',
  IM_WSS_URL,
  IM_API_URL,
  users_id,
  isCustom: false,
  isDev
}
//正式
const confByPro = {
  // #ifndef H5
  	staticUrl: 'https://newo2o.netcnnet.net',
  // #endif
  // #ifdef H5
  	staticUrl: isDev ? 'https://newo2o.netcnnet.net' : origin,
  // #endif
  apiBaseUrl: 'https://newo2o.netcnnet.net',
  IM_WSS_URL,
  IM_API_URL,
  users_id,
  isCustom: false,
  isDev
}
//及贝
const confByJb = {
	// #ifndef H5
		staticUrl: 'https://jb.jbaycloud.com',
	// #endif
	// #ifdef H5
		staticUrl: isDev ? 'https://jb.jbaycloud.com' : origin,
	// #endif
  apiBaseUrl: 'https://jb.jbaycloud.com',
  IM_WSS_URL,
  IM_API_URL,
  users_id,
  isCustom: false,
  isDev
}

export default confByPro

 //export default confByPro

// export default confByJb
