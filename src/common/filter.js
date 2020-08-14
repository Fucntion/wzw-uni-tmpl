import Vue from 'vue'
import ENV from './env'

Vue.filter('domain', function (url) {
  if (!url) return ''
  if (url.indexOf('http') === -1) return ENV.staticUrl + url
  return url
})

Vue.filter('formatTime', (str, fromatStr = 'YYYY.MM.DD', timeStamp = 0) => {
  if (timeStamp) {
    return uni.$moment(new Date(parseInt(str) * 1000)).format(fromatStr)
  }
  return uni.$moment(str).format(fromatStr)
})

Vue.filter('formatphone', (value) => {
  if (value) {
    var len = value.length
    var xx = value.substring(3, len - 4)
    var values = value.replace(xx, '****')
    return values
  }
  return ''
})

Vue.filter('formatTimeFromNow', (str) => {
  return uni.$moment(str).startOf('day').fromNow()
})

Vue.filter('zero', (val) => {
  return val || 0
})

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export const formatPirce = (priceStr, idx) => {
  if (isNaN(priceStr)) return '0'
  if (typeof priceStr === 'number')priceStr += ''
  const arr = priceStr.split('.')
  if (idx === 0) return arr[0]
  if (idx === 1 && arr.length > 1) return ('.' + arr[1])
  return ''
}

Vue.filter('formatPirce', (val, idx) => {
  return formatPirce(val, idx)
})

Vue.filter('formatMoeny', (price) => {
  if (isNaN(price)) return 0
  if (!price) return 0
  return parseInt(Number(price) * 100) / 100
})

export const formatTimeFun = function (date) {
  const year = new Date(date * 1000).getFullYear()
  const month = new Date(date * 1000).getMonth() + 1
  const day = new Date(date * 1000).getDate()
  const hour = new Date(date * 1000).getHours()
  const minute = new Date(date * 1000).getMinutes()
  const second = new Date(date * 1000).getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatRichTextByUparseFn = (html) => {
  if (!html) return
  let newContent = html.replace(/<embed[^>]*>/gi, function (match, capture) {
    match = match.replace(/type="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');
    // x5-video-player-type="h5-page" 同层播放
    match = match.replace(/embed/gi, 'video x5-video-player-type="h5-page"')
    match = match.replace(/width="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');

    match = match.replace(/autostart="[^"]+"/gi, '')
    match = match.replace(/loop="[^"]+"/gi, '')

    match = match.replace(/\/>/gi, '></video>')

    return match
  })

  newContent = newContent.replace(/<oembed[^>]*>/gi, function (match, capture) {
    match = match.replace(/type="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');
    match = match.replace(/oembed/gi, 'video x5-video-player-type="h5-page"')
    match = match.replace(/width="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');
    match = match.replace(/url/gi, 'src')

    match = match.replace(/\/>/gi, '></video>')

    return match
  })

  // 替换地址
  newContent = newContent.replace(/="\/uploadfiles/gi, `="${ENV.staticUrl}/uploadfiles`)

  // newContent= newContent.replace(/<img[^>]*>/gi,function(match,capture){
  //   match = match.replace(/style="[^"]+"/gi, '')//.replace(/style='[^']+'/gi, '');
  //   match = match.replace(/width="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
  //   match = match.replace(/height="[^"]+"/gi, '')//.replace(/height='[^']+'/gi, '');
  //
  //   //图片app不支持
  //   // #ifdef APP-PLUS
  //   match = match.replace(/!*.webp/gi, '')
  //   // #endif
  //
  //   return match;
  // });

  // newContent = newContent.replace(/\<img/gi, '<img style="width:100%;vertical-align:middle"');

  newContent = newContent.replace(/oembed/gi, 'video')

  return newContent
}
