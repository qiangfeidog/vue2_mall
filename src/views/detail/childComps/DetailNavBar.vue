<template>
	<div>
		<NavBar>
			<div slot="left" class="back" @click="backClick">
				<img src="~@/assets/img/common/back.svg"></img>
			</div>
			<div slot="center" class="navBar">
			<div v-for="(item,index) in title" class="navBarItem" :class="{active:currentIndex===index}" @click="navBarItemClick(index)">{{item}}</div>
			</div>
		</NavBar>
	</div>
</template>

<script>
		import NavBar from '@/components/common/navbar/NavBar'
	export default {
		data(){
			return {
				title:['商品','参数','评论','推荐'],
				currentIndex:0
			}
		},
		components:{
			NavBar
		},
		methods:{
			navBarItemClick(index) {
				this.currentIndex = index
				this.$emit("titleClick",index)
			},
			backClick() {
				this.$router.back()
			}
		}
	}
</script>

<style scoped>
.navBar {
	display: flex;
}
.navBarItem {
	flex: 1;
	font-size: 13px;
}
.back {
	margin-top: 6px;
}
.active {
	color: red;
}
</style>