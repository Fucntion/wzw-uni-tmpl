<template>
  <div class="img-upload-box">
    <div
      @click="bindThumbClick(idx,img)"
      class="img-item img"
      v-for="(img,idx) in imgs"
      :key="idx"
      :style="{backgroundImage:'url('+img+')'}">
      <!--      <span class="progress" v-if="img.task.progress<100">{{img.task.progress}}%</span>-->
    </div>
    <div
      class="img-item add"
      @click="addImg"
      v-if="imgs.length<limit"
    >
      <layout-icon color="#ddd" size="40" type="iconupload"></layout-icon>
    </div>
  </div>
</template>

<script>
import { chooseImageByPromise, getArrColumn, getDomain, uploadImages } from '@/common/helper'
import { Exception } from '@/common/Exception'
import LayoutIcon from '@/components/layout-icon/layout-icon'

export default {
  components: { LayoutIcon },
  props: {
    // 额外参数，可以带回去
    ext: {
      default: false
    },
    limit: {
      default: 9,
      type: Number
    },
    has: {
      default: []
    }
  },
  data () {
    return {
      bindClick: false,
      imgTempList: [],
      cate_ids: '',
      imgs: []
    }
  },
  watch: {
    has (newVal) {
      if (Array.isArray(newVal) && newVal.length > 0) {
        this.imgs = newVal.concat([])
      }
    }
  },
  methods: {
    bindThumbClick (idx, img) {
      uni.showActionSheet({
        itemList: ['预览图片', '移除图片'],
        success: (res) => {
          const { tapIndex } = res

          if (tapIndex === 0) {
            uni.previewImage({
              urls: [img]
            })
          }
          if (tapIndex === 1) {
            // this.imgTempList.splice(idx, 1)
            this.imgs.splice(idx, 1)
          }
        },
        fail (res) {

        }
      })
    },
    async addImg () {
      try {
        if (this.bindClick) throw Error('操作过快')
        const files = await chooseImageByPromise({ count: this.limit - this.imgs.length }).catch((err) => { throw Error('请选择图片') })

        const arr1 = files.map(file => {
          return { ...file, task: { progress: 0, totalBytesSent: 0, totalBytesExpectedToSend: 0 } }
        })
        this.imgTempList = this.imgTempList.concat(arr1)
        const imgs = getArrColumn(files, 'path')
        const ossUrls = await uploadImages({ imgs, progressList: this.imgTempList }).catch(msg => { throw Error(msg) })

        for (var i = 0; i < ossUrls.length; i++) {
          ossUrls[i] = getDomain(ossUrls[i])
        }

        this.imgs = this.imgs.concat(ossUrls)

        this.bindClick = false
        // 把ext带回去，方便弄一些骚操作。比如下标
        this.$emit('done', { imgs: this.imgs, ext: this.ext })
      } catch (e) {
        Exception.handle(e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .img{
    @include cover-img();
    &-upload-box{
      display: flex;
      flex-wrap: wrap;
      width: 400rpx;
    }
    &-item{
      width: 120rpx;
      height: 120rpx;
      margin-bottom: 20rpx;
      margin-right: 20rpx;
      position: relative;
      .progress{
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 120rpx;
        color: white;
        background: rgba(0,0,0,.3);
      }
      &:nth-child(3n+0){
        margin-right: 0;
      }
    }
  }
  .add{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px dashed #ccc;
    box-sizing: border-box;
    margin-right: 0;
    margin-bottom: 0;
  }
</style>
