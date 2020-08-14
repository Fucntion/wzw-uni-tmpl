<template>
  <view class="fengTitle">
    <view class="fengTitleLeft">
      <view class="xiao">
      
      </view>
      <view class="da">
      
      </view>
    </view>
    <view class="fengTitleCenter">
      {{title}}
    </view>
    <view class="fengTitleRight">
      <view class="da">
      
      </view>
      <view class="xiao">
      
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name:'CircleTitle',
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: '标题'
    }
  }
}
</script>

<style lang="scss" scoped>
  .fengTitle {
    height: 80rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .fengTitleLeft, .fengTitleRight {
      display: flex;
      height: 80rpx;
      align-items: center;
      
      .da {
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;
        background-color: #F43131;
      }
      
      .xiao {
        width: 9rpx;
        height: 9rpx;
        border-radius: 50%;
        background-color: #F43131;
      }
    }
    
    .fengTitleLeft {
      .da {
        margin-left: 10rpx;
      }
    }
    
    .fengTitleRight {
      .da {
        margin-right: 10rpx;
      }
    }
    
    .fengTitleCenter {
      height: 80rpx;
      line-height: 80rpx;
      font-size: 30rpx;
      color: #333333;
      font-weight: 500;
      margin-left: 20rpx;
      margin-right: 20rpx;
    }
    
  }
</style>
