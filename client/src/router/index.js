import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import Register from '@/components/Register.vue'
import Success from '@/components/Success'

Vue.use(VueRouter);

export default new VueRouter({
    mode: "hash",
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/success',
            component: Success
        }
    ]
})