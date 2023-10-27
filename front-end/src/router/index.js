import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  // {
  //   path: "/",
  //   name: "tree",
  //   component: () => import("../views/MainScreen.vue"),
  // },
  {
    path: "/information/headlist",
    name: "headlist",
    component: () => import("../views/HeadList.vue"),
  },
  {
    path: "/information/articlelist",
    name: "articlelist",
    component: () => import("../views/ArticleList.vue"),
  },
  {
    path: "*",
    component: () => import("../views/NotFound.vue"),
  },
  {
    path: "/",
    name: "tree",
    component: () => import("../views/MemberList.vue"),
  },
];

const router = new Router({
  mode: "history", // Sử dụng chế độ lịch sử
  base: process.env.BASE_URL,
  routes,
});

export default router;
