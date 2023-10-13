<template>
  <div id="tree" ref="tree"></div>
</template>

<script>
import FamilyTree from "@balkangraph/familytree.js";

export default {
  data() {
    return {
      nodes: [
        {
          id: 1,
          pids: [2],
          name: "Amber McKenzie",
          gender: "female",
          phone: "878 108 255",
          email: "amber.mcKenzie@gmail.com",
        },
        {
          id: 2,
          pids: [1],
          name: "Ava Field",
          gender: "male",
          phone: "554 484 126",
          email: "ava.field@live.com",
        },
        {
          id: 3,
          mid: 1,
          fid: 2,
          name: "Peter Stevens",
          gender: "male",
          title: "HR Manager",
          phone: "897 112 444",
        },
      ],
    };
  },

  methods: {
    mytree: function (domEl, x) {
      FamilyTree.templates.tommy_male.field_0 =
        '<text class="field_0" style="font-size: 20px;" fill="#ffffff" x="125" y="30" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_male.field_1 =
        '<text class="field_1" style="font-size: 14px;" fill="#ffffff" x="125" y="50" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_male.field_2 =
        '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_male.field_3 =
        '<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_female.field_0 =
        '<text class="field_0" style="font-size: 20px;" fill="#ffffff" x="125" y="30" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_female.field_1 =
        '<text class="field_1" style="font-size: 14px;" fill="#ffffff" x="125" y="50" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_female.field_2 =
        '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_female.field_3 =
        '<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">{val}</text>';

      this.family = new FamilyTree(domEl, {
        nodes: x,
        nodeBinding: {
          field_0: "name",
          field_1: "gender",
          field_2: "phone",
          field_3: "email",
        },       
      });
    },
   
  },

  mounted() {
    this.mytree(this.$refs.tree, this.nodes);
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  font-family: Helvetica;
}

#tree {
  width: 100%;
  height: 100%;
}
</style>