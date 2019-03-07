// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Button,
  Swipe,
  SwipeItem,
  List,
  Dialog,
  Toast,
 } from 'vant'

Vue.use(Button)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(List)
Vue.use(Dialog)
Vue.use(Toast);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})