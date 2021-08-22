import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions"
import mutations from "./mutations"
import state from "./state"
import getters from "./getters"
//安装插件
Vue.use(Vuex)
  //创建store实例
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
  })
  //挂载到Vue实例上
export default store