import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes";
import { auth } from "../config/firebase";

Vue.use(VueRouter);

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
