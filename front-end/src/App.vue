<template>
  <div class="container-fluid p-0">
    <div class="d-flex flex-column h-100" style="min-height: inherit;">
      <div class="w-100" v-if="!isExcludeRoute">
        <Header />
      </div>
      <router-view />
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
    isExcludeRoute() {
      const excludedRoutes = ['/login', '/familycode', '*'];
      return excludedRoutes.includes(this.$route.path);
    }
  }
};
</script>
 
