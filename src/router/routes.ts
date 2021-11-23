import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "/",
        component: () => import("pages/login.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("pages/laberu/register/register.vue"),
      },
      {
        path: "home",
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
    ],
  },
  {
    path: "/login",
    component: () => import("src/pages/login.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
