const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/laberu/home/home.vue") },
      {
        path: "annotation",
        component: () => import("pages/laberu/annotation/annotation.vue"),
      },
      {
        path: "objectlabel",
        component: () => import("src/pages/laberu/objectlabel/ObjectLabel.vue"),
      },
      {
        path: "classification",
        component: () =>
          import("pages/laberu/classification/classification.vue"),
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
