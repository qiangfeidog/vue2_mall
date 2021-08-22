<template>
	<div class="wapper" ref="wapper">
    <div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		props:{
			probeType:{
				type:Number,
				default:0
			},
			pullUpLoad:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				scroll:null
			}
		},
		mounted() {
			this.scroll = new  BScroll(this.$refs.wapper, {
				pullUpLoad: this.pullUpLoad,
				probeType:this.probeType,
				click:true
     }),
		 //监听滚动的区域
			this.scroll.on('scroll',(position) => {
				// console.log(position);
				this.$emit('scroll',position)
			}),
			//监听上拉更新事件
			this.scroll.on('pullingUp',() => {
				// console.log('上拉加载更多');
				this.$emit('pullLoad')
			})
		},
		methods:{
			finishPullUp(){
				this.scroll && this.scroll.finishPullUp()
			},
			HeightRefresh(){
				this.scroll && this.scroll.refresh()
			}
		}
	}
</script>

<style scoped>
.wapper {
	overflow: hidden;
}
</style>