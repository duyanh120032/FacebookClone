import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "Home",
      layout: "default",
    },
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/find-friends",
    name: "find-friends",
    meta: {
      title: "Find Friends",
      layout: "default",
    },
    component: () => import(/* webpackChunkName: "home" */ "../views/FindFriends.vue"),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login",
      layout: "auth",
    },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title: "Register",
      layout: "auth",
    },
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/profile/:id",
    name: "profile",
    meta: {
      title: "Profile",
      layout: "default",
    },
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/saved",
    name: "saved",
    meta: {
      title: "Saved",
      layout: "default",
    },
    component: () => import("../views/SavedPost.vue"),
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
