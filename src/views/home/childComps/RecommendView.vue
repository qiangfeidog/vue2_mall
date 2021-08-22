<template>
	<div class="recommend">
		<div v-for="item in recommends" class="recommend-items">
				<img :src="item.image"></img>
				<div>{{item.title}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			recommends:{
				type:Array,
				default(){
					return []
				}
			}
		},
		components:{

		}
	}
</script>

<style scoped>
.recommend {
	display: flex;
	text-align: center;
	padding: 10px 0 20px;
	border-bottom: 10px solid #eee ;
}
.recommend-items {
	flex: 1;
	font-size: 12px;
}
.recommend-items img {
	height: 60px;
	width: 60px;
	margin-bottom: 8px;
}
</style>