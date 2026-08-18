<template>
    <!-- ══════════════════════════════════════════════════════
         Hero Section — Dados
    ══════════════════════════════════════════════════════ -->
    <div ref="heroRef" class="relative w-full bg-[#ee977c] overflow-hidden">
        <div class="relative z-10 text-center px-6 pt-24 pb-20">
            <h1 class="font-display text-5xl sm:text-6xl font-bold text-white leading-tight drop-shadow-sm">
                Banco de Dados
            </h1>
            <p class="mt-4 font-sans text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
                Dados a respeito do feminicídio em contexto Sergipano e Nacional. Tendo como fonte os dados dos
                Anuários Brasileiros de Segurança Pública e os dados da Coordenadoria de Estatística e Análise
                Criminal de Sergipe (CEACRIM).
            </p>
        </div>

        <!-- Wave SVG -->
        <div class="leading-[0]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 72"
                preserveAspectRatio="none"
                class="w-full h-[72px] block"
                aria-hidden="true"
            >
                <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="#f0f0f0" />
            </svg>
        </div>
    </div>

    <!-- ══════════════════════════════════════════════════════
         Conteúdo Principal
    ══════════════════════════════════════════════════════ -->
    <div class="flex flex-col gap-8 px-6 py-8" style="background-color: #f0f0f0; min-height: calc(100vh - 200px);">

        <!-- ── Filtros ──────────────────────────────────────── -->
        <section class="flex flex-col items-center gap-6">
            <h2 class="font-display text-3xl sm:text-4xl font-bold text-[#ee977c]">
                Filtre os dados por contexto e por ano
            </h2>

            <!-- Botões de contexto -->
            <div class="flex gap-3 flex-wrap justify-center">
                <BaseButton
                    id="btn-nacional"
                    label="Nacional"
                    :variant="contextos.includes('nacional') ? 'solid' : 'outlined'"
                    color="purple"
                    @click="toggleContexto('nacional')"
                />
                <BaseButton
                    id="btn-sergipe"
                    label="Sergipe"
                    :variant="contextos.includes('sergipe') ? 'solid' : 'outlined'"
                    color="purple"
                    @click="toggleContexto('sergipe')"
                />
            </div>

            <!-- Chips de ano -->
            <div class="flex gap-2 flex-wrap justify-center">
                <BaseButton
                    v-for="ano in anos"
                    :key="ano"
                    :label="String(ano)"
                    shape="chip"
                    color="purple"
                    :variant="anoSelecionado === ano ? 'solid' : 'outlined'"
                    @click="anoSelecionado = ano"
                />
            </div>
        </section>

        <!-- ── Grid de gráficos ─────────────────────────────── -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            <!-- Card 1: Total de Feminicídios -->
            <Card
                v-if="mostrarNacional || mostrarSergipe"
                class="grafico-card"
            >
                <template #title>
                    <div class="flex items-center justify-between gap-2">
                        <span class="font-display text-base font-semibold text-gray-800">Total de Feminicídios</span>
                        <BaseButton :label="labelContexto" shape="chip" color="purple" variant="solid" class="pointer-events-none" />
                    </div>
                </template>
                <template #content>
                    <div ref="chart1Ref" class="w-full h-52" />
                </template>
            </Card>

            <!-- Card 2: Feminicídios por Faixa Etária -->
            <Card
                v-if="mostrarNacional"
                class="grafico-card"
            >
                <template #title>
                    <div class="flex items-center justify-between gap-2">
                        <span class="font-display text-base font-semibold text-gray-800">Por Faixa Etária</span>
                        <BaseButton label="Nacional" shape="chip" color="purple" variant="solid" class="pointer-events-none" />
                    </div>
                </template>
                <template #content>
                    <div ref="chart2Ref" class="w-full h-52" />
                </template>
            </Card>

            <!-- Card 3: Arma Utilizada -->
            <Card
                v-if="mostrarNacional"
                class="grafico-card"
            >
                <template #title>
                    <div class="flex items-center justify-between gap-2">
                        <span class="font-display text-base font-semibold text-gray-800">Arma Utilizada</span>
                        <BaseButton label="Nacional" shape="chip" color="purple" variant="solid" class="pointer-events-none" />
                    </div>
                </template>
                <template #content>
                    <div ref="chart3Ref" class="w-full h-52" />
                </template>
            </Card>

            <!-- Card 4: Relação com o Agressor -->
            <Card
                v-if="mostrarNacional"
                class="grafico-card"
            >
                <template #title>
                    <div class="flex items-center justify-between gap-2">
                        <span class="font-display text-base font-semibold text-gray-800">Relação com o Agressor</span>
                        <BaseButton label="Nacional" shape="chip" color="purple" variant="solid" class="pointer-events-none" />
                    </div>
                </template>
                <template #content>
                    <div ref="chart4Ref" class="w-full h-52" />
                </template>
            </Card>

            <!-- Card 5: Raça / Etnia -->
            <Card
                v-if="mostrarNacional"
                class="grafico-card"
            >
                <template #title>
                    <div class="flex items-center justify-between gap-2">
                        <span class="font-display text-base font-semibold text-gray-800">Raça / Etnia</span>
                        <BaseButton label="Nacional" shape="chip" color="purple" variant="solid" class="pointer-events-none" />
                    </div>
                </template>
                <template #content>
                    <div ref="chart5Ref" class="w-full h-52" />
                </template>
            </Card>

        </section>

        <!-- Estado vazio -->
        <div
            v-if="!mostrarNacional && !mostrarSergipe"
            class="flex flex-col items-center justify-center py-20 gap-3"
        >
            <i class="pi pi-chart-bar text-5xl text-gray-300" />
            <p class="font-sans text-base text-gray-400">Selecione ao menos um contexto para visualizar os dados.</p>
        </div>

    </div>

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
                <path d="M0,0 C360,48 1080,0 1440,24 L1440,0 L0,0 Z" fill="#f0f0f0" />
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
                            class="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20
                                   border border-white/10 hover:border-white/30
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

</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { use }          from 'echarts/core';
import { LineChart, BarChart, PieChart } from 'echarts/charts';
import * as echarts      from 'echarts/core';
import Card              from 'primevue/card';
import BaseButton        from '@/components/BaseButton.vue';
import { usePageHero }   from '@/composables/usePageHero.js';

// Registra tipos de gráfico usados nesta página
use([LineChart, BarChart, PieChart]);

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
    initCharts();
});

onUnmounted(() => {
    heroObserver?.disconnect();
    setHero(false);
    disposeCharts();
});

// ── Filtros ────────────────────────────────────────────────────────────────
const anos          = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];
const anoSelecionado = ref(2025);
const contextos     = ref(['nacional']); // pode ter 'nacional' e/ou 'sergipe'

// PassThrough removido — chips agora usam BaseButton shape="chip"

// ── Links de navegação do footer ─────────────────────────────────────────────────
const navLinks = [
    { label: 'Início',      route: '/',            icon: 'pi pi-home'  },
    { label: 'Memorial',    route: '/memorial',    icon: 'pi pi-heart' },
    { label: 'Atlas',       route: '/atlas',       icon: 'pi pi-map'   },
    { label: 'Publicações', route: '/publicacoes', icon: 'pi pi-book'  },
];

// ── Links das redes sociais ──────────────────────────────────────────────────
const socialLinks = [
    { label: 'Instagram', url: 'https://instagram.com/', icon: 'pi pi-instagram' },
    { label: 'Facebook',  url: 'https://facebook.com/',  icon: 'pi pi-facebook'  },
    { label: 'YouTube',   url: 'https://youtube.com/',   icon: 'pi pi-youtube'   },
    { label: 'Twitter/X', url: 'https://x.com/',         icon: 'pi pi-twitter'   },
];

function toggleContexto(ctx) {
    const idx = contextos.value.indexOf(ctx);
    if (idx === -1) contextos.value.push(ctx);
    else if (contextos.value.length > 1) contextos.value.splice(idx, 1);
    // impede desmarcar o último
}

const mostrarNacional = computed(() => contextos.value.includes('nacional'));
const mostrarSergipe  = computed(() => contextos.value.includes('sergipe'));

const labelContexto = computed(() => {
    if (mostrarNacional.value && mostrarSergipe.value) return 'Nacional e Sergipe';
    if (mostrarNacional.value) return 'Nacional';
    return 'Sergipe';
});

// ── Refs dos containers dos gráficos ──────────────────────────────────────
const chart1Ref = ref(null);
const chart2Ref = ref(null);
const chart3Ref = ref(null);
const chart4Ref = ref(null);
const chart5Ref = ref(null);

let chartInstances = [];

function disposeCharts() {
    chartInstances.forEach(c => c?.dispose());
    chartInstances = [];
}

// ── Dados reais 2024 — contexto Nacional ──────────────────────────────────
const dadosNacionais2024 = {
    // Série histórica (mock para o chart1 de linha)
    totalNacional: [1133, 1092, 1314, 1350, 1319, 1410, 1463, 1467, 1521, 1612],
    totalSergipe:  [18,   22,   25,   30,   28,   32,   35,   38,   36,   40  ],
    anosLinhas:    ['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],

    faixaEtaria: [
        { categoria: '0-11',       valor: 0.010 },
        { categoria: '12-17',      valor: 0.029 },
        { categoria: '18-24',      valor: 0.167 },
        { categoria: '25-29',      valor: 0.144 },
        { categoria: '30-34',      valor: 0.130 },
        { categoria: '35-39',      valor: 0.136 },
        { categoria: '40-44',      valor: 0.134 },
        { categoria: '45-49',      valor: 0.095 },
        { categoria: '50-54',      valor: 0.054 },
        { categoria: '55-59',      valor: 0.041 },
        { categoria: '60 ou mais', valor: 0.060 },
    ],
    armaUtilizada: [
        { categoria: 'Arma branca',        valor: 0.496 },
        { categoria: 'Arma de fogo',       valor: 0.239 },
        { categoria: 'Agressão física',    valor: 0.114 },
        { categoria: 'Outros',             valor: 0.118 },
        { categoria: 'Obj. contundente',   valor: 0.034 },
    ],
    autorCrime: [
        { categoria: 'Companheiro',       valor: 0.630 },
        { categoria: 'Ex-companheiro',    valor: 0.212 },
        { categoria: 'Familiar',          valor: 0.087 },
        { categoria: 'Outros conhecidos', valor: 0.045 },
        { categoria: 'Desconhecidos',     valor: 0.027 },
    ],
    corEtnia: [
        { categoria: 'Negra',    valor: 0.636 },
        { categoria: 'Branca',   valor: 0.358 },
        { categoria: 'Indígena', valor: 0.003 },
        { categoria: 'Amarela',  valor: 0.004 },
    ],
};

// Paleta de cores dos donuts
const PALETTE = ['#ee977c', '#d4785a', '#ba5f43', '#380252', '#7b3495', '#9b55b5'];

/** Gera a configuração de série donut a partir de um dataset { categoria, valor } */
function makePieSeries(dataset) {
    return [{
        type: 'pie',
        radius: ['35%', '65%'],
        data: dataset.map((item, i) => ({
            name:  item.categoria,
            value: +(item.valor * 100).toFixed(1),
            itemStyle: { color: PALETTE[i] },
        })),
        label:    { fontSize: 10 },
        emphasis: { label: { show: true, fontSize: 11, fontWeight: 'bold' } },
    }];
}

async function initCharts() {
    await nextTick();
    disposeCharts();

    const d    = dadosNacionais2024;
    const cor  = '#ee977c';
    const cor2 = '#380252';

    // ── Chart 1: Linha — Total de Feminicídios (NÃO ALTERAR) ─────────────────
    if (chart1Ref.value) {
        const c = echarts.init(chart1Ref.value);
        c.setOption({
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: d.anosLinhas, axisLabel: { fontSize: 10 } },
            yAxis: { type: 'value', axisLabel: { fontSize: 10 } },
            series: [
                mostrarNacional.value && {
                    name: 'Nacional',
                    type: 'line',
                    data: d.totalNacional,
                    smooth: true,
                    lineStyle: { color: cor, width: 2 },
                    itemStyle: { color: cor },
                    areaStyle: { color: `${cor}33` },
                },
                mostrarSergipe.value && {
                    name: 'Sergipe',
                    type: 'line',
                    data: d.totalSergipe,
                    smooth: true,
                    lineStyle: { color: cor2, width: 2 },
                    itemStyle: { color: cor2 },
                    areaStyle: { color: `${cor2}22` },
                },
            ].filter(Boolean),
            grid: { left: 40, right: 10, top: 10, bottom: 30 },
        });
        chartInstances.push(c);
    }

    // ── Chart 2: Barras Horizontais — Faixa Etária ───────────────────────────
    if (chart2Ref.value && mostrarNacional.value) {
        const c = echarts.init(chart2Ref.value);
        const faixaCats   = d.faixaEtaria.map(i => i.categoria);
        const faixaValues = d.faixaEtaria.map(i => +(i.valor * 100).toFixed(1));
        c.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: params => `${params[0].name}: <b>${params[0].value}%</b>`,
            },
            grid: { left: 56, right: 52, top: 6, bottom: 6, containLabel: false },
            xAxis: {
                type: 'value',
                max: 20,
                axisLabel: { formatter: '{value}%', fontSize: 9 },
                splitLine: { lineStyle: { type: 'dashed', color: '#e0e0e0' } },
            },
            yAxis: {
                type: 'category',
                data: faixaCats,
                inverse: true,
                axisLabel: { fontSize: 9.5, color: '#555' },
                axisTick: { show: false },
                axisLine: { show: false },
            },
            series: [{
                type: 'bar',
                data: faixaValues,
                barMaxWidth: 14,
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}%',
                    fontSize: 9,
                    color: '#555',
                },
                itemStyle: {
                    color: params => {
                        const idx = params.dataIndex;
                        return PALETTE[idx % PALETTE.length];
                    },
                    borderRadius: [0, 4, 4, 0],
                },
            }],
        });
        chartInstances.push(c);
    }

    // ── Chart 3: Donut — Arma Utilizada ──────────────────────────────────────
    if (chart3Ref.value && mostrarNacional.value) {
        const c = echarts.init(chart3Ref.value);
        c.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {d}%' },
            series: makePieSeries(d.armaUtilizada),
        });
        chartInstances.push(c);
    }

    // ── Chart 4: Donut — Relação com o Agressor ───────────────────────────────
    if (chart4Ref.value && mostrarNacional.value) {
        const c = echarts.init(chart4Ref.value);
        c.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {d}%' },
            series: makePieSeries(d.autorCrime),
        });
        chartInstances.push(c);
    }

    // ── Chart 5: Raça / Etnia — Barras verticais ───────────────────────────────
    renderEtniaChart();
}

function renderEtniaChart() {
    if (!chart5Ref.value || !mostrarNacional.value) return;

    let c = echarts.getInstanceByDom(chart5Ref.value);
    if (!c) {
        c = echarts.init(chart5Ref.value);
        chartInstances.push(c);
    }

    const d      = dadosNacionais2024;
    const cats   = d.corEtnia.map(i => i.categoria);
    const values = d.corEtnia.map(i => +(i.valor * 100).toFixed(1));

    c.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: p => `${p[0].name}: <b>${p[0].value}%</b>`,
        },
        grid: { left: 10, right: 10, top: 28, bottom: 10, containLabel: true },
        xAxis: {
            type: 'category',
            data: cats,
            axisLabel: { fontSize: 10, color: '#555' },
            axisTick: { show: false },
            axisLine: { lineStyle: { color: '#e0e0e0' } },
        },
        yAxis: {
            type: 'value',
            max: 70,
            axisLabel: { formatter: '{value}%', fontSize: 9, color: '#888' },
            splitLine: { lineStyle: { type: 'dashed', color: '#e0e0e0' } },
        },
        series: [{
            type: 'bar',
            data: values.map((v, i) => ({
                value: v,
                itemStyle: { color: PALETTE[i % PALETTE.length], borderRadius: [4, 4, 0, 0] },
            })),
            barMaxWidth: 48,
            label: {
                show: true,
                position: 'top',
                formatter: '{c}%',
                fontSize: 10,
                fontWeight: 'bold',
                color: '#444',
            },
        }],
    }, true);
}


// Reinicia gráficos quando filtros mudam
watch([anoSelecionado, contextos], () => initCharts(), { deep: true });
</script>


<style scoped>
/* ── Card dos gráficos ─────────────────────────────────────────────────────── */
:deep(.grafico-card) {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(238, 151, 124, 0.12);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}
:deep(.grafico-card:hover) {
    box-shadow: 0 6px 24px rgba(238, 151, 124, 0.22);
    transform: translateY(-2px);
}
:deep(.grafico-card .p-card-title) {
    font-size: 1rem;
    padding: 14px 16px 0;
}
:deep(.grafico-card .p-card-content) {
    padding: 10px 16px 16px;
}
</style>
