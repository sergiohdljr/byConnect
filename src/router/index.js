import Vue from "vue";
import VueRouter from "vue-router";
import { routesViews } from "./chunks";

Vue.use(VueRouter);

const isAuthenticated = false;

const routes = [
  {
    path: "/",
    name: "Timeline",
    component: routesViews.TimeLine,
    meta: { requiresAuth: true },
  },
  {
    path: "/Users",
    name: "Users",
    component: routesViews.Users,
    meta: { requiresAuth: true },
  },
  {
    path: "/User-profile/:username",
    name: "UserProfile",
    component: routesViews.UserProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "/Posts/:username",
    name: "Posts",
    component: routesViews.Posts,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: routesViews.Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: routesViews.Register,
    meta: { requiresAuth: false },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
