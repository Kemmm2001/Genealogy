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
    component: () => import("../views/FamilyCodeRegister.vue"),
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
];

const router = new Router({
  mode: "history", // Sử dụng chế độ lịch sử
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(localStorage.getItem('CodeID'))
  if (to.path !== "/login") {
    // Kiểm tra xem phiên làm việc "account" có tồn tại không
    console.log(localStorage.getItem('CodeID'))
    if (!localStorage.getItem('CodeID')) {
      // Nếu phiên làm việc không tồn tại, chuyển hướng đến trang "/login"
      next('/login');
    } else {
      // Nếu phiên làm việc tồn tại, cho phép điều hướng bình thường
      next();
    }
  } else {
    // Cho phép điều hướng bình thường cho các trang khác
    next();
  }
});

export default router;
