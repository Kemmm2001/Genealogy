import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VModal from "vue-js-modal";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style.css';
import './assets/css/configmenu.css';
import './assets/css/modal.css';

Vue.config.productionTip = false

Vue.use(VModal, { dynamic: true });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
