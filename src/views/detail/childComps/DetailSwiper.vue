<template>
	<div class="detailSwiter">
		<Swiper class="swiperstyle">
			<SwiperItem v-for="item in topImages">
				<img :src="item" alt="">
			</SwiperItem>
		</Swiper>
	</div>
</template>

<script>
	import {Swiper, SwiperItem} from "@/components/common/swiper"
	export default {
		components:{
			Swiper,
			SwiperItem
		},
		props:{
			topImages:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style scoped>
.swiperstyle {
	height: 300px;
	overflow: hidden;
}
</style>