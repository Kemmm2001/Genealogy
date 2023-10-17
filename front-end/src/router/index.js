import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'tree',
        component: () => import('../views/MainScreen.vue'),
    },
    {
        path: '/infor',
        name: 'information',
    },
];

const router = new Router({
    mode: 'history', // Sử dụng chế độ lịch sử
    base: process.env.BASE_URL,
    routes
});

export default router;