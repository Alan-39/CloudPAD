import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import AuthenticationService from '@/services/AuthenticationService'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/register',
            component: Register,
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        AuthenticationService.checkAuth()
        .then(res => {
            if (res.status === 200) {
                console.log('yes, user is logged in')
                next()
            }
        })
        .catch(() => {
            console.log('user is not logged in')
            next({ path: 'login' })
        })
    } else {
        next()
    }
});

export default router