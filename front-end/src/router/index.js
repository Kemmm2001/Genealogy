import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);


const routes = [
  {
    path: "/main",
    name: "tree",
    component: () => import("../views/MainScreen.vue"),
  },
  {
    path: "/stat",
    name: "statistics",
    component: () => import("../views/FamilyStatistics.vue"),
  },
  {
    path: "/alb",
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
    path: "/mem",
    name: "member",
    component: () => import("../views/MemberList.vue"),
  },
  {
    path: "/user",
    name: "userprofile",
    component: () => import("../views/UserProfile.vue"),
  },
  {
    path: "/eve",
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
    path: "/reset-password",
    name: "resetpwd",
    component: () => import("../views/ResetPwd.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/TestScreen.vue"),
  },
  {
    path: "/cfevent",
    name: "cfevent",
    component: () => import("../views/CfEvent.vue"),
  },
  {
    path: "/verify",
    name: "verify",
    component: () => import("../views/VerifyAccount.vue"),
  },
  {
    path: "/profile",
    name: "user",
    component: () => import("../views/UserProfileResp.vue"),
  },
  {
    path: "/memberList",
    name: "mem",
    component: () => import("../views/MemberListResp.vue"),
  },
  {
    path: "/event",
    name: "eve",
    component: () => import("../views/FamilyEventResp.vue"),
  },
  {
    path: "/his",
    name: "his",
    component: () => import("../views/FamilyHistoryResp.vue"),
  },
  {
    path: "/information/albumlist",
    name: "alb",
    component: () => import("../views/FamilyAlbumResp.vue"),
  },
  {
    path: "/information/statistics",
    name: "stat",
    component: () => import("../views/FamilyStatisticsResp.vue"),
  },
  {
    path: "/",
    name: "main",
    component: () => import("../views/MainScreenResp.vue"),
  },
];

const router = new Router({
  mode: "history", 
  base: process.env.BASE_URL,
  routes,
});

export default router;
