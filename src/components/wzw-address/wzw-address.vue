<template>
  <div>
    <div @touchmove.prevent.stop="noop" v-if="active" class="masks" @click.stop="close"></div>
    <div v-if="active" class="wraps">
      <div class="titles">
        <div class="texts">选择城市</div>
        <div @click.stop="subFn" class="btns">确认</div>
      </div>
      <!--<input type="text" v-model="selects"/>-->
      <div class="main">
        <div class="select-list flex flex-vertical-center fz-14 m-b-20 p-l-10">
          <div class="select-text m-r-15" @click="bindClickText(0)" v-if="provinceStr&&visiable>=0">{{provinceStr}}</div>
          <div class="select-text m-r-15" @click="bindClickText(1)" v-if="cityStr&&visiable>=1">{{cityStr}}</div>
          <div class="select-text m-r-15" @click="bindClickText(2)" v-if="areaStr&&visiable>=2">{{areaStr}}</div>
          <div class="select-text m-r-15" @click="bindClickText(3)" v-if="townStr&&visiable>=3">{{townStr}}</div>
        </div>
        <div class="fz-14 container">
          <swiper class="swiper-box" :current="currentSwiperIndex">
            <swiper-item class="swiper-item"   v-if="visiable>=0">
              <div
                v-for="(item,index) of provinceList"
                :key="index" class="h-60"
                :style="{fontWeight:(selectIdxList[0] === index?'bold':'')}"
                @click="selectFn(0,index,item)"
              >
                <layout-icon type="iconradio-check" color="#F53636" class="m-r-5" v-if="selectIdxList[0] === index"></layout-icon>
                {{item.area_name}}
              </div>
            </swiper-item>
            <swiper-item class="swiper-item"  v-if="visiable>=1">
              <div
                v-for="(item,index) of cityList"
                :key="index" class="h-60"
                @click="selectFn(1,index,item)"
                :style="{fontWeight:(selectIdxList[1] === index?'bold':'')}"
              >
                <layout-icon type="iconradio-check" color="#F53636" class="m-r-5" v-if="selectIdxList[1] === index"></layout-icon>
                {{item.area_name}}
              </div>
            </swiper-item>
            <swiper-item class="swiper-item"  v-if="visiable>=2">
              <div
                v-for="(item,index) of areaList"
                :key="index"
                class="h-60"
                :style="{fontWeight:(selectIdxList[2] === index?'bold':'')}"
                @click="selectFn(2,index,item)"
              >
                <layout-icon type="iconradio-check" color="#F53636" class="m-r-5" v-if="selectIdxList[2] === index"></layout-icon>
                {{item.area_name}}
              </div>
            </swiper-item>
            <swiper-item class="swiper-item" v-if="visiable>=3">
              <div
                v-for="(item,index) of townList"
                :key="index"
                class="h-60"
                @click="selectFn(3,index,item)"
                :style="{fontWeight:(selectIdxList[3] === index?'bold':'')}"
              >
                <layout-icon type="iconradio-check" color="#F53636" class="m-r-5" v-if="selectIdxList[3] === index"></layout-icon>
                {{item.area_name}}
              </div>
            </swiper-item>
          </swiper>

        </div>
      </div>
    </div>
    <slot>
    </slot>
  </div>
</template>

<script>
import LayoutIcon from '@/components/layout-icon/layout-icon.vue'
import { getAreaByPid } from '@/api/common'
import { findArrayIdx, getArrColumn } from '@/common/helper'
import { error } from '@/common/fun'

export default {
  components: { LayoutIcon },
  props: {
    // 可配置的 显示几级  0 是省级  1是省市  2是省市县  3是省市县区
    visiable: {
      type: Number,
      default: 3
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    // 已经选中的area_id，记住不是下标，而是area_id
    province: {
      type: Number
    },
    city: {
      type: Number
    },
    area: {
      type: Number
    },
    town: {
      type: Number
    }
  },
  data () {
    return {
      active: false,
      selectIdxList: [-1, -1, -1, -1], // 初始化标记为-1,意味着所有的都没有选中
      currentSwiperIndex: 0, // 当前激活的idx
      provinceList: [],
      cityList: [],
      areaList: [],
      townList: [],
      tempObj: {}
    }
  },
  computed: {
    provinceStr () {
      try {
        const idx = this.selectIdxList[0]
        return this.provinceList[idx].area_name
      } catch (e) {
        return ''
      }
    },
    cityStr () {
      try {
        const idx = this.selectIdxList[1]
        return this.cityList[idx].area_name
      } catch (e) {
        return ''
      }
    },
    areaStr () {
      try {
        const idx = this.selectIdxList[2]
        return this.areaList[idx].area_name
      } catch (e) {
        return ''
      }
    },
    townStr () {
      try {
        const idx = this.selectIdxList[3]
        return this.townList[idx].area_name
      } catch (e) {
        return ''
      }
    }
  },
  watch: {
    provinceStr: {
      handler (newVal, oldVal) {
        console.log(`provinceStr is ${newVal}`)
        this.changeProvince()
      }
    },
    cityStr: {
      handler (newVal, oldVal) {
        console.log(`cityStr is ${newVal}`)
        this.changeCity()
      }
    },
    areaStr: {
      handler (newVal, oldVal) {
        console.log(`areaStr is ${newVal}`)
        this.changeArea()
      }
    },
    townStr: {
      handler (newVal, oldVal) {
        console.log(`townStr is ${newVal}`)
      }
    }
  },
  mounted  () {
    console.log(this.lazyLoad)
    if (!this.lazyLoad) this._init_func()
  },
  methods: {
    subFn () {
      this.active = false
      let rt = {}
      if (Number(this.visiable) === 3) {
        const selectAreaList = [this.provinceList[this.selectIdxList[0]], this.cityList[this.selectIdxList[1]], this.areaList[this.selectIdxList[2]], this.townList[this.selectIdxList[3]]]
        rt = {
          strArr: [this.provinceStr, this.cityStr, this.areaStr, this.townStr],
          str: [this.provinceStr, this.cityStr, this.areaStr, this.townStr].join(' '),
          id: getArrColumn(selectAreaList, 'area_id')
        }
      } else if (Number(this.visiable) === 2) {
        const selectAreaList = [this.provinceList[this.selectIdxList[0]], this.cityList[this.selectIdxList[1]], this.areaList[this.selectIdxList[2]]]
        rt = {
          strArr: [this.provinceStr, this.cityStr, this.areaStr],
          str: [this.provinceStr, this.cityStr, this.areaStr].join(' '),
          id: getArrColumn(selectAreaList, 'area_id')
        }
      } else if (Number(this.visiable) === 1) {
        const selectAreaList = [this.provinceList[this.selectIdxList[0]], this.cityList[this.selectIdxList[1]]]
        rt = {
          strArr: [this.provinceStr, this.cityStr],
          str: [this.provinceStr, this.cityStr].join(' '),
          id: getArrColumn(selectAreaList, 'area_id')
        }
      } else {
        const selectAreaList = [this.provinceList[this.selectIdxList[0]]]
        rt = {
          strArr: [this.provinceStr],
          str: [this.provinceStr].join(' '),
          id: getArrColumn(selectAreaList, 'area_id')
        }
      }

      this.$emit('up', rt)
    },
    bindClickText (idx) {
      // console.log(idx)
      // this.$set(this.selectIdxList, idx, -1)
      this.currentSwiperIndex = idx
      // console.log(this.selectIdxList)
    },
    async changeProvince () {
      this.selectIdxList[1] = -1

      const findProvinceIdx = this.selectIdxList[0]
      if (findProvinceIdx > -1) {
        const province = this.provinceList[findProvinceIdx]
        this.cityList = await this.getAreaList({ pid: province.area_id }).catch(() => {
          throw Error('初始化市级地址失败')
        })
        if (this.visiable >= 1) {
          this.currentSwiperIndex = 1 // 设置市
        }

        console.log(this.currentSwiperIndex)
      }
    },
    async changeCity () {
      this.selectIdxList[2] = -1

      const findCityIdx = this.selectIdxList[1]
      if (findCityIdx > -1) {
        const city = this.cityList[findCityIdx]
        this.areaList = await this.getAreaList({ pid: city.area_id }).catch(() => {
          throw Error('初始化区县地址失败')
        })
        if (this.visiable >= 2) {
          this.currentSwiperIndex = 2 // 设置区县
        }
      }
    },
    async changeArea () {
      this.selectIdxList[3] = -1

      const findAreaIdx = this.selectIdxList[2]
      if (findAreaIdx > -1) {
        const area = this.areaList[findAreaIdx]
        this.townList = await this.getAreaList({ pid: area.area_id }).catch(() => {
          throw Error('初始化乡镇地址失败')
        })
        if (this.visiable >= 3) {
          this.currentSwiperIndex = 3 // 设置区县
        }
      }
    },
    /**
     * 如果是
     * @returns {Promise<unknown>}
     * @private
     */
    getAreaList ({ pid }) {
      return new Promise((resolve, reject) => {
        if (this.tempObj.hasOwnProperty(pid)) {
          resolve(this.tempObj[pid])
        } else {
          getAreaByPid({ pid }).then(res => {
            // 存起来用
            this.$set(this.tempObj, pid, res.data)
            console.log(this.tempObj)
            resolve(res.data)
          }).catch((err) => {
            reject(err)
          })
        }
      })
    },
    async _init_func () {
      try {
        if (this.visiable >= 0) {
          // 找到省
          this.provinceList = await this.getAreaList({ pid: 0 }).catch(() => {
            throw Error('初始化省级地址失败')
          })
          const findProvinceIdx = findArrayIdx(this.provinceList, { area_id: this.province })
          let province = {}
          if (findProvinceIdx !== false) {
            this.selectIdxList[0] = parseInt(findProvinceIdx)
            province = this.provinceList[findProvinceIdx]
          }
          this.selectFn(0, this.selectIdxList[0])
        } else if (this.visiable >= 1) {
          // 找到省
          this.provinceList = await this.getAreaList({ pid: 0 }).catch(() => {
            throw Error('初始化省级地址失败')
          })
          const findProvinceIdx = findArrayIdx(this.provinceList, { area_id: this.province })
          let province = {}
          if (findProvinceIdx !== false) {
            this.selectIdxList[0] = parseInt(findProvinceIdx)
            province = this.provinceList[findProvinceIdx]
          }
          this.selectFn(0, this.selectIdxList[0])

          // 初始化市
          this.cityList = await this.getAreaList({ pid: province.area_id }).catch(() => {
            throw Error('初始化市级地址失败')
          })
          const findCityIdx = findArrayIdx(this.cityList, { area_id: this.city })
          if (findCityIdx === false) {
            this.areaList = []
            this.townList = []
            this.selectIdxList[1] = -1
            return
          }
          this.selectIdxList[1] = parseInt(findCityIdx)
          const city = this.cityList[findCityIdx]
          this.selectFn(1, this.selectIdxList[1])
        } else if (this.visiable >= 2) {
          // 找到省
          this.provinceList = await this.getAreaList({ pid: 0 }).catch(() => {
            throw Error('初始化省级地址失败')
          })
          const findProvinceIdx = findArrayIdx(this.provinceList, { area_id: this.province })
          let province = {}
          if (findProvinceIdx !== false) {
            this.selectIdxList[0] = parseInt(findProvinceIdx)
            province = this.provinceList[findProvinceIdx]
          }
          this.selectFn(0, this.selectIdxList[0])

          // 初始化市
          this.cityList = await this.getAreaList({ pid: province.area_id }).catch(() => {
            throw Error('初始化市级地址失败')
          })
          const findCityIdx = findArrayIdx(this.cityList, { area_id: this.city })
          if (findCityIdx === false) {
            this.areaList = []
            this.townList = []
            this.selectIdxList[1] = -1
            return
          }
          this.selectIdxList[1] = parseInt(findCityIdx)
          const city = this.cityList[findCityIdx]
          this.selectFn(1, this.selectIdxList[1])

          // 初始化区县
          this.areaList = await this.getAreaList({ pid: city.area_id }).catch(() => {
            throw Error('初始化区县地址失败')
          })
          const findAreaIdx = findArrayIdx(this.areaList, { area_id: this.area })
          if (findAreaIdx === false) {
            this.townList = []
            this.selectIdxList[2] = -1
            this.currentSwiperIndex = 2 // 第三屏
            return
          }
          this.selectIdxList[2] = parseInt(findAreaIdx)
          const area = this.areaList[findAreaIdx]
          this.selectFn(2, this.selectIdxList[2])
        } else {
          // 找到省
          this.provinceList = await this.getAreaList({ pid: 0 }).catch(() => {
            throw Error('初始化省级地址失败')
          })
          const findProvinceIdx = findArrayIdx(this.provinceList, { area_id: this.province })
          let province = {}
          if (findProvinceIdx !== false) {
            this.selectIdxList[0] = parseInt(findProvinceIdx)
            province = this.provinceList[findProvinceIdx]
          }
          this.selectFn(0, this.selectIdxList[0])

          // 初始化市
          this.cityList = await this.getAreaList({ pid: province.area_id }).catch(() => {
            throw Error('初始化市级地址失败')
          })
          const findCityIdx = findArrayIdx(this.cityList, { area_id: this.city })
          if (findCityIdx === false) {
            this.areaList = []
            this.townList = []
            this.selectIdxList[1] = -1
            return
          }
          this.selectIdxList[1] = parseInt(findCityIdx)
          const city = this.cityList[findCityIdx]
          this.selectFn(1, this.selectIdxList[1])

          // 初始化区县
          this.areaList = await this.getAreaList({ pid: city.area_id }).catch(() => {
            throw Error('初始化区县地址失败')
          })
          const findAreaIdx = findArrayIdx(this.areaList, { area_id: this.area })
          if (findAreaIdx === false) {
            this.townList = []
            this.selectIdxList[2] = -1
            this.currentSwiperIndex = 2 // 第三屏
            return
          }
          this.selectIdxList[2] = parseInt(findAreaIdx)
          const area = this.areaList[findAreaIdx]
          this.selectFn(2, this.selectIdxList[2])

          // 初始化乡镇
          this.townList = await this.getAreaList({ pid: area.area_id }).catch(() => {
            throw Error('初始化乡镇地址失败')
          })
          const findTownIdx = findArrayIdx(this.townList, { area_id: this.town })
          if (findTownIdx === false) {
            this.selectIdxList[3] = -1
            this.currentSwiperIndex = 3 // 第三屏
            return
          }
          this.selectIdxList[3] = parseInt(findTownIdx)
          this.selectFn(3, this.selectIdxList[3])
        }
      } catch (e) {
        error(e.message)
      }
    },
    noop () {

    },
    show () {
      this.active = true
    },
    close () {
      this.active = false
    },
    selectFn (col, idx, item) {
      // console.log(col, idx, item)
      this.$set(this.selectIdxList, col, idx)
      // console.log(this.selectIdxList, this.provinceStr)
    },
    // 地址
    async getAreaByPid (pid, arr) {
      const requestRt = await getAreaByPid(pid).catch(() => {
        throw Error('初始化地址失败')
      })
      arr = requestRt.data
    }
  }

}
</script>

<style lang="scss" scoped>
  .titles {
    display: flex;
    align-items: center;
    padding: 0px 10px 15px;

    .texts {
      flex: 1;
      text-align: center;
    }

    .btns {
      background: $fun-primary-color;
      color: #333;
      font-size: 14px;
      padding: 6px 12px;
      border-radius: 2px;
      color: #fff;
      text-align: center;
    }
  }

  .h-60 {
    height: 60rpx;
    line-height: 60rpx;
    display: flex;
    align-items: center;
  }

  .masks {
    position: fixed;
    z-index: 2;
    background: rgba(0, 0, 0, .6);
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    overflow: hidden;
  }

  .wraps {
    padding: 15px 0 0;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 750rpx;
    z-index: 3;
    background: #FFFFFF;
    overflow: hidden;

  }

  .container {
    position: relative;
    height: 840rpx;
    overflow: hidden;
  }

  .select {
    &-list {

    }

    &-text {
      //border-bottom: 2px $fun-red-color solid;
      height: 60rpx;
      line-height: 60rpx;
      position: relative;

      &:after {
        display: block;
        content: '';
        width: 30px;
        height: 2px;
        background-color: $fun-red-color;
        position: absolute;
        bottom: 0rpx;
        left: 50%;
        transform: translateX(-50%);
      }
    }

  }

  .swiper {

    &-box {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    &-item {
      box-sizing: border-box;
      padding: 15px;
      overflow-y: scroll;
    }

  }
</style>
