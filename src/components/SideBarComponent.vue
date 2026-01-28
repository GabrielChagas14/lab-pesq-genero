<template>
    <div class="card flex justify-center h-full">
        <Menu :model="items" class="h-full">
            <template #start>
                <span class="inline-flex items-center gap-1 px-2 py-2">
                    <span class="text-xl font-semibold">LAB-PESQ-GENERO</span>
                </span>
            </template>

            <template #item="{ item, props }">
                <router-link v-if="item.route" :to="item.route" v-slot="{ href, navigate }">
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                </a>
            </template>
        </Menu>
    </div>
</template>

<script setup>
import Menu from 'primevue/menu';
import { ref } from "vue";


const items = ref([
    {
        label: 'Início',
        items: [
            { label: 'Home', icon: 'pi pi-home', route: '/' }
        ],
    },
    
     {
        label: 'Pesquisas',
        items: [
            { label: 'Memorial', icon: 'pi pi-building-columns', route: '/Timeline' },
            { label: 'Dados Feminicídio', icon: 'pi pi-server', route: '/FemicideData' },
        ]
    },
     {
        label: 'Postagens',
        items: [
            { label: 'Postagens', icon: 'pi pi-objects-column', route: '/' },
        ],
    },
    {
        label: 'Pessoal',
        items: [
            { label: 'Pesquisadores', icon: 'pi pi-user', route: '/ResearcherList' },
        ]
    }
]);
</script>