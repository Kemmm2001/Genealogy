import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);


const routes = [
  {
    path: "/",
    name: "tree",
    component: () => import("../views/MainScreen.vue"),
  },
  {
    path: "/familystatistics",
    name: "familystatistics",
    component: () => import("../views/FamilyStatistics.vue"),
  },
  {
    path: "/information/headlist",
    name: "headlist",
    component: () => import("../views/HeadList.vue"),
  },  
  {
    path: "/information/albumlist",
    name: "albumlist",
    component: () => import("../views/AlbumList.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginScreen.vue"),
  },
  {
    path: "/familycode",
    name: "familycode",
    component: () => import("../views/FamilyCodeLogin.vue"),
  },
  {
    path: "*",
    component: () => import("../views/NotFound.vue"),
  },
  {
    path: "/memberList",
    name: "member",
    component: () => import("../views/MemberList.vue"),
  },
  {
    path: "/profile",
    name: "userprofile",
    component: () => import("../views/UserProfile.vue"),
  },
  {
    path: "/event",
    name: "event",
    component: () => import("../views/FamilyEvent.vue"),
  },
  {
    path: "/forgotpwd",
    name: "forgotpwd",
    component: () => import("../views/ForgotPwd.vue"),
  },
  {
    path: "/information/history",
    name: "history",
    component: () => import("../views/FamilyHistory.vue"),
  },
  {
    path: "/resetpwd",
    name: "resetpwd",
    component: () => import("../views/ResetPwd.vue"),
  },
];

const router = new Router({
  mode: "history", 
  base: process.env.BASE_URL,
  routes,
});

export default router;
