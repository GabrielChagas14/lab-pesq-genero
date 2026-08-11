<script setup>
import SideBar from './components/SideBarComponent.vue';
import TopBar from './components/TopBarComponent.vue'
</script>

<template>
    <TopBar/>
    <div class="flex flex-row box-border p-6 min-h-screen">
        
        <router-view />
    </div>
</template>

<style scoped></style>
