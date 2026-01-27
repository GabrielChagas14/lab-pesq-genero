<script setup>
import SideBar from './components/SideBarComponent.vue';
</script>

<template>
    <div class="flex flex-row box-border p-6 h-screen">
        <SideBar v-if="!$route.meta?.hideSidebar" />
        <router-view />
    </div>
</template>

<style scoped></style>
