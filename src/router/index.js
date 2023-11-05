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
    path: "/Configuration",
    name: "Config",
    component: routesViews.Config,
    meta: { requiresAuth: true },
  },
  {
    path: "/DeleteUser",
    name: "DeleteUser",
    component: routesViews.DeleteUser,
    meta: { requiresAuth: true },
  },
  {
    path: "/UpdateUser",
    name: "UpdateUser",
    component: routesViews.UpdateUser,
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
  auth.onAuthStateChanged((user) => {
    if (to.path === "/login" && user) {
      next("/");
      return;
    }
    if (to.path === "/register" && user) {
      next("/");
      return;
    }
    if (to.matched.some((record) => record.meta.requiresAuth) && !user) {
      next("login");
      return;
    }
    next();
  });
});

export default router;
