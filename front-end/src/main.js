import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VModal from "vue-js-modal";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "./assets/css/memberlist.css";
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
import "./assets/css/scrollbar.css";
import "./assets/css/userprofile.css";
import "./assets/css/familytree.css";
import "./assets/css/event.css";
import "./assets/css/history.css";
import "./assets/css/statistics.css";

import "./assets/css-dark/memberlist.css";
import './assets/css-dark/style.css';
import './assets/css-dark/configmenu.css';
import './assets/css-dark/modal.css';
import './assets/css-dark/headlist.css';
import './assets/css-dark/articlelist.css';
import './assets/css-dark/albumlist.css';
import './assets/css-dark/navbar.css';
import "./assets/css-dark/icon.css";
import "./assets/css-dark/list.css";
import "./assets/css-dark/login.css";
import "./assets/css-dark/mail.css";
import "./assets/css-dark/noti.css";
import "./assets/css-dark/scrollbar.css";
import "./assets/css-dark/userprofile.css";
import "./assets/css-dark/familytree.css";
import "./assets/css-dark/event.css";


Vue.config.productionTip = false


Vue.use(VModal, { dynamic: true });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')