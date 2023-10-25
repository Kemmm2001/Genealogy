import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VModal from "vue-js-modal";
import VueCollapse from 'vue2-collapse'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style.css';
import './assets/css/configmenu.css';
import './assets/css/modal.css';
import './assets/css/headlist.css';
import './assets/css/articlelist.css';
import './assets/css/navbar.css';
import "./assets/css/icon.css";
import "./assets/css/list.css";

Vue.config.productionTip = false

Vue.use(VueCollapse)
Vue.use(VModal, { dynamic: true });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
