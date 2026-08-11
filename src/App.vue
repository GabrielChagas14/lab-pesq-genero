<script setup>
import { computed }    from 'vue';
import { useRoute }    from 'vue-router';
import Toast           from 'primevue/toast';
import TopBar          from './components/TopBarComponent.vue';
import { usePageHero } from './composables/usePageHero.js';

const route = useRoute();
const { isHeroActive, heroBgColor } = usePageHero();

// Oculta o TopBar nas páginas com meta.hideTopBar = true (ex: Login)
const showTopBar = computed(() => !route.meta?.hideTopBar);
</script>

<template>
    <!--
        Toast global do PrimeVue — exibido acima de tudo (z-index próprio do PrimeVue).
        Páginas do pesquisador usam useToast() para disparar mensagens.
    -->
    <Toast position="bottom-right" />

    <!--
        TopBar: oculto na página de login (meta.hideTopBar).
        Em outras páginas: transparente quando o hero está visível,
        sólido ao rolar.
    -->
    <TopBar
        v-if="showTopBar"
        :transparent="isHeroActive"
        :bgColor="heroBgColor"
    />

    <!--
        Container principal sem padding horizontal/vertical.
        Cada página gerencia seu próprio espaçamento.
        Páginas sem hero devem adicionar pt-14 para compensar o TopBar fixo.
    -->
    <div class="w-full min-h-screen">
        <router-view />
    </div>
</template>

<style scoped></style>
