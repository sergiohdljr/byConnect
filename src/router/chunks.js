export const routesViews = {
  TimeLine: () => import("../views/TimelineView.vue"),
  Users: () => import("../views/UsersView.vue"),
  UserProfile: () => import("../views/UserProfileView.vue"),
  Posts: () => import("../views/PostsView.vue"),
  Login: () => import("../views/LoginView.vue"),
  Register: () => import("../views/RegisterView.vue"),
  Config: () => import("../views/ConfigView.vue"),
  DeleteUser: () => import("../views/DeleteUserView.vue"),
  UpdateUser: () => import("../views/UpdateUserView.vue"),
  RegisterComplement: () => import("../views/RegisterComplement.vue"),
};
