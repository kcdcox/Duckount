import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './routes';
import store from './store';
import Vuelidate from 'vuelidate'
var VueScrollTo = require('vue-scrollto');

Vue.use(Vuelidate);
Vue.use(VueScrollTo, {offset: -130});

new Vue({
  el: '#app',
  router,
  vuetify,
  store,
  render: h => h(App)
})