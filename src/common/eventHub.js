import Vue from 'vue'

// 可以用来做简单的不同页面通讯
const eventHub = new Vue()

export default eventHub

// eventHub.$on('flash-page', arg => {
// 	console.log(arg)
// })
// eventHub.$emit('flash-page', {x: 1, y: 1, z: 1})
