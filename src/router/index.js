import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const TimeLineView = () => import("../views/TimelineView.vue");
const UsersView = () => import("../views/UsersView.vue");
const UserProfileView = () => import("../views/UserProfileView.vue");
const PostsView = () => import("../views/PostsView.vue");

const routes = [
  {
    path: "/",
    name: "Timeline",
    component: TimeLineView,
  },
  {
    path: "/Users",
    name: "Users",
    component: UsersView,
  },
  {
    path: "/User-profile/:username",
    name: "UserProfile",
    component: UserProfileView,
  },
  {
    path: "/Posts/:username",
    name: "Posts",
    component: PostsView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
