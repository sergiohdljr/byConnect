import Vue from "vue";
import VueRouter from "vue-router";
import { routesViews } from "./chunks";
import { auth } from "../config/firebase";

Vue.use(VueRouter);

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
  },
  {
    path: "/register",
    name: "Register",
    component: routesViews.Register,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login" && auth.currentUser) {
    next("/");
    return;
  }
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.currentUser
  ) {
    next("login");
    return;
  }
  next();
});

export default router;
