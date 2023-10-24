export const routesViews = {
  TimeLine: () => import("../views/TimelineView.vue"),
  Users: () => import("../views/UsersView.vue"),
  UserProfile: () => import("../views/UserProfileView.vue"),
  Posts: () => import("../views/PostsView.vue"),
  Login: () => import("../views/LoginView.vue"),
  Register: () => import("../views/RegisterView.vue"),
};
