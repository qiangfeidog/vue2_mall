<template>
<div>
	<div id="home">
			<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
			<TabControl :titles="['流行','新款','精选']" @tabClick="tabClick"  ref="tabControlcopy" v-show="isShowTabControl" class="tab-control"></TabControl>
			<keep-alive>
			<Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullLoad="loderMore">
				<HomeSwiper :banners="banners" @SwiperImgLoad="SwiperImgLoad"></HomeSwiper>
						<RecommendView :recommends="recommends"></RecommendView>
						<FeatureView></FeatureView>
						<TabControl :titles="['流行','新款','精选']" @tabClick="tabClick"  ref="tabControl"></TabControl>
						<GoodsList :goods="ShowGoods"></GoodsList>
			</Scroll>
		</keep-alive>
			<BackTop @click.native="backTopClick" v-show="isShowBackTop"></BackTop>
		</div>
</div>
</template>

<script>

	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import FeatureView from './childComps/FeatureView'

	import NavBar from '@/components/common/navbar/NavBar.vue'
	import TabControl from '@/components/content/tabControl/TabControl'
	import GoodsList from '@/components/content/goods/GoodsList'
	import Scroll from '@/components/common/scroll/Scroll'
	import BackTop from '@/components/common/backTop/BackTop'

	import {getHomeMultidata,getHomeGoods} from '@/network/home'
	import {debounce} from '@/common/utils'
	export default {
		components:{
			NavBar,
			HomeSwiper,
			RecommendView,
			FeatureView,
			TabControl,
			Scroll,
			BackTop,
			GoodsList
		},
		data(){
			return {
				banners:[],
				recommends:[],
				goods:{
					'pop':{page:0,list:[]},
					'new':{page:0,list:[]},
					'sell':{page:0,list:[]}
				},
				currentType:'pop',
				isShowBackTop:false,
				tabOffsetTop:0,
				isShowTabControl:false,
				saveY:0
			}
		},
		computed:{
			ShowGoods(){
				return this.goods[this.currentType].list
			}
		},
		created() {
			//请求多个数据
      this.getHomeMultidata()
			//请求商品的数据
      this.TgetHomeGoods("pop")
      this.TgetHomeGoods("new")
      this.TgetHomeGoods("sell")
		},
		mounted() {
						//监听图片加载完成
			const refresh = debounce(this.$refs.scroll.HeightRefresh,50);
			this.$bus.$on('itemImgLoad',() => {
				refresh()
			})

		},
		activated(){
			// console.log('组件活跃');
			this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
			this.$refs.scroll.HeightRefresh()
		},
		deactivated(){
			// console.log('组件bu活跃');
			this.saveY = this.$refs.scroll.scroll.y
		},
		methods: {
			tabClick(index){
				switch (index) {
					case 0:
						this.currentType = 'pop'
					  break
					case 1:
						
						this.currentType = 'new'

						break
					case 2:
						
						this.currentType = 'sell'

						break
				}
				this.$refs.tabControlcopy.itemIndex = index;
				this.$refs.tabControl.itemIndex = index;
			},
			SwiperImgLoad() {
				this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
			},
			contentScroll(position){
				this.isShowTabControl = this.tabOffsetTop < -position.y
				this.isShowBackTop = -position.y>1000;
			},
			loderMore(){
				this.TgetHomeGoods(this.currentType);

			},
			getHomeMultidata(){
				getHomeMultidata().then(
				res=>{
					// console.log(res);
					this.banners = res.data.banner.list
					this.recommends = res.data.recommend.list
				})
			},
			TgetHomeGoods(type){
				const page = this.goods[type].page +1
				getHomeGoods(type,page).then(res=>{
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page+=1
					this.$refs.scroll.finishPullUp()
			})
			}
		},
	}
</script>

<style scoped>
	#home {
		height: 100vh;
	}
	.content {
	  overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;

	}
	.tab-control {
		position: relative;
		z-index: 2;
	}
.home-nav{
	background-color: var(--color-tint);
	color: aliceblue;
}

</style>