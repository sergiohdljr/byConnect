import { routesViews } from "./chunks";

export const routes = [
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
  {
    path: "/register/profile",
    name: "registerProfile",
    component: routesViews.RegisterComplement,
    meta: { requiresAuth: true },
  },
];
