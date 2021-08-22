<template>
	<div>
		<CartListItem v-for="item in cartList" :itemInfo="item"></CartListItem>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import CartListItem from './CartListItem.vue'
	export default {
		components:{
			CartListItem
		},
		computed:{
			...mapGetters({
				cartList:'getCartList'
			})
		}
	}
</script>

<style scoped>

</style>