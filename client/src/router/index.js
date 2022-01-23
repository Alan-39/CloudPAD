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
        .then(response => {
            if (response.status === 200) {
                next()
            }
        })
        .catch(error => {
            console.log(error)
            next({ path: 'login' })
        })
    } else {
        next()
    }
});

export default router