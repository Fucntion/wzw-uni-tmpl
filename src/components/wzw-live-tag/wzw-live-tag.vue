<template>
  <div class="live-status" @click="bindToRoom" v-if="liveStatus ==101 || liveStatus ==102 || liveStatus ==105">
    <div class="flex flex-vertical-c">
      <image src="/static/loading3.gif" class="live-icon-img" />
      <span class="text" v-if="liveStatus ==101 || liveStatus ==105">
      直播
    </span>
      <span class="text" v-else>
      直播预告
    </span>
    </div>
  </div>
</template>

<script>

// const livePlayer = requirePlugin('live-player-plugin')
export default {
  name: 'wzw-live-tag',
  components: { },
  props: {
    productInfo: {
      required: true,
      type: Object
    },
    room_id: {
      default: '',
      type: [Number, String]
    }
  },
  watch: {
    room_id: {
      immediate: true,
      handler (roomId) {
        // console.log('room_id value change', roomId)
        if (!roomId) return

        this.refreshLiveStatus(roomId)
      }
    }
  },
  data () {
    return {
      intervalInstance: null,
      liveStatus: 0
    }
  },
  methods: {
    async refreshLiveStatus (roomId) {
      // console.log('roomid is ' + roomId)
      // if (!livePlayer) {
      //   throw Error('直播的运行换件创建失败')
      // }

      // const { live_end_time, live_start_time } = this.productInfo
      // const nowTimeStamp = uni.$moment().unix()
      // // console.log(nowTimeStamp)
      // if (live_end_time && live_start_time) {
      //   if (nowTimeStamp > live_start_time && nowTimeStamp < live_end_time) {
      //     this.liveStatus = 101
      //   }
      //
      //   if (nowTimeStamp < live_start_time) {
      //     this.liveStatus = 102
      //   }
      // }

      // 如果有结果就覆盖
      // livePlayer.getLiveStatus({ room_id: roomId })
      //   .then(res => {
      //     // 101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常，107：已过期
      //     this.liveStatus = res.liveStatus
      //     console.log('get live status', res.liveStatus)
      //   })
      //   .catch(err => {
      //     console.log('get live status', err)
      //   })

    },
    bindToRoom () {
      // this.$toRoom(this.room_id)
    }
  },
  beforeDestroy () {
    // clearInterval(this.intervalInstance)
  }
}
</script>
<style lang="scss" scoped>
  .live-icon-img{
    width: 12px;
    height: 12px;
    top: 2px;
  }
  .text{
    font-size: 10px;
  }
  .live-status {
    height: 16px;
    display: inline-block;
    margin-right: 4px;
    background: linear-gradient(#F53636, #FF5539);
    color: #fff;
    padding: 0 8px 0 4px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
</style>
