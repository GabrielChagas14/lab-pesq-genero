import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '../pages/LoginView.vue';
import ResearcherView from '../pages/ResearcherView.vue';
import ResearcherListView from '../pages/ResearcherListView.vue';
/* import HomePage from '../pages/HomePage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import VictimTimelinePage from '../pages/VictimTimelinePage.vue'; */

const routes = [
  // { path: '/', component: HomePage },
  { path: '/login', name: 'login', component: LoginView, meta: { hideSidebar: true } },
  { path: '/Researcher', name: 'Researcher', component: ResearcherView },
  { path: '/ResearcherList', name: 'ResearcherList', component: ResearcherListView },
/*   { path: '/dashboard', component: DashboardPage },
  { path: '/timeline', component: VictimTimelinePage }, */
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
