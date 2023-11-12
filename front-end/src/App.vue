<template>
  <div class="container-fluid p-0" style="overflow: hidden;">
    <div class="d-flex flex-column h-100" style="min-height: inherit;">
      <div class="w-100" v-if="isIncludeRoute">
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
    isIncludeRoute() {
      const excludedRoutes = ['/', '/information/headlist', '/information/articlelist', '/information/albumlist', 'memberList'];
      return excludedRoutes.includes(this.$route.path);
    }
  }
};
</script>
 
