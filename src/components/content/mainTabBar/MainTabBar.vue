<template>
	<tab-bar class="tabbar">
		<tab-bar-item path="/home">
        <img src="~@/assets/img/tabbar/home.svg" slot="item-icon" alt="">
        <img src="~@//assets/img/tabbar/home_active.svg" slot="item-icon-active">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img src="~@//assets/img/tabbar/category.svg" slot="item-icon" alt="">
        <img src="~@//assets/img/tabbar/category_active.svg" slot="item-icon-active">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img src="~@//assets/img/tabbar/shopcart.svg" slot="item-icon" alt="">
        <img src="~@//assets/img/tabbar/shopcart_active.svg" slot="item-icon-active">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="profile">
        <img src="~@//assets/img/tabbar/profile.svg" slot="item-icon" alt="">
        <img src="~@//assets/img/tabbar/profile_active.svg" slot="item-icon-active">
        <div slot="item-text">我的</div>
      </tab-bar-item>
	</tab-bar>
</template>

<script>
	import TabBar from '../../common/tabbar/TabBar.vue'
	import TabBarItem from '../../common/tabbar/TabBarItem.vue'

	export default {
		components:{
			TabBarItem,
			TabBar
		}
	}
</script>

<style scoped>
.tabbar{
	z-index: 2;
}
</style>