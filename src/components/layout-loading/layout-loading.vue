<template>
  <div>
    <block v-if="type==='circle'">
      <view :style="{display:displayStyle}" class="wx_loading_view" :class="extClass" :animation="animationData" id="wx_loading_view">
        <view v-elseif="type==='circle'" class="weui-loadmore">
          <view class="weui-loading"></view>
          <view v-if="tips" class="weui-loadmore__tips">{{tips}}</view>
        </view>
      </view>
    </block>
    <block v-if="type==='fish'">
      <div class="fish"></div>
    </block>
  </div>
</template>

<script>
// Page({
//   data: {
//     tips: '请稍后',
//     show: true,
//     animated: true
//   },
//   onShow() {
//     this.timer = setInterval(() => {
//       this.setData({
//         show: !this.data.show
//       })
//     }, 2000)
//   },
//   onUnload() {
//     clearInterval(this.timer)
//   }
// })
// <mp-loading type="circle"></mp-loading>
// <!-- <mp-loading type="circle" tips="{{tips}}"></mp-loading> -->
// <mp-loading duration="{{900}}" ext-class="demo0" type="dot-gray" show="{{show}}" animated="{{animated}}"></mp-loading>
// <mp-loading type="dot-white" ext-class="demo1"></mp-loading>

export default {
  name: 'layout-loading',
  props: {
    extClass: {
      type: String,
      default: ''
    },
    show: {
      // 默认显示出来
      type: Boolean,
      default: true,
      immediate: true,
      handler (newValue) {
        this._computedStyle(newValue, this.animated)
      }
    },
    animated: {
      type: Boolean,
      default: false,
      handler (newValue) {
        this._computedStyle(this.show, newValue)
      }
    },
    duration: {
      // 过渡动画时间
      type: Number,
      default: 350
    },
    type: {
      type: String,
      default: 'circle' // 取值dot-white、dot-gray、circle
    },
    tips: {
      // type是circle的时候才有效
      type: String,
      default: '加载中'
    }
  },
  data () {
    return {
      animationData: {},
      animationInstance: {},
      displayStyle: 'none'
    }
  },
  methods: {
    _computedStyle (show, animated) {
      // console.log(show, animated)
      if (!show) {
        if (!animated) {
          this.displayStyle = 'none'
        } else {
          this._startAnimation()
        }
      } else {
        this.displayStyle = ''
      }
    },
    _startAnimation () {
      setTimeout(() => {
        const animation = this.animationInstance
        animation.height(0).step()
        this.animationData = animation.export()
      }, 0)
    }
  },
  created () {
    // console.log(this.show)
    const animationInstance = uni.createAnimation({
      duration: this.duration,
      timingFunction: 'ease'
    })
    this.animationInstance = animationInstance
    this._computedStyle(this.show, this.animated)
  }
}
</script>
<style lang="scss" scoped>
  .wx_loading_view{
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  @-webkit-keyframes weuiLoading {
    0% {
      transform: rotate3d(0, 0, 1, 0deg);
    }
    100% {
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }
  @keyframes weuiLoading {
    0% {
      transform: rotate3d(0, 0, 1, 0deg);
    }
    100% {
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }

  .weui-loadmore {
    width: 65%;
    margin: 1.5em auto;
    line-height: 1.6em;
    font-size: 14px;
    text-align: center;
  }
  .weui-loadmore__tips {
    display: inline-block;
    vertical-align: middle;
  }

  .weui-loading {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    animation: weuiLoading 1s steps(12, end) infinite;
    background: transparent url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23E9E9E9' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23989697' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%239B999A' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23A3A1A2' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23ABA9AA' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23B2B2B2' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23BAB8B9' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23C2C0C1' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23CBCBCB' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23D2D2D2' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23DADADA' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23E2E2E2' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E") no-repeat;
    background-size: 100%;
  }

  .fish{
    width: 40px;
    height: 40px;
    background-image:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiBub25lOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBhbmltYXRpb24tcGxheS1zdGF0ZTogcnVubmluZzsgYW5pbWF0aW9uLWRlbGF5OiAwczsiIHdpZHRoPSIyMDBweCIgaGVpZ2h0PSIyMDBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIj4KPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzQ2YjIxIiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZS1kYXNoYXJyYXk9IjQyLjc2NDgyMTM3MDQ0MjcxIDQyLjc2NDgyMTM3MDQ0MjcxIiBkPSJNMjQuMyAzMEMxMS40IDMwIDUgNDMuMyA1IDUwczYuNCAyMCAxOS4zIDIwYzE5LjMgMCAzMi4xLTQwIDUxLjQtNDAgQzg4LjYgMzAgOTUgNDMuMyA5NSA1MHMtNi40IDIwLTE5LjMgMjBDNTYuNCA3MCA0My42IDMwIDI0LjMgMzB6IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0eWxlPSJ0cmFuc2Zvcm06IHNjYWxlKDAuOCk7IHRyYW5zZm9ybS1vcmlnaW46IDUwcHggNTBweDsgYW5pbWF0aW9uLXBsYXktc3RhdGU6IHJ1bm5pbmc7IGFuaW1hdGlvbi1kZWxheTogMHM7Ij4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2UtZGFzaG9mZnNldCIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMS44NTE4NTE4NTE4NTE4NTE2cyIga2V5VGltZXM9IjA7MSIgdmFsdWVzPSIwOzI1Ni41ODg5MjgyMjI2NTYyNSIgc3R5bGU9ImFuaW1hdGlvbi1wbGF5LXN0YXRlOiBydW5uaW5nOyBhbmltYXRpb24tZGVsYXk6IDBzOyI+PC9hbmltYXRlPgo8L3BhdGg+CjwhLS0gW2xkaW9dIGdlbmVyYXRlZCBieSBodHRwczovL2xvYWRpbmcuaW8vIC0tPjwvc3ZnPg==');
  }
</style>
