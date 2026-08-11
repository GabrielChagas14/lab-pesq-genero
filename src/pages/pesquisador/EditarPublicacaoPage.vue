<template>
    <!-- Renderiza o formulário apenas quando a publicação for encontrada -->
    <PublicacaoFormPage
        v-if="publicacao"
        :publicacaoInicial="publicacao"
    />

    <!-- Publicação não encontrada -->
    <div
        v-else
        class="pt-14 min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4"
    >
        <i class="pi pi-exclamation-circle text-5xl text-gray-300" />
        <p class="font-sans text-gray-500">Publicação não encontrada.</p>
        <router-link
            to="/pesquisador/publicacoes"
            class="font-sans text-sm text-[#380252] underline underline-offset-2"
        >
            Voltar à listagem
        </router-link>
    </div>
</template>

<script setup>
import { computed }    from 'vue';
import { useRoute }    from 'vue-router';
import PublicacaoFormPage              from './PublicacaoFormPage.vue';
import { usePesquisadorPublicacoes }   from '@/composables/usePesquisadorPublicacoes.js';

const route      = useRoute();
const { buscarPorId } = usePesquisadorPublicacoes();

const publicacao = computed(() => buscarPorId(route.params.id));
</script>
