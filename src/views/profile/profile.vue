<template>
	<div>
		<NavBar class="bav-bar">
			<div slot="center">
				我的档案
			</div>
		</NavBar>
		<UserInfo></UserInfo>
		<AccountInfo></AccountInfo>
		<NormalListView :listData='orderList'></NormalListView>
		<NormalListView :listData='serviceList'></NormalListView>
	</div>
</template>

<script>
	import NavBar from '@/components/common/navbar/NavBar'
	import AccountInfo from './childComps/AccountInfo.vue'
	import UserInfo from './childComps/UserInfo.vue'
	import NormalListView from './childComps/NormalListView.vue'
	export default {
		components:{
			NavBar,
			AccountInfo,
			UserInfo,
			NormalListView
		},
		data() {
    	return {
		    orderList: [
			    {icon: 'message.svg', info: '我的消息'},
			    {icon: 'pointer.svg', info: '积分商城'},
			    {icon: 'vip.svg', info: '会员卡'},
		    ],
		    serviceList: [
			    {icon: 'cart.svg', info: '我的购物车'},
			    {icon: 'shopping.svg', info: '下载购物APP'},
		    ]
      }
    }
	}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>