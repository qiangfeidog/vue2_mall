<template>
	<div class="border" :class="{'checkButton':isActive}">
    <img src="~@/assets/img/cart/tick.svg" alt="">
	</div>
</template>

<script>
	export default {
		props:{
			isActive:{
				type:Boolean,
				default:true
			}
		}
	}
</script>

<style scoped>
.checkButton {
	background-color: red;

}
.border {
	border-radius: 50%;
	border: 2px solid #eeeeee;
}
</style>