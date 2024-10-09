import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

import Reservation from "../views/Reservation.vue";
import Register from "../views/Register.vue";
import MemberDashboard from "../views/MemberDashboard.vue";
import Cart from "../views/Cart.vue"; // 新增這行
import UserProfile from "../views/UserProfile.vue";
import About from "../views/About.vue";
import Contact from "../views/Contact.vue";
import CstmData from "../views/CstmData.vue";
import BE_CstmData from "../views/BE_CstmData.vue";
import Callback from "../views/callback.vue";
import G_LogIn from "../views/G_LogIn.vue";
import OrderManagement from "../views/OrderManagement.vue";
// import ProductManagement from "../components/ProductManagement.vue";
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";
import CstmReservation from "../views/CstmReservation.vue";
import Shop from "../views/Shop.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },
  // {
  //   path: "products",
  //   name: "ProductManagement",
  //   component: ProductManagement,
  // },
  {
    path: "/reservation",
    name: "Reservation",
    component: Reservation,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/member",
    name: "memberDashboard",
    component: MemberDashboard,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/CstmData",
    name: "CstmData",
    component: CstmData,
    meta: { requiresAuth: true }, // 如果需要驗證的話
  },
  {
    path: "/BE_CstmData",
    name: "BE_CstmData",
    component: BE_CstmData,
  },
  {
    path: "/callback",
    name: "Callback",
    component: Callback,
  },
  {
    path: "/G_LogIn",
    name: "G_LogIn",
    component: G_LogIn,
  },
  {
    path: "/profile",
    name: "UserProfile",
    component: UserProfile,
    meta: { requiresAuth: true }, // 這個路由需要登錄才能訪問
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/order-management",
    name: "OrderManagement",
    component: OrderManagement,
    meta: { requiresAuth: true },
  },
  {
    path: "/cstm-reservation",
    name: "CstmReservation",
    component: CstmReservation,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
