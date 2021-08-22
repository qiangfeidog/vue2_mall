<template>
	<div class="tabControl">
		<div v-for="(item,index) in titles" class="tabControl-item" :class="{active:itemIndex===index}" @click="itemClick(index)">
				<span>{{item}}</span>
    </div>
	</div>
</template>

<script>
	export default {
		props:{
			titles:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return {
				itemIndex:0
			}
		},
		methods: {
			itemClick(index){
				this.itemIndex=index
				this.$emit("tabClick",index)
			}
		},
	}
</script>

<style scoped>
.tabControl {
	display: flex;
	/* position: sticky; */
	/* top: 44px; */
	text-align: center;
	font-size: 14px;
	background-color: #ffffff;
	/* z-index: 1; */
}
.tabControl-item {
	flex: 1;
	height: 40px;
	line-height: 40px;
}
.active {
	color: rgb(247, 150, 166);
}
.active span {
	border-bottom: red 3px solid;
	padding: 5px;
}
</style>