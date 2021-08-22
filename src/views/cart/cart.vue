<template>
	<div class="wapper">
		<NavBar class="navbar">
		<div slot="center">购物车({{length}})</div>
	  </NavBar>
		<Scroll class="content" ref="scroll">
			<CartList></CartList>
		</Scroll>
		<CartBottonBar></CartBottonBar>
	</div>
</template>

<script>
	import NavBar from '@/components/common/navbar/NavBar'
	import CartList from './childComps/CartList.vue'
	import Scroll from '@/components/common/scroll/Scroll'
	import CartBottonBar from '@/views/cart/childComps/CartBottonBar'
	import {mapGetters} from 'vuex'
	export default {
		components:{
			NavBar,
			CartList,
			Scroll,
			CartBottonBar
		},
		activated(){
			this.$refs.scroll.HeightRefresh();
		},
		computed:{
			...mapGetters({
				length:'getCartListLength'
			})
		}
	}
</script>

<style scoped>
.navbar {
	background-color: var(--color-tint);
	color: aliceblue;
	font-weight: 500;
}
.wapper {
	height: 100vh;
}
.content {
	height: calc(100% - 44px - 49px);
}
</style>