<template>
	<div class="goods">
		<GoodsListItem v-for="item in goods" :goodsItem="item"></GoodsListItem>
	</div>
</template>

<script>
	import GoodsListItem from './GoodsListItem'
	export default {
		props:{
			goods:{
				type:Array,
				default(){
					return []
				}
			}
		},
		components:{
			GoodsListItem
		}
		
	}
</script>

<style scoped>
.goods{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
</style>