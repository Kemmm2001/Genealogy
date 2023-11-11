import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VModal from "vue-js-modal";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style.css';
import './assets/css/configmenu.css';
import './assets/css/modal.css';
import './assets/css/headlist.css';
import './assets/css/articlelist.css';
import './assets/css/albumlist.css';
import './assets/css/navbar.css';
import "./assets/css/icon.css";
import "./assets/css/list.css";
import "./assets/css/login.css";
import "./assets/css/mail.css";
import "./assets/css/noti.css";


Vue.config.productionTip = false


Vue.use(VModal, { dynamic: true });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')