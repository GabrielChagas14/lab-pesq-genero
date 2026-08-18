<template>
    <!-- ══════════════════════════════════════════════════════
         Hero Section — Memorial
         Começa em y=0 (atrás do TopBar fixed).
         paperPattern.png faz a transição entre o hero roxo e o fundo #F0F0F0.
    ══════════════════════════════════════════════════════ -->
    <div class="min-h-screen flex flex-col" style="background-color: #F0F0F0;">

        <!-- ── Hero ────────────────────────────────────────────────── -->
        <div ref="heroRef" class="relative w-full bg-[#ee977c] overflow-hidden">

            <!-- Conteúdo do hero -->
            <div class="relative z-10 text-center px-6 pt-24 pb-16">
                <h1 class="font-display text-5xl sm:text-6xl font-bold text-white leading-tight drop-shadow-sm">
                    Memorial de Vítimas Feminicídio
                    <br />
                    Em Sergipe
                </h1>
                <p class="mt-5 font-sans text-xl text-white max-w-xl mx-auto leading-relaxed">
                    Este memorial homenageia a vida e a memória das mulheres sergipanas
                    que tiveram suas vidas ceifadas pelo feminicídio.
                </p>
            </div>

            <!-- Papel rasgado — transição para o fundo #F0F0F0 -->
            <div class="relative w-full leading-[0]">
                <img
                    src="@/assets/images/paperPattern.png"
                    alt=""
                    aria-hidden="true"
                    class="w-full block object-cover object-top"
                    style="margin-bottom: -2px;"
                />
                <!-- Gradiente de suavização: cobre a borda inferior do papel com a cor do fundo -->
                <div
                    class="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                    style="background: linear-gradient(to bottom, transparent 0%, #F0F0F0 100%);"
                />
            </div>
        </div>

        <!-- ══════════════════════════════════════════════════════
             Conteúdo principal — Memorial
        ══════════════════════════════════════════════════════ -->
        <main class="flex-1 grain-bg" style="background-color: #F0F0F0;">
            <div class="max-w-4xl mx-auto px-6 py-14">

                <!-- ── Timeline por ano ───────────────────────────────── -->
                <div
                    v-for="(grupo, gi) in vitimas"
                    :key="grupo.ano"
                    class="year-group"
                >
                    <!-- Rótulo do ano -->
                    <div
                        :class="[
                            'year-label font-display text-3xl font-bold text-[#ee977c]',
                            gi % 2 === 0 ? 'year-left' : 'year-right',
                        ]"
                    >
                        {{ grupo.ano }}
                    </div>

                    <!-- Cards com linha conectora -->
                    <div class="cards-track">
                        <div
                            v-for="(vitima, vi) in grupo.lista"
                            :key="vitima.id"
                            class="card-row"
                        >
                            <!-- Card posicionado alternadamente -->
                            <article
                                :class="['memorial-card', (vi + gi) % 2 === 0 ? 'card-left' : 'card-right']"
                            >
                                <!-- Foto da vítima ou placeholder -->
                                <img
                                    v-if="resolverFoto(vitima.imagem)"
                                    :src="resolverFoto(vitima.imagem)"
                                    :alt="`Foto de ${vitima.nome}`"
                                    class="card-photo card-photo--img"
                                />
                                <div v-else class="card-photo" />

                                <!-- Conteúdo -->
                                <div class="card-body">
                                    <!-- Nome + idade -->
                                    <div class="card-header">
                                        <h3 class="card-name">{{ vitima.nome }}</h3>
                                        <span class="card-age">{{ vitima.idade }} anos</span>
                                    </div>
                                    <!-- Descrição -->
                                    <p class="card-desc">{{ vitima.descricao }}</p>
                                </div>
                            </article>

                            <!-- Linha tracejada conectora diagonal (exceto no último) -->
                            <div
                                v-if="vi < grupo.lista.length - 1"
                                :class="['connector', (vi + gi) % 2 === 0 ? 'connector-to-right' : 'connector-to-left']"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </main>


        <!-- ══════════════════════════════════════════════════════
             Footer
        ══════════════════════════════════════════════════════ -->
        <footer class="bg-[#ee977c] text-white">

            <!-- Onda de separação -->
            <div class="w-full leading-[0]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 48"
                    preserveAspectRatio="none"
                    class="w-full h-12 block"
                    aria-hidden="true"
                >
                    <path d="M0,0 C360,48 1080,0 1440,24 L1440,0 L0,0 Z" fill="#F0F0F0" />
                </svg>
            </div>

            <div class="max-w-5xl mx-auto px-6 pt-4 pb-12">

                <!-- Grid principal -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

                    <!-- Col 1 — Sobre -->
                    <div>
                        <h3 class="font-display text-2xl text-white mb-3">Laboratório de Pesquisa em Violências Domésticas, Feminicídio e Transfeminicídio</h3>
                        <p class="font-sans text-base text-white/85 leading-relaxed">
                            Laboratório interdisciplinar dedicado ao estudo e combate
                            à violência de gênero no estado de Sergipe.
                        </p>
                    </div>

                    <!-- Col 2 — Navegação -->
                    <div>
                        <h4 class="font-sans text-xs uppercase tracking-widest text-white/60 font-semibold mb-4">
                            Navegação
                        </h4>
                        <ul class="flex flex-col gap-2.5">
                            <li v-for="link in navLinks" :key="link.route">
                                <router-link
                                    :to="link.route"
                                    class="font-sans text-base text-white/85 hover:text-white
                                           transition-colors duration-200 flex items-center gap-2"
                                >
                                    <i :class="[link.icon, 'text-sm text-white/50']" />
                                    {{ link.label }}
                                </router-link>
                            </li>
                        </ul>
                    </div>

                    <!-- Col 3 — Redes Sociais -->
                    <div>
                        <h4 class="font-sans text-xs uppercase tracking-widest text-white/60 font-semibold mb-4">
                            Redes Sociais
                        </h4>
                        <div class="flex gap-3 flex-wrap">
                            <a
                                v-for="social in socialLinks"
                                :key="social.label"
                                :href="social.url"
                                target="_blank"
                                rel="noopener noreferrer"
                                :title="social.label"
                                class="w-10 h-10 rounded-xl bg-white/10 hover:bg-cor-7/20
                                       border border-white/10 hover:border-cor-7/40
                                       flex items-center justify-center
                                       transition-all duration-200 group"
                            >
                                <i :class="[social.icon,
                                    'text-white/85 group-hover:text-white text-lg transition-colors duration-200']" />
                            </a>
                        </div>
                    </div>

                </div>

                <!-- Divider + apoio institucional -->
                <div class="border-t border-white/10 pt-8">

                    <p class="font-sans text-xs uppercase tracking-widest text-white/60 font-semibold mb-6 text-center">
                        Apoio Institucional
                    </p>

                    <div class="flex items-center justify-center gap-10 flex-wrap mb-8">
                        <img
                            src="@/assets/images/cnpq.png"
                            alt="CNPq — Conselho Nacional de Desenvolvimento Científico e Tecnológico"
                            class="h-14 object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
                        />
                        <img
                            src="@/assets/images/lab pesquisa.png"
                            alt="Laboratório de Pesquisa de Gênero"
                            class="h-20 object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
                        />
                    </div>

                    <p class="font-sans text-sm text-white/70 text-center">
                    © {{ new Date().getFullYear() }} Laboratório de Pesquisa em Violências Domésticas, Feminicídio e Transfeminicídio — UFS.
                    Todos os direitos reservados.
                </p>
                </div>

            </div>
        </footer>

    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// ── Importação dinâmica de todas as fotos de vítimas ──────────────────────────
const fotosModules = import.meta.glob(
    '@/assets/images/vitimas/*',
    { eager: true }
);

// Cria mapa: { "FlaviaBarros": "/caminho/hash.png", ... }
const fotosMap = Object.fromEntries(
    Object.entries(fotosModules).map(([path, mod]) => {
        const nomeComExt = path.split('/').pop();
        const nomeSemExt = nomeComExt.replace(/\.[^.]+$/, '');
        return [nomeSemExt, mod.default ?? mod];
    })
);

/** Retorna URL da foto ou null se não cadastrada */
function resolverFoto(imagem) {
    if (!imagem) return null;
    return fotosMap[imagem] ?? null;
}
import { usePageHero } from '@/composables/usePageHero.js';

// ── Hero scroll detection ──────────────────────────────────────────────────
const heroRef      = ref(null);
const { setHero }  = usePageHero();
let   heroObserver = null;

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

// ── Links de navegação do footer ───────────────────────────────────────────
const navLinks = [
    { label: 'Início',      route: '/',            icon: 'pi pi-home'  },
    { label: 'Memorial',    route: '/memorial',    icon: 'pi pi-heart' },
    { label: 'Atlas',       route: '/atlas',       icon: 'pi pi-map'   },
    { label: 'Publicações', route: '/publicacoes', icon: 'pi pi-book'  },
];

// ── Links das redes sociais ────────────────────────────────────────────────
const socialLinks = [
    { label: 'Instagram', url: 'https://instagram.com/', icon: 'pi pi-instagram' },
    { label: 'Facebook',  url: 'https://facebook.com/',  icon: 'pi pi-facebook'  },
    { label: 'YouTube',   url: 'https://youtube.com/',   icon: 'pi pi-youtube'   },
    { label: 'Twitter/X', url: 'https://x.com/',         icon: 'pi pi-twitter'   },
];

// ── Dados de vítimas (placeholder) ────────────────────────────────────────
const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.';

const vitimas = [
    {
        ano: 2026,
        lista: [
            { id: 1,  nome: 'Flávia Barros', idade: 38, descricao: "Flávia era empresária e foi assassinada a tiros pelo seu companheiro em Aracaju.", imagem: "FlaviaBarros" },
            { id: 2,  nome: 'Eliene Amaro', idade: 37, descricao: "Eliene era marisqueira e foi assassinada na frente dos seus três filhos pelo ex-companheiro em Pirunga.", imagem: "ElieneAmaro" },
            { id: 3,  nome: 'Angela Maria', idade: 64, descricao: "Angela foi morta pelo seu ex-companheiro em Propriá" },
        ],
    },
    {
        ano: 2025,
        lista: [
            { id: 4,  nome: 'Yasmin Souza', idade: 23, descricao: "Yasmin foi morta após uma briga de casal na casa do pai da vítima em Aracaju pelo seu companheiro." },
            { id: 7,  nome: 'Nome 2', idade: 45, descricao: LOREM },
            { id: 8,  nome: 'Nome 3', idade: 31, descricao: LOREM },
            { id: 9,  nome: 'Nome 4', idade: 22, descricao: LOREM },
        ],
    },
    {
        ano: 2023,
        lista: [
            { id: 10, nome: 'Nome 1', idade: 36, descricao: LOREM },
            { id: 11, nome: 'Nome 2', idade: 19, descricao: LOREM },
            { id: 12, nome: 'Nome 3', idade: 52, descricao: LOREM },
        ],
    },
];
</script>

<style scoped>
/* ── Granulado de papel ────────────────────────────────────────────────────── */
.grain-bg { position: relative; }
.grain-bg::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 300px 300px;
}
.grain-bg > * { position: relative; z-index: 1; }

/* ── Grupo de ano ─────────────────────────────────────────────────────────── */
.year-group {
    margin-bottom: 64px;
}

/* Rótulo do ano — alterna esquerda/direita */
.year-label {
    margin-bottom: 28px;
    font-size: 2rem;
}
.year-left  { text-align: left;  }
.year-right { text-align: right; }

/* ── Track (coluna de cards + conectores) ─────────────────────────────────── */
.cards-track {
    display: flex;
    flex-direction: column;
}

/* Cada linha contém o card + o conector abaixo */
.card-row {
    position: relative;
    display: flex;
    flex-direction: column;
}

/* ── Card individual ──────────────────────────────────────────────────────── */
.memorial-card {
    width: 36%;
    aspect-ratio: 1 / 1;         /* card quadrado */
    background: #ffffff;
    border-radius: 18px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 12px rgba(238, 151, 124, 0.15);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.memorial-card:hover {
    box-shadow: 0 6px 24px rgba(238, 151, 124, 0.30);
    transform: translateY(-2px);
}

/* Alterna posição esquerda / direita */
.card-left  { align-self: flex-start; }
.card-right { align-self: flex-end;   }

/* ── Foto placeholder ─────────────────────────────────────────────────────── */
.card-photo {
    width: 100%;
    flex: 1 1 0;                 /* ocupa o espaço restante do card quadrado */
    min-height: 0;
    background-color: #d8c4e8;   /* roxo clarinho — fallback */
}

/* Quando há imagem real */
.card-photo--img {
    object-fit: cover;
    object-position: top center;
    display: block;
}

/* ── Corpo do card ────────────────────────────────────────────────────────── */
.card-body {
    padding: 14px 16px 16px;
}

.card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;
}

.card-name {
    font-family: var(--font-display, serif);
    font-size: 0.95rem;
    font-weight: 600;
    color: #ee977c;
    line-height: 1.3;
}

.card-age {
    flex-shrink: 0;
    font-family: var(--font-sans, sans-serif);
    font-size: 0.7rem;
    font-weight: 500;
    color: #ffffff;
    background: rgba(238, 151, 124, 0.85);
    border-radius: 99px;
    padding: 2px 9px;
    margin-top: 2px;
    white-space: nowrap;
}

.card-desc {
    font-family: var(--font-sans, sans-serif);
    font-size: 0.72rem;
    color: #888;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* ── Conector tracejado diagonal ──────────────────────────────────────────── */
/*
    Linha diagonal SVG embutida via background-image no pseudo-elemento ::before.
    .connector-to-right: linha vai do canto inferior-esquerdo ao canto superior-direito
                         (card da esquerda → próximo card da direita).
    .connector-to-left:  linha vai do canto inferior-direito ao canto superior-esquerdo
                         (card da direita → próximo card da esquerda).
*/
.connector-to-right,
.connector-to-left {
    position: relative;
    height: 52px;
    margin: 2px 0;
    overflow: visible;
}

.connector-to-right::before,
.connector-to-left::before {
    content: '';
    position: absolute;
    top: 0;
    left: 24%;
    width: 52%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cline x1='0%25' y1='0%25' x2='100%25' y2='100%25' stroke='%23ee977c' stroke-opacity='0.50' stroke-width='2' stroke-dasharray='6 5' stroke-linecap='round'/%3E%3C/svg%3E");
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

/* Conector direita→esquerda: linha vai de cima-direita para baixo-esquerda */
.connector-to-left::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cline x1='100%25' y1='0%25' x2='0%25' y2='100%25' stroke='%23ee977c' stroke-opacity='0.50' stroke-width='2' stroke-dasharray='6 5' stroke-linecap='round'/%3E%3C/svg%3E");
}
</style>

