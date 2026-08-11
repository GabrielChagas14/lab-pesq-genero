<template>
    <!--
        PublicacaoCard
        ══════════════════════════════════════════════════════
        Card de publicação seguindo o esqueleto de:
          [ imagem / banner de tipo ]
          [ título (2 linhas max) ]
          [ resumo (3 linhas max) ]
          [ badge tipo ]  [ pesquisador ]
          [ data ]        [ categoria ]
        ══════════════════════════════════════════════════════
    -->
    <article
        class="group flex flex-col bg-white rounded-2xl overflow-hidden
               border border-gray-100 shadow-sm
               hover:shadow-md hover:-translate-y-0.5
               transition-all duration-250 ease-in-out cursor-pointer"
        @click="$emit('click', publicacao)"
    >

        <!-- ── Banner de tipo ──────────────────────────────────── -->
        <div
            :class="[
                'relative flex items-center justify-center h-40 shrink-0',
                bannerBg,
            ]"
        >
            <!-- Ícone grande -->
            <i
                :class="[tipoMeta.icon, tipoMeta.iconColor, 'text-5xl opacity-30']"
            />
            <!-- Badge flutuante no canto -->
            <span
                :class="[
                    'absolute top-3 right-3',
                    'inline-flex items-center gap-1 px-2.5 py-1 rounded-full',
                    'text-[11px] font-semibold font-sans uppercase tracking-wider',
                    tipoMeta.badgeBg, tipoMeta.badgeText,
                ]"
            >
                <i :class="[tipoMeta.icon, 'text-[10px]']" />
                {{ tipoMeta.label }}
            </span>
        </div>

        <!-- ── Conteúdo ────────────────────────────────────────── -->
        <div class="flex flex-col flex-1 p-4 gap-3">

            <!-- Título -->
            <h2
                class="font-sans font-semibold text-sm text-gray-900
                       line-clamp-2 leading-snug
                       group-hover:text-[#380252] transition-colors duration-200"
            >
                {{ publicacao.titulo }}
            </h2>

            <!-- Resumo -->
            <p class="font-sans text-xs text-gray-500 line-clamp-3 leading-relaxed flex-1">
                {{ publicacao.resumo }}
            </p>

            <!-- ── Rodapé ─────────────────────────────────────── -->
            <div class="flex flex-col gap-1.5 pt-2 border-t border-gray-100">

                <!-- Pesquisador -->
                <div class="flex items-center gap-1.5">
                    <div
                        class="w-5 h-5 rounded-full bg-[#380252]/10 flex items-center justify-center shrink-0"
                    >
                        <i class="pi pi-user text-[9px] text-[#380252]" />
                    </div>
                    <span
                        class="font-sans text-xs text-[#380252] font-medium truncate"
                        :title="publicacao.pesquisador"
                    >
                        {{ publicacao.pesquisador }}
                    </span>
                </div>

                <!-- Data + Categoria -->
                <div class="flex items-center justify-between gap-2">
                    <span class="font-sans text-[11px] text-gray-400">
                        <i class="pi pi-calendar mr-1 text-[10px]" />
                        {{ formatDate(publicacao.data_publicacao) }}
                    </span>
                    <span
                        class="inline-block font-sans text-[10px] font-medium px-2 py-0.5
                               rounded-full bg-[#380252]/8 text-[#380252] truncate max-w-[120px]"
                        :title="publicacao.categoria"
                    >
                        {{ publicacao.categoria }}
                    </span>
                </div>

            </div>
        </div>
    </article>
</template>

<script setup>
// ── Props & Emits ──────────────────────────────────────────────────────────
const props = defineProps({
    publicacao: {
        type: Object,
        required: true,
    },
});

defineEmits(['click']);

// ── Metadados visuais por tipo ─────────────────────────────────────────────
//  Cores mapeadas para a paleta do projeto (cor-1 … cor-11 definidas em style.css)
//
//  texto   → cor-3 (#380252) roxo escuro  + cor-1 (#e2a2ff) no banner
//  link    → cor-4 (#02afb6) verde-azulado
//  pdf     → cor-8 (#E87E03) laranja
//  video   → cor-5 (#7cd3ef) azul claro
//  podcast → cor-6 (#f18a9e) rosa
const tipoMap = {
    texto: {
        label:     'Texto',
        icon:      'pi pi-file-edit',
        badgeBg:   'bg-cor-3/10',
        badgeText: 'text-cor-3',
        iconColor: 'text-cor-3',
    },
    link: {
        label:     'Link',
        icon:      'pi pi-link',
        badgeBg:   'bg-cor-4/15',
        badgeText: 'text-cor-4',
        iconColor: 'text-cor-4',
    },
    pdf: {
        label:     'PDF',
        icon:      'pi pi-file-pdf',
        badgeBg:   'bg-cor-8/15',
        badgeText: 'text-cor-8',
        iconColor: 'text-cor-8',
    },
    video: {
        label:     'Vídeo',
        icon:      'pi pi-video',
        badgeBg:   'bg-cor-5/25',
        badgeText: 'text-cor-4',    // cor-4 como texto escuro sobre cor-5 clara
        iconColor: 'text-cor-5',
    },
    podcast: {
        label:     'Podcast',
        icon:      'pi pi-headphones',
        badgeBg:   'bg-cor-6/20',
        badgeText: 'text-cor-6',
        iconColor: 'text-cor-6',
    },
};

const bannerBgMap = {
    texto:   'bg-gradient-to-br from-cor-1/20 to-cor-3/10',   // lilás → roxo
    link:    'bg-gradient-to-br from-cor-5/20 to-cor-4/15',   // azul claro → teal
    pdf:     'bg-gradient-to-br from-cor-7/30 to-cor-8/15',   // amarelo claro → laranja
    video:   'bg-gradient-to-br from-cor-5/30 to-cor-4/10',   // azul claro → teal suave
    podcast: 'bg-gradient-to-br from-cor-1/25 to-cor-6/20',   // lilás → rosa
};

const tipoMeta = tipoMap[props.publicacao.tipo] ?? tipoMap.texto;
const bannerBg = bannerBgMap[props.publicacao.tipo] ?? bannerBgMap.texto;

// ── Formatação de data ─────────────────────────────────────────────────────
function formatDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun',
                    'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    return `${day} ${months[parseInt(month, 10) - 1]}. ${year}`;
}
</script>
