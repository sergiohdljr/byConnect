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
  },
  {
    path: "/Users",
    name: "Users",
    component: routesViews.Users,
  },
  {
    path: "/User-profile/:username",
    name: "UserProfile",
    component: routesViews.UserProfile,
  },
  {
    path: "/Posts/:username",
    name: "Posts",
    component: routesViews.Posts,
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
  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  else next();
});

export default router;
