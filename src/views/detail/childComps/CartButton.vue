<template>
  <div class="cart-btn">
    <img src="~@/assets/img/detail/cart.png" alt="">
  </div>
</template>

<script>
	export default {
		name: "CartButton"
	}
</script>

<style scoped>
  .cart-btn img {
    width: 45px;
    height: 45px;

    position: fixed;
    right: 5px;
    bottom: 110px;

    z-index: 9;
  }
</style>