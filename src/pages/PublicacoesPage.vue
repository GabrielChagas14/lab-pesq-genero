<template>
    <!-- ══════════════════════════════════════════════════════
         Hero Section
         ──────────────────────────────────────────────────────
         Começa em y=0 (atrás do TopBar fixed).
         O TopBar é transparente sobre o hero e muda para sólido
         quando o hero sai da viewport (detectado pelo IntersectionObserver).
    ══════════════════════════════════════════════════════ -->
    <div ref="heroRef" class="relative w-full bg-[#380252] overflow-hidden">

        <!-- Overlay de profundidade (gradiente radial sutil) -->
        <div
            class="absolute inset-0 pointer-events-none"
            style="background: radial-gradient(ellipse at 65% 40%, rgba(79,10,112,0.55) 0%, transparent 65%)"
        />

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
                />
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import PublicacaoCard from '@/components/PublicacaoCard.vue';
import { usePageHero } from '@/composables/usePageHero.js';

// ── Hero scroll detection ──────────────────────────────────────────────────
const heroRef        = ref(null);
const { setHero }    = usePageHero();
let   heroObserver   = null;

onMounted(() => {
    // Ativa o TopBar transparente imediatamente ao entrar na página
    setHero(true, '#380252');

    // IntersectionObserver com rootMargin negativo igual à altura do TopBar (h-14 = 56px).
    // Assim o hero é considerado "fora" quando a parte visível (abaixo do TopBar) sai da tela.
    heroObserver = new IntersectionObserver(
        ([entry]) => {
            setHero(entry.isIntersecting, '#380252');
        },
        {
            threshold:  0,
            rootMargin: '-56px 0px 0px 0px',
        }
    );

    if (heroRef.value) heroObserver.observe(heroRef.value);
});

onUnmounted(() => {
    heroObserver?.disconnect();
    // Garante que o TopBar volta ao sólido ao sair da página
    setHero(false);
});

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

// ── Dados mockados ─────────────────────────────────────────────────────────
const publicacoes = ref([
    {
        id: 1,
        pesquisador: 'Dra. Ana Luísa Ferreira',
        titulo: 'Gênero e poder nas narrativas jornalísticas brasileiras',
        tipo: 'texto',
        resumo: 'Uma análise crítica sobre como as vozes femininas são silenciadas na cobertura política dos principais veículos de comunicação do país.',
        data_publicacao: '2025-03-15',
        categoria: 'Comunicação',
    },
    {
        id: 2,
        pesquisador: 'Prof. Carlos Mendes',
        titulo: 'Violência de gênero: mapeamento regional 2024',
        tipo: 'pdf',
        resumo: 'Relatório com dados regionais sobre violência doméstica e de gênero, cruzando indicadores socioeconômicos e acesso à justiça.',
        data_publicacao: '2025-06-01',
        categoria: 'Dados & Estatísticas',
    },
    {
        id: 3,
        pesquisador: 'Ma. Beatriz Oliveira',
        titulo: 'Feminismo interseccional: conceitos e práticas',
        tipo: 'video',
        resumo: 'Palestra gravada no Simpósio Ibero-Americano de Estudos de Gênero, abordando as interseções entre raça, classe e gênero.',
        data_publicacao: '2025-04-20',
        categoria: 'Teoria Feminista',
    },
    {
        id: 4,
        pesquisador: 'Dra. Renata Souza',
        titulo: 'Podcast: Mulheres na Ciência',
        tipo: 'podcast',
        resumo: 'Série de episódios com pesquisadoras que narram suas trajetórias no ambiente acadêmico e os desafios enfrentados.',
        data_publicacao: '2025-07-10',
        categoria: 'Ciência & Tecnologia',
    },
    {
        id: 5,
        pesquisador: 'Prof. João Araujo',
        titulo: 'Base de dados: ocorrências por bairro – SP',
        tipo: 'link',
        resumo: 'Link para o repositório público com dados georreferenciados de ocorrências de violência de gênero na cidade de São Paulo.',
        data_publicacao: '2025-05-05',
        categoria: 'Dados & Estatísticas',
    },
    {
        id: 6,
        pesquisador: 'Ma. Fernanda Lima',
        titulo: 'Representatividade LGBTQIA+ nas universidades federais',
        tipo: 'texto',
        resumo: 'Estudo quantiqualitativo sobre as políticas de inclusão e os desafios enfrentados por estudantes LGBTQIA+ nas IFEs.',
        data_publicacao: '2025-02-28',
        categoria: 'Diversidade',
    },
    {
        id: 7,
        pesquisador: 'Dra. Camila Pereira',
        titulo: 'O mercado de trabalho e as desigualdades de gênero',
        tipo: 'pdf',
        resumo: 'Análise dos dados do IBGE sobre disparidades salariais e segregação ocupacional por gênero no Brasil de 2010 a 2024.',
        data_publicacao: '2025-01-18',
        categoria: 'Economia',
    },
    {
        id: 8,
        pesquisador: 'Prof. Marcos Ribeiro',
        titulo: 'Documentário: Vozes do Sertão',
        tipo: 'video',
        resumo: 'Curta-metragem que documenta a resistência de mulheres agricultoras no semiárido nordestino diante das mudanças climáticas.',
        data_publicacao: '2025-08-01',
        categoria: 'Cultura',
    },
    {
        id: 9,
        pesquisador: 'Ma. Juliana Costa',
        titulo: 'Episódio 12 – Saúde mental e gênero',
        tipo: 'podcast',
        resumo: 'Debate com psicólogas e ativistas sobre os impactos da cultura do patriarcado na saúde mental de mulheres e pessoas não-binárias.',
        data_publicacao: '2025-07-25',
        categoria: 'Saúde',
    },
    {
        id: 10,
        pesquisador: 'Dra. Patrícia Alves',
        titulo: 'Direitos reprodutivos na América Latina',
        tipo: 'texto',
        resumo: 'Revisão bibliográfica comparativa sobre as legislações e disputas em torno dos direitos reprodutivos nos países latino-americanos.',
        data_publicacao: '2025-06-30',
        categoria: 'Direito',
    },
    {
        id: 11,
        pesquisador: 'Ma. Larissa Nunes',
        titulo: 'Cartografia da violência obstétrica no Brasil',
        tipo: 'link',
        resumo: 'Portal interativo que agrega relatos, estudos e legislação sobre violência obstétrica, com filtros por estado e ano.',
        data_publicacao: '2025-03-03',
        categoria: 'Saúde',
    },
    {
        id: 12,
        pesquisador: 'Prof. Rodrigo Matos',
        titulo: 'Masculinidades e crise do patriarcado',
        tipo: 'texto',
        resumo: 'Ensaio teórico que examina como as transformações sociais contemporâneas afetam as construções identitárias masculinas.',
        data_publicacao: '2025-04-11',
        categoria: 'Teoria Feminista',
    },
]);

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
