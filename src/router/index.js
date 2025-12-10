import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import VictimTimelinePage from '../pages/VictimTimelinePage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/dashboard', component: DashboardPage },
  { path: '/timeline', component: VictimTimelinePage },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
