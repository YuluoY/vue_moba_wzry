import Vue from 'vue'
import App from './App.vue'

import './assets/scss/style.scss'
import router from './router'

import './assets/iconfont/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import axios from 'axios';
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
