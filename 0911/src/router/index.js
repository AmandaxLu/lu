import { createRouter, createWebHistory } from 'vue-router';
import SixChefsTable from '../views/Content.vue';

const routes = [
  {
    path: '/',
    name: 'SixChefsTable',
    component: SixChefsTable
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), 
  routes
});

export default router;
