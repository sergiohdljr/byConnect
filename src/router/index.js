import Vue from "vue";
import VueRouter from "vue-router";
import TimelineVue from "../views/TimelineView.vue";
import AllUsers from "../views/AllUsersView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Timeline",
    component: TimelineVue,
  },
  {
    path: "/AllUsers",
    name: "AllUsers",
    component: AllUsers,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
