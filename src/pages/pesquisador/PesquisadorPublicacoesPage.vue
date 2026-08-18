<template>
    <div class="pt-14 min-h-screen bg-gray-50">

        <!-- ── Cabeçalho da página ─────────────────────────────── -->
        <div class="bg-white border-b border-gray-200 shadow-sm">
            <div class="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-4">

                <div>
                    <p class="text-[10px] uppercase tracking-wider text-[#380252]/60 font-sans font-medium mb-0.5">
                        Área do Pesquisador
                    </p>
                    <h1 class="font-display text-2xl text-[#380252] leading-tight">
                        Minhas Publicações
                    </h1>
                </div>

                <!-- Nova publicação -->
                <BaseButton
                    label="Nova publicação"
                    icon="pi pi-plus"
                    color="purple"
                    variant="solid"
                    @click="$router.push('/pesquisador/publicacoes/nova')"
                />
            </div>
        </div>

        <!-- ── Conteúdo principal ──────────────────────────────── -->
        <div class="max-w-6xl mx-auto px-6 py-6">

            <!-- Busca rápida -->
            <div class="flex flex-col sm:flex-row gap-3 mb-4 items-start sm:items-center">
                <div class="relative flex-1 max-w-sm">
                    <BaseInput
                        v-model="busca"
                        placeholder="Buscar nas minhas publicações..."
                        hint=""
                    />
                </div>
                <p class="flex items-center text-xs text-gray-500 font-sans">
                    {{ listaFiltrada.length }} publicaç{{ listaFiltrada.length === 1 ? 'ão' : 'ões' }}
                </p>
            </div>

            <!-- Filtro por categoria -->
            <div class="flex gap-2 flex-wrap mb-5">
                <BaseButton
                    label="Todas"
                    shape="chip"
                    color="purple"
                    :variant="categoriaSelecionada === null ? 'solid' : 'outlined'"
                    @click="categoriaSelecionada = null"
                />
                <BaseButton
                    v-for="cat in CATEGORIAS"
                    :key="cat"
                    :label="cat"
                    shape="chip"
                    color="purple"
                    :variant="categoriaSelecionada === cat ? 'solid' : 'outlined'"
                    @click="categoriaSelecionada = cat"
                />
            </div>

            <!-- Estado vazio -->
            <div
                v-if="listaFiltrada.length === 0"
                class="bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center py-20 gap-4"
            >
                <div class="w-16 h-16 rounded-2xl bg-[#380252]/8 flex items-center justify-center">
                    <i class="pi pi-inbox text-[#380252]/50 text-2xl" />
                </div>
                <div class="text-center">
                    <p class="font-sans text-gray-600 font-medium">Nenhuma publicação encontrada.</p>
                    <p class="font-sans text-xs text-gray-400 mt-1">Crie sua primeira publicação clicando em "Nova publicação".</p>
                </div>
                <BaseButton
                    label="Nova publicação"
                    icon="pi pi-plus"
                    color="purple"
                    variant="solid"
                    @click="$router.push('/pesquisador/publicacoes/nova')"
                />
            </div>

            <!-- Tabela de publicações -->
            <div v-else class="bg-white rounded-2xl shadow-sm overflow-hidden">

                <!-- Cabeçalho da tabela -->
                <div class="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3
                            bg-[#380252]/5 border-b border-[#380252]/10">
                    <span class="font-sans text-[11px] uppercase tracking-wider text-[#380252]/60 font-semibold">Tipo</span>
                    <span class="font-sans text-[11px] uppercase tracking-wider text-[#380252]/60 font-semibold">Título</span>
                    <span class="font-sans text-[11px] uppercase tracking-wider text-[#380252]/60 font-semibold hidden md:block">Categoria</span>
                    <span class="font-sans text-[11px] uppercase tracking-wider text-[#380252]/60 font-semibold hidden sm:block">Data</span>
                    <span class="font-sans text-[11px] uppercase tracking-wider text-[#380252]/60 font-semibold">Ações</span>
                </div>

                <!-- Linhas -->
                <div
                    v-for="(pub, idx) in listaFiltrada"
                    :key="pub.id"
                    :class="[
                        'grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-4 items-center',
                        'transition-colors duration-150 hover:bg-[#380252]/3',
                        idx < listaFiltrada.length - 1 ? 'border-b border-gray-100' : '',
                    ]"
                >
                    <!-- Badge tipo -->
                    <span
                        :class="[
                            'inline-flex items-center gap-1 px-2.5 py-1 rounded-full whitespace-nowrap',
                            'text-[10px] font-semibold font-sans uppercase tracking-wider',
                            tipoMap[pub.tipo]?.badgeBg ?? 'bg-gray-100',
                            tipoMap[pub.tipo]?.badgeText ?? 'text-gray-600',
                        ]"
                    >
                        <i :class="[tipoMap[pub.tipo]?.icon ?? 'pi pi-file', 'text-[9px]']" />
                        {{ tipoMap[pub.tipo]?.label ?? pub.tipo }}
                    </span>

                    <!-- Título -->
                    <div class="min-w-0">
                        <p class="font-sans text-sm text-gray-900 font-medium leading-snug line-clamp-1">
                            {{ pub.titulo }}
                        </p>
                        <p class="font-sans text-xs text-gray-400 mt-0.5 line-clamp-1 md:hidden">
                            {{ pub.categoria }} · {{ formatDate(pub.data_publicacao) }}
                        </p>
                    </div>

                    <!-- Categoria -->
                    <span class="hidden md:block font-sans text-xs text-gray-500 whitespace-nowrap">
                        {{ pub.categoria }}
                    </span>

                    <!-- Data -->
                    <span class="hidden sm:block font-sans text-xs text-gray-400 whitespace-nowrap">
                        {{ formatDate(pub.data_publicacao) }}
                    </span>

                    <!-- Ações -->
                    <div class="flex items-center gap-2">
                        <BaseButton
                            icon="pi pi-pencil"
                            color="purple"
                            variant="outlined"
                            title="Editar"
                            class="!px-2.5 !py-2"
                            @click="$router.push(`/pesquisador/publicacoes/${pub.id}/editar`)"
                        />
                        <BaseButton
                            icon="pi pi-trash"
                            color="red"
                            variant="outlined"
                            title="Excluir"
                            class="!px-2.5 !py-2"
                            @click="confirmarRemocao(pub)"
                        />
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- ── Dialog de confirmação de exclusão ────────────────── -->
    <Dialog
        v-model:visible="dialogAberto"
        :header="'Excluir publicação'"
        :style="{ width: '26rem' }"
        modal
        :draggable="false"
    >
        <div class="flex flex-col gap-4">
            <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-full bg-[#BA1A1A]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <i class="pi pi-exclamation-triangle text-[#BA1A1A]" />
                </div>
                <div>
                    <p class="font-sans text-sm text-gray-800 font-medium leading-snug">
                        Tem certeza que deseja excluir esta publicação?
                    </p>
                    <p class="font-sans text-xs text-gray-500 mt-1 leading-relaxed">
                        "{{ publicacaoParaRemover?.titulo }}"
                    </p>
                    <p class="font-sans text-xs text-[#BA1A1A] mt-2">Esta ação não pode ser desfeita.</p>
                </div>
            </div>
        </div>

        <template #footer>
            <div class="flex justify-end gap-2">
                <BaseButton label="Cancelar" color="purple" variant="outlined" @click="dialogAberto = false" />
                <BaseButton label="Excluir" color="red" variant="solid" icon="pi pi-trash" @click="executarRemocao" />
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter }     from 'vue-router';
import Dialog            from 'primevue/dialog';
import { usePesquisadorPublicacoes }  from '@/composables/usePesquisadorPublicacoes.js';
import BaseButton                     from '@/components/BaseButton.vue';
import BaseInput                      from '@/components/BaseInput.vue';
import { useToast }                   from 'primevue/usetoast';

const router                       = useRouter();
const { publicacoes, remover }     = usePesquisadorPublicacoes();
const toast                        = useToast();

// ── Categorias possíveis ──────────────────────────────────────────────────
const CATEGORIAS = [
    'Feminicídio',
    'Transfeminicídio',
    'Violência de Gênero',
    'Masculinidade',
    'Crimes do Patriarcado',
];

// ── Busca e filtro ─────────────────────────────────────────────────────────
const busca               = ref('');
const categoriaSelecionada = ref(null);

const listaFiltrada = computed(() => {
    const q = busca.value.trim().toLowerCase();
    return publicacoes.value.filter((p) => {
        const matchBusca =
            !q ||
            p.titulo.toLowerCase().includes(q) ||
            p.categoria?.toLowerCase().includes(q) ||
            p.tipo.toLowerCase().includes(q);
        const matchCategoria =
            !categoriaSelecionada.value ||
            p.categoria === categoriaSelecionada.value;
        return matchBusca && matchCategoria;
    });
});



// ── Exclusão ────────────────────────────────────────────────────────────────
const dialogAberto         = ref(false);
const publicacaoParaRemover = ref(null);

function confirmarRemocao(pub) {
    publicacaoParaRemover.value = pub;
    dialogAberto.value = true;
}

function executarRemocao() {
    const ok = remover(publicacaoParaRemover.value?.id);
    dialogAberto.value = false;
    if (ok) {
        toast.add({
            severity: 'success',
            summary:  'Publicação excluída',
            detail:   'A publicação foi removida com sucesso.',
            life:     3000,
        });
    }
    publicacaoParaRemover.value = null;
}

// ── Metadados de tipo ───────────────────────────────────────────────────────
const tipoMap = {
    texto:   { label: 'Texto',   icon: 'pi pi-file-edit', badgeBg: 'bg-cor-3/10', badgeText: 'text-cor-3' },
    link:    { label: 'Link',    icon: 'pi pi-link',       badgeBg: 'bg-cor-4/15', badgeText: 'text-cor-4' },
    pdf:     { label: 'PDF',     icon: 'pi pi-file-pdf',   badgeBg: 'bg-cor-8/15', badgeText: 'text-cor-8' },
    video:   { label: 'Vídeo',   icon: 'pi pi-video',      badgeBg: 'bg-cor-5/25', badgeText: 'text-cor-4' },
    podcast: { label: 'Podcast', icon: 'pi pi-headphones', badgeBg: 'bg-cor-6/20', badgeText: 'text-cor-6' },
};

// ── Formatação de data ──────────────────────────────────────────────────────
function formatDate(dateStr) {
    if (!dateStr) return '—';
    const [y, m, d] = dateStr.split('-');
    const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun',
                   'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    return `${d}/${meses[parseInt(m, 10) - 1]}/${y}`;
}
</script>
