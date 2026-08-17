<template>
    <div ref="heroRef" class="relative w-full bg-[#380252] overflow-hidden">

        <div
            class="absolute inset-0 pointer-events-none"
            style="background: radial-gradient(ellipse at 65% 40%, rgba(79,10,112,0.55) 0%, transparent 65%)"
        />

        <div class="relative z-10 px-6 pt-24 pb-20">

            <div class="flex items-center justify-center gap-2 mb-6 text-white/50 text-xs font-sans">
                <router-link
                    to="/publicacoes"
                    class="hover:text-white/80 transition-colors duration-150 flex items-center gap-1"
                >
                    <i class="pi pi-arrow-left text-[10px]" />
                    Publicações
                </router-link>
                <span>/</span>
                <span class="text-white/40 truncate max-w-xs">{{ pub?.titulo }}</span>
            </div>

            <div class="text-center max-w-3xl mx-auto">

                <span
                    :class="[
                        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full',
                        'text-xs font-semibold font-sans uppercase tracking-wider mb-4',
                        tipoMeta.badgeBg, tipoMeta.badgeText,
                    ]"
                >
                    <i :class="[tipoMeta.icon, 'text-[10px]']" />
                    {{ tipoMeta.label }}
                </span>

                <h1 class="font-display text-4xl sm:text-5xl font-bold text-white leading-tight drop-shadow-sm mt-2">
                    {{ pub?.titulo }}
                </h1>

                <div class="flex items-center justify-center gap-2 mt-4">
                    <div class="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                        <i class="pi pi-user text-white text-xs" />
                    </div>
                    <span class="font-sans text-sm text-white/80 font-medium">{{ pub?.pesquisador }}</span>
                </div>

                <div class="flex items-center justify-center gap-3 mt-3 text-white/50 text-xs font-sans">
                    <span class="flex items-center gap-1">
                        <i class="pi pi-calendar text-[10px]" />
                        {{ formatDate(pub?.data_publicacao) }}
                    </span>
                    <span class="w-1 h-1 rounded-full bg-white/30" />
                    <span class="flex items-center gap-1">
                        <i class="pi pi-tag text-[10px]" />
                        {{ pub?.categoria }}
                    </span>
                </div>
            </div>
        </div>

        <div class="leading-0">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 72"
                preserveAspectRatio="none"
                class="w-full h-18 block"
                aria-hidden="true"
            >
                <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="#f0f0f0" />
            </svg>
        </div>
    </div>

    <div
        v-if="!pub"
        class="flex flex-col items-center justify-center py-24 gap-4 text-center px-6"
    >
        <i class="pi pi-exclamation-circle text-5xl text-gray-300" />
        <p class="font-sans text-gray-500">Publicação não encontrada.</p>
        <router-link
            to="/publicacoes"
            class="font-sans text-sm text-[#380252] underline underline-offset-2"
        >
            Voltar à listagem
        </router-link>
    </div>

    <div v-else class="max-w-6xl mx-auto px-6 py-8">
        <div class="flex gap-8 items-start">

            <aside class="w-64 shrink-0 flex flex-col gap-4 sticky top-20">

                <div
                    :class="[
                        'relative flex items-center justify-center rounded-2xl overflow-hidden',
                        'h-52 shadow-sm',
                        bannerBg,
                    ]"
                >
                    <i :class="[tipoMeta.icon, tipoMeta.iconColor, 'text-7xl opacity-30']" />
                    <div class="absolute bottom-0 left-0 right-0 px-4 py-3 bg-linear-to-t from-black/20">
                        <span :class="['text-[11px] font-semibold font-sans uppercase tracking-wider', tipoMeta.badgeText]">
                            {{ tipoMeta.label }}
                        </span>
                    </div>
                </div>

                <div class="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">

                    <div>
                        <p class="font-sans text-[10px] uppercase tracking-wider text-gray-400 mb-1">Pesquisador(a)</p>
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full bg-[#380252]/10 flex items-center justify-center shrink-0">
                                <i class="pi pi-user text-xs text-[#380252]" />
                            </div>
                            <span class="font-sans text-sm text-gray-800 font-medium leading-tight">
                                {{ pub.pesquisador }}
                            </span>
                        </div>
                    </div>

                    <div class="border-t border-gray-100 pt-4">
                        <p class="font-sans text-[10px] uppercase tracking-wider text-gray-400 mb-1">Categoria</p>
                        <span class="inline-block font-sans text-xs font-medium px-2.5 py-1 rounded-full bg-[#380252]/8 text-[#380252]">
                            {{ pub.categoria }}
                        </span>
                    </div>

                    <div class="border-t border-gray-100 pt-4">
                        <p class="font-sans text-[10px] uppercase tracking-wider text-gray-400 mb-1">Publicado em</p>
                        <p class="font-sans text-sm text-gray-700">{{ formatDate(pub.data_publicacao) }}</p>
                    </div>

                </div>

                <div class="bg-white rounded-2xl shadow-sm p-5">
                    <p class="font-sans text-[10px] uppercase tracking-wider text-gray-400 mb-3">Compartilhar</p>
                    <div class="flex gap-2">
                        <button
                            @click="copyLink"
                            :class="[
                                'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-sans font-medium',
                                'transition-all duration-200 cursor-pointer',
                                copied
                                    ? 'bg-[#009D46]/10 text-[#009D46]'
                                    : 'bg-[#380252]/8 text-[#380252] hover:bg-[#380252]/15',
                            ]"
                            :title="copied ? 'Link copiado!' : 'Copiar link'"
                        >
                            <i :class="copied ? 'pi pi-check' : 'pi pi-link'" class="text-[11px]" />
                            {{ copied ? 'Copiado!' : 'Copiar link' }}
                        </button>
                    </div>
                </div>
            </aside>

            <main class="flex-1 min-w-0 flex flex-col gap-6 pb-12">

                <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div class="border-l-4 border-[#380252] p-6">
                        <div class="flex items-center gap-2 mb-3">
                            <i class="pi pi-align-left text-[#380252] text-sm" />
                            <h2 class="font-sans text-sm font-semibold text-[#380252] uppercase tracking-wider">
                                Resumo
                            </h2>
                        </div>
                        <p class="font-sans text-base text-gray-700 leading-relaxed italic">
                            {{ pub.resumo }}
                        </p>
                    </div>
                </div>

                <div class="bg-white rounded-2xl shadow-sm p-6">
                    <div class="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
                        <i :class="[tipoMeta.icon, 'text-[#380252] text-sm']" />
                        <h2 class="font-sans text-sm font-semibold text-[#380252] uppercase tracking-wider">
                            {{ labelConteudo }}
                        </h2>
                    </div>
                    <div class="font-sans text-gray-700 leading-relaxed text-[15px] whitespace-pre-line">
                        {{ pub.conteudo }}
                    </div>
                </div>

            </main>

        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute }       from 'vue-router';
import { usePageHero }    from '@/composables/usePageHero.js';
import { publicacoesMock } from '@/data/publicacoes.js';

const heroRef     = ref(null);
const { setHero } = usePageHero();
let heroObserver  = null;

onMounted(() => {
    setHero(true, '#380252');
    heroObserver = new IntersectionObserver(
        ([entry]) => setHero(entry.isIntersecting, '#380252'),
        { threshold: 0, rootMargin: '-56px 0px 0px 0px' }
    );
    if (heroRef.value) heroObserver.observe(heroRef.value);
});

onUnmounted(() => {
    heroObserver?.disconnect();
    setHero(false);
});

const route = useRoute();
const pub   = computed(() =>
    publicacoesMock.find((p) => p.id === Number(route.params.id)) ?? null
);

const tipoMap = {
    texto: {
        label: 'Texto', icon: 'pi pi-file-edit',
        badgeBg: 'bg-cor-3/10', badgeText: 'text-cor-3', iconColor: 'text-cor-3',
    },
    link: {
        label: 'Link', icon: 'pi pi-link',
        badgeBg: 'bg-cor-4/15', badgeText: 'text-cor-4', iconColor: 'text-cor-4',
    },
    pdf: {
        label: 'PDF', icon: 'pi pi-file-pdf',
        badgeBg: 'bg-cor-8/15', badgeText: 'text-cor-8', iconColor: 'text-cor-8',
    },
    video: {
        label: 'Vídeo', icon: 'pi pi-video',
        badgeBg: 'bg-cor-5/25', badgeText: 'text-cor-4', iconColor: 'text-cor-5',
    },
    podcast: {
        label: 'Podcast', icon: 'pi pi-headphones',
        badgeBg: 'bg-cor-6/20', badgeText: 'text-cor-6', iconColor: 'text-cor-6',
    },
};

const bannerBgMap = {
    texto:   'bg-gradient-to-br from-cor-1/20 to-cor-3/10',
    link:    'bg-gradient-to-br from-cor-5/20 to-cor-4/15',
    pdf:     'bg-gradient-to-br from-cor-7/30 to-cor-8/15',
    video:   'bg-gradient-to-br from-cor-5/30 to-cor-4/10',
    podcast: 'bg-gradient-to-br from-cor-1/25 to-cor-6/20',
};

const tipoMeta = computed(() => tipoMap[pub.value?.tipo] ?? tipoMap.texto);
const bannerBg = computed(() => bannerBgMap[pub.value?.tipo] ?? bannerBgMap.texto);

// Rótulo do conteúdo varia por tipo
const labelConteudo = computed(() => {
    const map = {
        texto:   'Conteúdo',
        link:    'Sobre o recurso',
        pdf:     'Sobre o documento',
        video:   'Sobre o vídeo',
        podcast: 'Sobre o episódio',
    };
    return map[pub.value?.tipo] ?? 'Conteúdo';
});

const copied = ref(false);
function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        copied.value = true;
        setTimeout(() => (copied.value = false), 2000);
    });
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun',
                    'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    return `${day} de ${months[parseInt(month, 10) - 1]}. de ${year}`;
}
</script>
