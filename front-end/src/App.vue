<template>
  <div class="container-fluid p-0">    
    <div class="d-flex flex-row">
      <Sidebar />
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/SidebarComponent.vue";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {};
  },
};
</script>
 
