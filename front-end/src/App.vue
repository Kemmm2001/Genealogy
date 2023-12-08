<!-- phùng việt khôi -->
<template>
  <div class="container-fluid p-0" :class="{ dark: darkMode }" style="overflow: hidden;">
    <div class="d-flex flex-column h-100" style="min-height: inherit;">
      <Navbar v-if="isIncludeRoute" />
      <router-view />
    </div>
  </div>
</template>

<!-- phùng việt khôi -->
<script>
// import Sidebar from "./components/SidebarComponent.vue";
import Navbar from "./components/NavbarComponent.vue";
import { EventBus } from "./assets/js/MyEventBus.js";

export default {
  components: {
    // Sidebar,
    Navbar,
  },
  data() {
    return {
      darkMode: false,
    };
  },
  computed: {
    isIncludeRoute() {
      const excludedRoutes = ['/', '/information/headlist', '/information/articlelist', '/information/albumlist', 'memberList', '/profile', '/memberList', '/event', '/information/history', '/information/statistics', '/test', '/verify'];
      return excludedRoutes.includes(this.$route.path);
    }
  },
  created() {
    EventBus.$on("darkMode", (value) => {
      this.darkMode = value;
    });
  },
  watch: {
    // darkMode: {
    //   handler: function () {
    //     console.log(this.darkMode);
    //   },
    // },
  },
  mounted() {
    document.title = 'Gia phả người Việt';
  }
};
</script>
 
