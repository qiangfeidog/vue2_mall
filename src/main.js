import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Totast from '@/components/common/totast/index.js'
Vue.use(Totast)
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')