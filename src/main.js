import Vue from 'vue'
import App from './App.vue'
import './vantui.js'
import router from './router/index.js'
import './assets/css/normalize.css'
import './assets/css/iconfont.css'
import './utils/index.js'
import store from './store/index.js'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')