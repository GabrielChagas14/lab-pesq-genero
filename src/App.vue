<script setup>
import TopBar from './components/TopBarComponent.vue';
import { usePageHero } from './composables/usePageHero.js';

// O TopBar lê o estado do hero para alternar entre transparente e sólido.
// Cada página que tiver hero chama setHero(true/false) via usePageHero.
const { isHeroActive, heroBgColor } = usePageHero();
</script>

<template>
    <!--
        TopBar é fixed (z-50), flutua sobre o conteúdo.
        Páginas sem hero devem adicionar pt-14 ao seu topo para
        compensar a altura do TopBar fixo.
    -->
    <TopBar
        :transparent="isHeroActive"
        :bgColor="heroBgColor"
    />

    <!--
        Container principal sem padding horizontal/vertical.
        Cada página gerencia seu próprio espaçamento,
        permitindo que páginas com hero cubram a área do TopBar.
    -->
    <div class="w-full min-h-screen">
        <router-view />
    </div>
</template>

<style scoped></style>
