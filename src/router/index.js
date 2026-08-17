import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '../composables/useAuth.js';

// Páginas públicas
import PublicacoesPage      from '../pages/PublicacoesPage.vue';
import PublicacaoDetailPage from '../pages/PublicacaoDetailPage.vue';
import MemorialPage         from '../pages/MemorialPage.vue';

// Autenticação
import LoginPage            from '../pages/LoginPage.vue';

// Área do pesquisador
import PesquisadorPublicacoesPage from '../pages/pesquisador/PesquisadorPublicacoesPage.vue';
import NovaPublicacaoPage         from '../pages/pesquisador/NovaPublicacaoPage.vue';
import EditarPublicacaoPage       from '../pages/pesquisador/EditarPublicacaoPage.vue';

/* import HomePage from '../pages/HomePage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import VictimTimelinePage from '../pages/VictimTimelinePage.vue'; */

const routes = [
    // ── Públicas ────────────────────────────────────────────
    // { path: '/', component: HomePage },
    { path: '/memorial',        component: MemorialPage         },
    { path: '/publicacoes',     component: PublicacoesPage      },
    { path: '/publicacoes/:id', component: PublicacaoDetailPage },

    // ── Autenticação ─────────────────────────────────────────
    {
        path: '/login',
        component: LoginPage,
        meta: { hideTopBar: true },  // oculta a TopBar na tela de login
    },

    // ── Área do pesquisador (requer autenticação) ─────────────
    {
        path: '/pesquisador/publicacoes',
        component: PesquisadorPublicacoesPage,
        meta: { requiresAuth: true },
    },
    {
        path: '/pesquisador/publicacoes/nova',
        component: NovaPublicacaoPage,
        meta: { requiresAuth: true },
    },
    {
        path: '/pesquisador/publicacoes/:id/editar',
        component: EditarPublicacaoPage,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    // Volta ao topo ao navegar entre páginas
    scrollBehavior: () => ({ top: 0 }),
});

// ── Guard de autenticação ─────────────────────────────────────────────────
router.beforeEach((to) => {
    if (to.meta?.requiresAuth) {
        const { isAuthenticated } = useAuth();
        if (!isAuthenticated.value) {
            return { path: '/login', query: { redirect: to.fullPath } };
        }
    }
});

export default router;
