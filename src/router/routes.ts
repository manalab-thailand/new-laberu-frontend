import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "login",
    component: () => import("src/pages/laberu/login/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("pages/laberu/register/register.vue"),
  },
  {
    path: "/laberu",
    meta: { requiresAuth: true },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/laberu/home/home.vue"),
      },
      {
        path: "annotation",
        name: "annotation",
        component: () => import("pages/laberu/annotation/annotation.vue"),
      },
      {
        path: "labelling",
        name: "labelling",
        component: () => import("src/pages/laberu/objectlabel/ObjectLabel.vue"),
      },
      {
        path: "classification",
        name: "classification",
        component: () =>
          import("pages/laberu/classification/classification.vue"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("pages/laberu/profile/profile.vue"),
      },
      {
        path: "reject-task",
        name: "reject-task",
        component: () => import("pages/laberu/reject/index.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
