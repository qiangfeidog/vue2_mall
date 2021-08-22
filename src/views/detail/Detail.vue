<template>
	<div class="detail">
		<DetailNavBar @titleClick="titleClick" ref="detailNavBar"></DetailNavBar>
		<Scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
				<DetailSwiter :topImages="topImages"></DetailSwiter>
				<DetailBaseInfo :goods="goods"></DetailBaseInfo>
				<DetailShopInfo :shop="shop"></DetailShopInfo>
				<DetailGoodsInfo :detailInfo = "detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
				<DetailParamInfo ref="param" :paramInfo="paramInfo"></DetailParamInfo>
				<DetailCommentInfo ref="comment" :commentInfo="commentInfo"></DetailCommentInfo>
				<GoodsList ref="recommend" :goods="recommends"></GoodsList>
				<CartButton></CartButton>
		</Scroll>
		<BackTop class="backTop" @click.native="backTopClick" v-show="isShowTop"></BackTop>
		<DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
	</div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail"
import DetailSwiter from "./childComps/DetailSwiper.vue"
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
import DetailShopInfo from "./childComps/DetailShopInfo.vue"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParamInfo from "./childComps/DetailParamInfo.vue"
import DetailBottomBar from "./childComps/DetailBottomBar.vue"
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
import GoodsList from "@/components/content/goods/GoodsList"
import CartButton from "./childComps/CartButton.vue"
 
import {backTopMxin} from "@/common/mixin"


import Scroll from "@/components/common/scroll/Scroll"
	export default {
		name:'Detail',
		components:{
			DetailNavBar,
			DetailSwiter,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			CartButton,
			DetailCommentInfo,
			GoodsList,
			DetailBottomBar,
			Scroll
		},
		mixins:[backTopMxin],
		data(){
			return {
				iid:null,
				topImages:[],
				goods:{},
				shop:{},
				detailInfo:{},
				paramInfo:{},
				commentInfo:{},
				recommends:[],
				themeTopY:[]
			}
		},
		created(){
			this.iid = this.$route.params.id
			//请求详细数据
			getDetail(this.iid).then(res => {
				const data = res.result
				this.topImages = data.itemInfo.topImages
				//获取商品的信息
				this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
				//获取商铺的信息
				this.shop = new Shop(data.shopInfo)
				//获取商品的详细信息
				this.detailInfo = data.detailInfo
				//获取商品的参数信息
				this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
				//获取商品的评论信息
				if (data.rate.cRate !==0) {
					this.commentInfo = data.rate.list[0]
				}
			}),
			getRecommend().then(res=>{
				this.recommends = res.data.list
			})
		},
		methods:{
			imageLoad(){
				this.$refs.scroll.HeightRefresh();
				this.themeTopY.push(0);
				this.themeTopY.push(this.$refs.param.$el.offsetTop);
				this.themeTopY.push(this.$refs.comment.$el.offsetTop);
				this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
			},
			titleClick(index){
				this.$refs.scroll.scroll.scrollTo(0,-this.themeTopY[index],300)
			},
			contentScroll(position) {
				// console.log(-position.y,this.themeTopY[1]);
				if (-position.y>1000) {
					this.isShowTop = true
				}else{
					this.isShowTop = false
				}
					if(-position.y < this.themeTopY[1]){
						this.$refs.detailNavBar.currentIndex = 0
					}else if(-position.y<this.themeTopY[2]){
						this.$refs.detailNavBar.currentIndex = 1
					}else if(-position.y<this.themeTopY[3]){
						this.$refs.detailNavBar.currentIndex = 2
					}else {
						this.$refs.detailNavBar.currentIndex = 3
					}
			},
			addToCart(){

				const product = {};
				product.image = this.topImages[0]
				product.title = this.goods.title
				product.desc = this.goods.desc
				product.price = this.goods.realPrice
				product.iid = this.iid
				this.$store.dispatch('addCart',product).then(res =>{
					this.$toast({message: res})
				})
			}
		}
	}
</script>

<style scoped>
.detail {
	position: relative;
	z-index: 3;
	background-color: #fff;
	height: 100vh;
}
.content {
 height: calc(100% - 95px);
}
.backTop {
	padding-bottom:20px;
}
</style>