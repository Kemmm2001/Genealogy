<template>
  <div class="container-fluid p-0">
    <div class="d-flex flex-row">
      <Sidebar />
      <!-- Content (medium 9, col-md-9) -->
      <!-- <div id="tree" ref="tree"></div> -->
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/SidebarComponent.vue";
// import { HTTP } from "./assets/js/addressAPI";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      abc: 1,
    };
  },
  // mounted(){
  //   HTTP.get("",).then((response) => {
  //         this.abc = response.data;
  //         console.log(this.abc)
  //       });
  // }
};
</script>
 
