<template>
    <!-- ══════════════════════════════════════════════════════
         Hero Section
         ──────────────────────────────────────────────────────
         Começa em y=0 (atrás do TopBar fixed).
         O TopBar é transparente sobre o hero e muda para sólido
         quando o hero sai da viewport (detectado pelo IntersectionObserver).
    ══════════════════════════════════════════════════════ -->
    <div ref="heroRef" class="relative w-full bg-[#ee977c] overflow-hidden">

        <!-- Conteúdo: pt-14 para ficar abaixo do TopBar fixed -->
        <div class="relative z-10 text-center px-6 pt-24 pb-20">
            <h1 class="font-display text-5xl sm:text-6xl font-bold text-white leading-tight drop-shadow-sm">
                Publicações
            </h1>
            <p class="mt-4 font-sans text-base text-white/70 max-w-lg mx-auto leading-relaxed">
                Explore publicações relacionadas a violência de gênero publicadas ou divulgadas pelo laboratório de pesquisa.
            </p>
        </div>

        <!-- Wave SVG — transição suave do hero para o fundo da página (#f0f0f0) -->
        <div class="leading-[0]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 72"
                preserveAspectRatio="none"
                class="w-full h-[72px] block"
                aria-hidden="true"
            >
                <path
                    d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z"
                    fill="#f0f0f0"
                />
            </svg>
        </div>
    </div>

    <!-- ══════════════════════════════════════════════════════
         Conteúdo — Filtros + Grid
    ══════════════════════════════════════════════════════ -->
    <div class="flex flex-col gap-3 px-6 py-4">

        <!-- ── Filtros & Busca ────────────────────────────────── -->
        <div class="flex flex-col sm:flex-row gap-3 py-2 border-b border-gray-200">

            <!-- Busca -->
            <div class="relative flex-1">
                <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Buscar publicação..."
                    class="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 bg-white
                           font-sans text-sm text-gray-800 placeholder:text-gray-400
                           outline-none transition-all duration-200
                           hover:border-[#380252]/50
                           focus:border-[#380252] focus:ring-2 focus:ring-[#380252]/20"
                />
            </div>

            <!-- Filtro de Tipo -->
            <div class="flex gap-2 flex-wrap">
                <button
                    v-for="tipo in tipos"
                    :key="tipo.value"
                    @click="toggleTipo(tipo.value)"
                    :class="[
                        'inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium font-sans',
                        'transition-all duration-200 cursor-pointer select-none',
                        selectedTipos.includes(tipo.value)
                            ? 'bg-[#380252] text-white border-[#380252]'
                            : 'bg-white text-gray-600 border-gray-300 hover:border-[#380252]/50 hover:text-[#380252]'
                    ]"
                >
                    <i :class="[tipo.icon, 'text-xs']" />
                    {{ tipo.label }}
                </button>
            </div>
        </div>

        <!-- ── Contagem + Ordenação ────────────────────────────── -->
        <div class="flex items-center justify-between">
            <p class="font-sans text-xs text-gray-500">
                {{ publicacoesFiltradas.length }}
                publicaç{{ publicacoesFiltradas.length === 1 ? 'ão' : 'ões' }}
                encontrada{{ publicacoesFiltradas.length === 1 ? '' : 's' }}
            </p>
            <select
                v-model="sortBy"
                class="font-sans text-xs text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 bg-white
                       outline-none cursor-pointer transition-colors duration-150
                       focus:border-[#380252] focus:ring-1 focus:ring-[#380252]/20"
            >
                <option value="data_desc">Mais recentes</option>
                <option value="data_asc">Mais antigas</option>
                <option value="titulo">Título (A-Z)</option>
            </select>
        </div>

        <!-- ── Grid de Cards ──────────────────────────────────── -->
        <div>
            <!-- Estado vazio -->
            <div
                v-if="publicacoesFiltradas.length === 0"
                class="flex flex-col items-center justify-center py-20 gap-3"
            >
                <i class="pi pi-inbox text-4xl text-gray-300" />
                <p class="font-sans text-sm text-gray-400">Nenhuma publicação encontrada.</p>
                <button
                    @click="limparFiltros"
                    class="font-sans text-xs text-[#380252] underline underline-offset-2 cursor-pointer"
                >
                    Limpar filtros
                </button>
            </div>

            <!-- Grid -->
            <div
                v-else
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-6"
            >
                <PublicacaoCard
                    v-for="pub in publicacoesFiltradas"
                    :key="pub.id"
                    :publicacao="pub"
                    @click="abrirPublicacao(pub)"
                />
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter }       from 'vue-router';
import PublicacaoCard      from '@/components/PublicacaoCard.vue';
import { usePageHero }     from '@/composables/usePageHero.js';
import { publicacoesMock } from '@/data/publicacoes.js';

// ── Hero scroll detection ──────────────────────────────────────────────────
const heroRef        = ref(null);
const { setHero }    = usePageHero();
let   heroObserver   = null;

onMounted(() => {
    setHero(true, '#ee977c');
    heroObserver = new IntersectionObserver(
        ([entry]) => setHero(entry.isIntersecting, '#ee977c'),
        { threshold: 0, rootMargin: '-56px 0px 0px 0px' }
    );
    if (heroRef.value) heroObserver.observe(heroRef.value);
});

onUnmounted(() => {
    heroObserver?.disconnect();
    setHero(false);
});

// ── Navegação para detalhe ─────────────────────────────────────────────────
const router = useRouter();
function abrirPublicacao(pub) {
    router.push(`/publicacoes/${pub.id}`);
}

// ── Tipos disponíveis ──────────────────────────────────────────────────────
const tipos = [
    { value: 'texto',   label: 'Texto',   icon: 'pi pi-file-edit'  },
    { value: 'link',    label: 'Link',    icon: 'pi pi-link'       },
    { value: 'pdf',     label: 'PDF',     icon: 'pi pi-file-pdf'   },
    { value: 'video',   label: 'Vídeo',   icon: 'pi pi-video'      },
    { value: 'podcast', label: 'Podcast', icon: 'pi pi-headphones' },
];

// ── Estado dos filtros ─────────────────────────────────────────────────────
const searchQuery   = ref('');
const selectedTipos = ref([]);
const sortBy        = ref('data_desc');

function toggleTipo(value) {
    const idx = selectedTipos.value.indexOf(value);
    if (idx === -1) selectedTipos.value.push(value);
    else selectedTipos.value.splice(idx, 1);
}

function limparFiltros() {
    searchQuery.value   = '';
    selectedTipos.value = [];
}

// ── Dados mockados (importados do arquivo compartilhado) ──────────────────
const publicacoes = ref(publicacoesMock);

// ── Filtragem e ordenação ──────────────────────────────────────────────────

const publicacoesFiltradas = computed(() => {
    let lista = [...publicacoes.value];

    if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase();
        lista = lista.filter(
            (p) =>
                p.titulo.toLowerCase().includes(q)       ||
                p.resumo.toLowerCase().includes(q)       ||
                p.pesquisador.toLowerCase().includes(q)  ||
                p.categoria.toLowerCase().includes(q)
        );
    }

    if (selectedTipos.value.length > 0) {
        lista = lista.filter((p) => selectedTipos.value.includes(p.tipo));
    }

    if (sortBy.value === 'data_desc') {
        lista.sort((a, b) => new Date(b.data_publicacao) - new Date(a.data_publicacao));
    } else if (sortBy.value === 'data_asc') {
        lista.sort((a, b) => new Date(a.data_publicacao) - new Date(b.data_publicacao));
    } else if (sortBy.value === 'titulo') {
        lista.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));
    }

    return lista;
});
</script>
