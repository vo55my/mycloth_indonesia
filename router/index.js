import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../pages/index.vue"),
    },
    {
      path: "/shop",
      name: "Shop",
      component: () => import("../pages/shop.vue"),
    },
    {
      path: "/product/:id",
      name: "Product",
      component: () => import("../pages/product/_id.vue"),
      props: true,
    },
  ],
});
