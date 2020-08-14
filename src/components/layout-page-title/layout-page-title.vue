<template>
  <div :style="extStyle">
    <!--状态栏-->
    <div class="status-bar" :style="{height:menuButtonInfo.top+'px',backgroundColor:statusBgColor}"></div>
    <!--导航栏-->
    <div class="navigation-bar" :style="{height:menuButtonInfo.height+'px',backgroundColor:menuButtonBgColor}">
      <div v-if="leftMode==='style2'" class="left-menu flex flex-vertical-c" style="box-sizing: border-box;"  :class="{white:whiteLeftMenu}" :style="{height:menuButtonInfo.height+'px',width:menuButtonInfo.width+'px',borderRadius:menuButtonInfo.height+'px',left:systemInfo.windowWidth-menuButtonInfo.right+'px'}">
        <div style="flex:1;" class="flex flex-vertical-c flex-justify-c" @click="bindBack">
          <layout-icon v-if="showLeftIcon"  class="left-icon" :color="whiteLeftMenu?whiteLeftMenuColor:letfIconColor" :size="letfIconSize" type="iconnavigator-left"></layout-icon>
        </div>
        <div :style="{width:'1px',height:'50%',background:whiteLeftMenu?whiteLeftMenuColor:'#eee'}" class="line"></div>
        <div style="flex:1;" class="flex flex-vertical-c flex-justify-c">
          <layout-icon v-if="showHomeIcon" @click="bindHome"  class="left-icon" :color="whiteLeftMenu?whiteLeftMenuColor:letfIconColor" :size="HomeIconSize" type="iconnavigator-home"></layout-icon>
        </div>
      </div>
      <div v-if="leftMode==='style1'" @click="bindBack" class="left-icon-style1 flex flex-vertical-c p-l-10 p-r-10" :style="{height:menuButtonInfo.height+'px'}">
        <layout-icon :color="letfIconColor"  size="17" type="iconnavigator-left"></layout-icon>
      </div>
      <div class="title" :style="{lineHeight:menuButtonInfo.height+'px'}">{{pageTitle}}</div>
    </div>
  </div>
</template>

<script>
import LayoutIcon from '@/components/layout-icon/layout-icon'
import { backFunc, linkToEasy, toHome } from '@/common/fun'
import { componetMixin } from '@/mixins/BaseMixin'

export default {
  name: 'layoutPageTitle',
  mixins: [componetMixin],
  components: { LayoutIcon },
  props: {
    showLeftIcon: {
      type: Boolean,
      default: true
    },
    leftMode:{
      default:'style1'
    },
    whiteLeftMenu: {
      type: Boolean,
      default: false
    },
    whiteLeftMenuColor: {
      type: String,
      default: '#ffffff'
    },
    showHomeIcon: {
      type: Boolean,
      default: true
    },
    extStyle: {
      type: String,
      default: ''
    },
    statusBgColor: {
      type: String,
      default: '#ffffff'
    },
    menuButtonBgColor: {
      type: String,
      default: '#ffffff'
    },
    pageTitle: {
      type: String,
      default: ''
    },
    letfIconSize: {
      type: Number,
      default: 17
    },
    HomeIconSize: {
      type: Number,
      default: 19
    },
    letfIconColor: {
      type: String,
      default: '#333'
    },
    // 代表是否emit左侧被点击事件
    letfFn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    bindHome(){
      toHome()
    },
    bindBack () {
      if (this.letfFn) this.$emit('clickLeft')
      if (!this.letfFn) backFunc()
    }
  },
  onReady () {

  }
}
</script>
<style lang="scss" scoped>
  .navigation-bar {
    position: relative;

    .left-menu{
      border:1rpx solid rgba(0,0,0,.10);
      position: absolute;
      top: 0;

      &.white{
        border:1rpx solid #fff;

      }
    }



    .left-icon-style1 {
      position: absolute;
      left: 0;
      top: 0;
    }

    .title {
      text-align: center;
      font-size: 16px;
      color: #333;
    }
  }
</style>
