import Vue from 'vue'
import VueRouter from 'vue-router'
import MyDrive from '@/views/MyDrive.vue'
import NotFound from '@/views/NotFound.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import UploadTest from '@/views/UploadTest.vue'
import AuthenticationService from '@/services/AuthenticationService'


Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            component: MyDrive,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '*',
            component: NotFound,
            meta: {
                hideNavigation: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                hideNavigation: true
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                hideNavigation: true
            }
        },
        {
            path: '/file-upload',
            component: UploadTest,
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