import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'tree',
      
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
