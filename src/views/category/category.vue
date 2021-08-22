<template>
	<div>
		<NavBar class="bav-bar">
			<div slot="center">
					商品分类
			</div>
		</NavBar>
		<div class="content">
			<TabMenu :categories="categories"  @selectItem="selectItem"></TabMenu>
			<Scroll id="tab-content" ref="scroll">
				<div>
          <tab-content-category :subcategories="showSubcategory"/>
          <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick" />
          <goods-list :goods="showCategoryDetail"/>
        </div>
			</Scroll>
		</div>
	</div>
</template>

<script>
	import NavBar from '@/components/common/navbar/NavBar'
	import TabMenu from './childComps/TabMenu.vue'
	import Scroll from '@/components/common/scroll/Scroll'
	import TabContentCategory from './childComps/TabContentCategory.vue'
	import TabControl from '@/components/content/tabControl/TabControl'
	import GoodsList from '@/components/content/goods/GoodsList'

	import {getCategory, getSubcategory, getCategoryDetail} from "@/network/category";
	import {POP,NEW,SELL} from '@/common/const.js'
	import {tabControlMixin} from "@/common/mixin";
	export default {
		data() {
			return {
				categories:[],
				categoryData:{},
				currentIndex:-1
			}
		},
		components:{
			NavBar,
			TabMenu,
			Scroll,
			TabContentCategory,
			TabControl,
			GoodsList
		},
		computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
		mixins: [tabControlMixin],
		created() {

			this._getCategory()
		},
		activated() {
			this.$refs.scroll.HeightRefresh()
		},

		methods:{
			_getCategory() {
				getCategory().then(res => {
					//获取分累的数据
					this.categories = res.data.category.list
					//初始化每一个分类的子数
					for(let i=0;i<this.categories.length;i++){
						this.categoryData[i] = {
							subcategories:{},
							categoryDetail:{
								'pop':[],
								'new':[],
								'sell':[]
							}
						}
					}
					//请求第一个数据
						this._getSubcategory(0)
				})
			},
			_getSubcategory(index) {
				this.currentIndex = index
				const mailKey = this.categories[index].maitKey;
				//根据mailKey获取到右侧头分类，装到定义的分类数据当中
				getSubcategory(mailKey).then(res => {
					this.categoryData[index].subcategories = res.data
					//重新赋值才能让上面计算属性检测到，从而进行响应式处理
					this.categoryData = {...this.categoryData}
					//请求下面的细节展示
					this._getCategoryDetail(POP)
					this._getCategoryDetail(SELL)
					this._getCategoryDetail(NEW)
				})
			},
			_getCategoryDetail(type) {

				//根据miniWallkey请求细节商品的数据
				const miniWallkey = this.categories[this.currentIndex].miniWallkey
				getCategoryDetail(miniWallkey,type).then(res => {
					//根据type获取到的商品信息存储到分类市局当中
					this.categoryData[this.currentIndex].categoryDetail[type] = res
					//重新赋值，响应式处理
					this.categoryData = {...this.categoryData}
					this.$bus.$on('itemImgLoad',()=> {
				this.$refs.scroll.HeightRefresh()
			})
				})
			},
			/**
       * 事件响应相关的方法
       */
			 selectItem(index) {
        this._getSubcategory(index)
      },
		}
	}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
	.content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }
  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>