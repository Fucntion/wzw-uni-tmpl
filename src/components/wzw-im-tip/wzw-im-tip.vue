<template>
  <div class="im-tip-wrap" v-if="ifshow" @click="toRoom">
    <div class="left">
      <layout-icon display="inline" size="32" type="iconlaba" color="#999"></layout-icon>
    </div>
    <div class="right">
      <div class="info flex flex-vertical-c flex-justify-between">
        <div class="nickname c3 fz-17">{{chat.name||''}}</div>
        <div class="time c9 fz-13">{{chat.time||''}}</div>
      </div>
      <div class="msg c9 fz-13">
        <block v-if="chat.type==='text'">
          {{chat.content}}
        </block>
        <block v-if="chat.type==='prod'">
          商品:[{{chat.content.prod_name}}]
        </block>
        <block v-if="chat.type==='image'">
          图片:收到一张照片
        </block>
      </div>
    </div>
  </div>
</template>

<script>
// 消息卡片组件
import { error, modal, linkToEasy } from '@/common/fun'
import LayoutIcon from '@/components/layout-icon/layout-icon'
import {componetMixin} from '@/mixins/BaseMixin'

export default {
  name: 'WzwImTip',
  mixins:[componetMixin],
  components: { LayoutIcon },
  props: {

  },
  data () {
    return {
      ifshow: false,
      chat: {
        name: '',
        type: '',
        content: ''
      }
    }
  },
  watch: {
    // 默认显示4S
    ifshow (newVal) {
      if (newVal) {
        setTimeout(() => {
          this.ifshow = false
        }, 4000)
      }
    }
  },
  methods: {
    toRoom () {
      const chatItem = this.chat
      // 商家得找客户聊
      const str = chatItem.from_uid

      const breakStrIdx = str.indexOf('_')
      if (breakStrIdx === -1) {
        modal('进入聊天室失败')
        return
      }
      const type = str.substr(0, breakStrIdx)
      const id = str.substr(breakStrIdx + 1)
      console.log(type, id, `/pagesA/support/Im?type=${type}tid=${id}&room_title=${chatItem.name}`)
      if (!type || !id) {
        modal('聊天室参数错误')
        return
      }
      linkToEasy(`/pagesA/support/Im?type=${type}&tid=${id}&room_title=${chatItem.name}`)
    },
    show (chat) {
      console.log('plugin is show', chat)
      this.$set(this, 'chat', chat)
      // this.chat = chat
      console.log(this.chat)
      setTimeout(() => {
        this.ifshow = true
      }, 100)
    },
    hide () {
      this.show = false
    },
    close () {
      console.log('plugin is close')
      this.ifshow = false
    }
  }
}
</script>
<style scoped lang="scss">

  .im-tip-wrap{
    position: fixed;
    z-index: 999;
    width: 700rpx;
    top: 80px;
    left: 25rpx;
    height: 140rpx;
    background: #fff;
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: rgba(0,0,0,.4) 0 0 10px;
    display: flex;
    .left{
      width: 160rpx;
      text-align: center;
      line-height: 140rpx;
    }
    .right{
      width: 540rpx;
      padding: 30rpx 30rpx 30rpx 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .nickname{
        max-width: 400rpx;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .msg{
        max-width: 600rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
