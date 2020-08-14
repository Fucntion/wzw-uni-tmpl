<template>
	<div class="item" :style="{width}" @click="openNext">
		<LayoutIcon :rotate="rotate" :type="type" :weight="weight" :display="display" :color="color" :size="size"></LayoutIcon>
		<div class="icon-name">{{name}}</div>
	</div>
</template>
<script>
import LayoutIcon from '@/components/layout-icon/layout-icon'

export default {
  components: {
    LayoutIcon
  },
	methods:{
		openNext(){
			this.$emit('openNext',this.index)
		}
	},
	props: {
		index:{
			type: Number,
			default: 0
		},
  	width:{
		  type: String,
		  default: '80rpx'
	  },
    rotate: {
      type: String,
      default: '0deg'
    },
    type: {
      require: true,
      type: String,
      default: ''
    },
    weight: {
      type: String,
      default: 'normal'
    },
    display: {
      type: String,
      default: 'block'
    },
    color: {
      type: String,
      default: '#666'
    },
    size: {
      type: [Number, String],
      default: 28
    },
		name: {
      type: String,
			default: ''
		}
	}
}

</script>
<style lang="scss" scoped>
	.item {

		text-align: center;
		font-size: 24rpx;
		color: #333;
		margin-bottom: 67rpx;
	}
	.icon-name {
		text-align: center;
	}
</style>
