import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-type'
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // debugger;
      // 查看之前的cartlist中是否已经存在该商品
      let oldProduct = context.state.cartList.find(item =>
        item.iid === payload.iid
      )
      if (oldProduct) {
        // oldProduct.count++;
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品+1')
      } else {
        payload.count = 1
          // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新商品')
      }
    })
  }
}