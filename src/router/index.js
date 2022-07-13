import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/pizza/:id",
    name: "Detalle",
    props: true,
    component: () =>
      import(/* webpackChunkName: "Detalle" */ "../views/Detalle.vue"), // lazy loading
  },
  {
    path: "/carrito",
    name: "Carrito",
    component: () =>
      import(/* webpackChunkName: "Carrito" */ "../views/Carrito.vue"), // lazy loading
  },
  {
    path: "/end",
    name: "Gracias",
    component: () =>
      import(/* webpackChunkName: "Carrito" */ "../views/Gracias.vue"), // lazy loading
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
