import { createRouter, createWebHistory } from "vue-router";
import Home from "/src/pages/Home.vue";
import About from "/src/pages/About.vue";
import Market from '/src/pages/Market.vue';
import Rank from '/src/pages/Rank.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/market",
    name: "Market",
    component: Market,
  },
  {
    path: "/rank",
    name: "Rank",
    component: Rank,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
