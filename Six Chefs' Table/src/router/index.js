import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Shop from "../views/Shop.vue";
import Reservation from "../views/Reservation.vue";
import Register from "../views/Register.vue";
import MemberDashboard from "../views/MemberDashboard.vue";
import Cart from "../views/Cart.vue"; // 新增這行
import UserProfile from "../views/UserProfile.vue";
import About from "../views/About.vue";
import Contact from "../views/Contact.vue";
import CstmData from "../views/CstmData.vue";
import BE_CstmData from "../views/BE_CstmData.vue";
import OrderManagement from "../views/OrderManagement.vue";
import OrderDetail from "../views/OrderDetail.vue"; // 新增


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
  },
  {
    path: "/BE_CstmData",
    name: "BE_CstmData",
    component: BE_CstmData,
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
      path: "/order-detail",
      name: "OrderDetail", // 修正路由名稱
      component: OrderDetail, // 修正這一行
      // meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
