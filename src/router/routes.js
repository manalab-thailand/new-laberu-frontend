const routes = [
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: '', name: "index", component: () => import('pages/admin/admin-index.vue') },
      { path: 'create-project', name: "create-project", component: () => import('pages/admin/create-project/create-project.vue') },
      { path: 'payment', name: "payment", component: () => import('pages/admin/payment/payment.vue') },
      { path: 'view-project', name: "view-project", component: () => import('pages/admin/view-project/view-project.vue') },
      { path: 'view-user', name: "view-user", component: () => import('pages/admin/view-user/view-user.vue') },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/laberu/home/home.vue") },
      {
        path: "labelling",
        component: () => import("pages/laberu/labelling/labelling.vue"),
      },
      {
        path: "annotation",
        component: () => import("pages/laberu/annotation/annotation.vue"),
      },
      {
        path: "classification",
        component: () => import("pages/laberu/classification/classification.vue"),
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
