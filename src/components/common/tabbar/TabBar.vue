<template>
<div id="tab-bar">
	      <slot></slot>
</div>
	
</template>

<script>
	import TabBarItem from './TabBarItem.vue'
	export default {
		components:{
			TabBarItem
		}
	}
</script>

<style scoped>

#tab-bar {
	display: flex;
	background-color: #f6f6f6;
	box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
}


</style>