<template>
  <div class="container-fluid p-0">
    <div class="d-flex flex-column h-100">
      <div class="w-100" v-if="!isLoginRoute">
        <Header/>
      </div>
      <!-- <div class="d-flex flex-row h-100"> -->
        <!-- <Sidebar /> -->
        <router-view />
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
// import Sidebar from "./components/SidebarComponent.vue";
import Header from "./components/HeaderComponent.vue";

export default {
  components: {
    // Sidebar,
    Header,
  },
  data() {
    return {};
  },
  computed: {
    isLoginRoute() {
      return this.$route.path === '/login';
    }
  }
};
</script>
 
