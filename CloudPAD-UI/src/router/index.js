import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import { useUserStore } from "../stores/user.store";
import { Access } from "../_helpers/access";

const router = createRouter({
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
export default router;

/*
router.beforeEach((to, from, next) => {
  // Check if logged in
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.token) {
    auth.returnUrl = to.fullPath;
    return '/login';
  }

  // Check if user has permission rights
  const { permissionRequired } = to.meta;
  const currentUser = useUserStore()

  if (permissionRequired.length && !currentUser.hasAccess.includes(permissionRequired)) {
    return next({ path: '/unauthorized' });
  }
})
*/
