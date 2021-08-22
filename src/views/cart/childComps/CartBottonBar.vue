<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @click.native="selectAll" :isActive="isSelected"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{getLength}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
		data(){
			return {
				select:true,
				goods:this.$store.state.cartList
			}
		},
		methods:{
			//让子选项按钮跟着全选按钮变化
			selectAll() {
				this.select = !this.select
				for (let i = 0; i < this.goods.length; i++) {
					this.goods[i].checked= this.select
				}
			}
		},
    computed:{
						//让全选按钮根据子按钮变化而变化
				isSelected(){
					if (this.goods.length==0) {
					this.select = false
				}else{
					this.select = true
				}
				for (let i = 0; i < this.goods.length; i++) {
					if ( !this.goods[i].checked) {
						this.select = false
					}
				}
				return this.select
			},
			totalPrice() {
				let result = 0
				for (let i = 0; i < this.goods.length; i++) {
					if (this.goods[i].checked) {
						result += this.goods[i].count * this.goods[i].price;
					}
				}
				return result.toFixed(2)
			},
			getLength() {
				const goods = this.$store.state.cartList;
				let sum = 0;
				for (let i = 0; i < goods.length; i++) {
					if (goods[i].checked) {
						sum=sum +goods[i].count
					}
					
				}
				return sum
			}
		}
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
