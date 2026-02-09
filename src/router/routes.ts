import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    meta: {
      title: "Inicio",
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/kapties",
    meta: {
      title: "Kapties",
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/kapties/KaptiesListPage.vue"),
      },
      {
        path: "nuevo",
        name: "Nuevo Kaptie",
        meta: {
          title: "Kaptie",
        },
        component: () => import("pages/kapties/KaptieFormPage.vue"),
      },
      {
        path: "editar/:id",
        name: "Editar Kaptie",
        meta: {
          title: "Kaptie",
        },
        component: () => import("pages/kapties/KaptieFormPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
