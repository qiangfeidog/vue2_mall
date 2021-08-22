<template>
			<swiper>
				<swiper-item v-for="item in banners">
						<img :src="item.image" @load="imgLoad"></img>
				</swiper-item>
			</swiper>
</template>

<script>
		import {Swiper, SwiperItem} from '@/components/common/swiper/index'
	export default {
		props:{
			banners:{
				type:Array,
				default() {
					return []
				}
			}
		},
		data(){
			return {}
			isLoad:false
		},
		components:{
			Swiper,
			SwiperItem
		},
		methods:{
			imgLoad(){
				if (!this.isLoad){
					this.$emit('SwiperImgLoad')
					this.isLoad=true
				}
			}
		}
		
	}
</script>

<style scoped>

</style>