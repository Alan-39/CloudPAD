import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user.store";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      meta: { hideNav: true },
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/",
      name: "home",
      meta: { loginRequired: true },
      component: () => import("../views/HomeView.vue"),
    },
    /*
    {
      path: "/admin-dashboard",
      name: "admin-dashboard",
      meta: { permissionRequired: Access.AdminDashboard },
      component: () => import("../views/AdminDashboard.vue"),
    },
    */
  ],
});

router.beforeEach((to, from, next) => {
  // Check if logged in
  const { loginRequired } = to.meta;
  const token = sessionStorage.getItem('token')
  const currentUser = useUserStore()

  if (loginRequired) {
    if (!token) {
      // not logged in so redirect to login page with the return url
      return next({ path: '/login', query: { returnUrl: to.path } });
    }

    /*
    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.hasAccess)) {
      // role not authorised so redirect to home page
      return next({ path: '/' });
    }
    */
  }

  next();
})

