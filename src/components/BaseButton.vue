<template>
    <!--
        BaseButton
        ══════════════════════════════════════════════════════
        Props
        ──────────────────────────────────────────────────────
        color   : 'purple' | 'lilac' | 'green' | 'red'
        variant : 'solid' | 'outlined' | 'dotted'
        label   : String  (texto do botão)
        icon    : String  (ícone PrimeIcons, ex: 'pi pi-check')
        disabled: Boolean
        loading : Boolean
        ══════════════════════════════════════════════════════
    -->
    <Button
        :label="label"
        :icon="icon"
        :disabled="disabled"
        :loading="loading"
        :class="buttonClasses"
        v-bind="$attrs"
        unstyled
    />
</template>

<script setup>
import { computed } from 'vue';
import Button from 'primevue/button';

// ── Props ──────────────────────────────────────────────────────────────────
const props = defineProps({
    /** Paleta de cor do botão */
    color: {
        type: String,
        default: 'purple',
        validator: (v) => ['purple', 'lilac', 'green', 'red'].includes(v),
    },
    /** Estilo visual do botão */
    variant: {
        type: String,
        default: 'solid',
        validator: (v) => ['solid', 'outlined', 'dotted'].includes(v),
    },
    label: {
        type: String,
        default: '',
    },
    icon: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
});

// ── Mapa de cores ──────────────────────────────────────────────────────────
//  Cada entrada expõe os tokens necessários para as três variantes.
const colorMap = {
    purple: {
        // #380252 – Roxo escuro (brand)
        solid:    'bg-[#380252] text-white border border-[#380252] hover:bg-[#4f0a70] hover:border-[#4f0a70] active:bg-[#250139]',
        outlined: 'bg-transparent text-[#380252] border border-[#380252] hover:bg-[#380252]/10 active:bg-[#380252]/20',
        dotted:   'bg-transparent text-[#380252] border border-dashed border-[#380252] hover:bg-[#380252]/10 active:bg-[#380252]/20',
    },
    lilac: {
        // #E0A0FD – Lilás claro
        solid:    'bg-[#E0A0FD] text-[#380252] border border-[#E0A0FD] hover:bg-[#cc80f5] hover:border-[#cc80f5] active:bg-[#b860ec]',
        outlined: 'bg-transparent text-[#9B40BF] border border-[#E0A0FD] hover:bg-[#E0A0FD]/20 active:bg-[#E0A0FD]/30',
        dotted:   'bg-transparent text-[#9B40BF] border border-dashed border-[#E0A0FD] hover:bg-[#E0A0FD]/20 active:bg-[#E0A0FD]/30',
    },
    green: {
        // #009D46 – Verde
        solid:    'bg-[#009D46] text-white border border-[#009D46] hover:bg-[#007d38] hover:border-[#007d38] active:bg-[#005d29]',
        outlined: 'bg-transparent text-[#009D46] border border-[#009D46] hover:bg-[#009D46]/10 active:bg-[#009D46]/20',
        dotted:   'bg-transparent text-[#009D46] border border-dashed border-[#009D46] hover:bg-[#009D46]/10 active:bg-[#009D46]/20',
    },
    red: {
        // #BA1A1A – Vermelho
        solid:    'bg-[#BA1A1A] text-white border border-[#BA1A1A] hover:bg-[#961414] hover:border-[#961414] active:bg-[#720f0f]',
        outlined: 'bg-transparent text-[#BA1A1A] border border-[#BA1A1A] hover:bg-[#BA1A1A]/10 active:bg-[#BA1A1A]/20',
        dotted:   'bg-transparent text-[#BA1A1A] border border-dashed border-[#BA1A1A] hover:bg-[#BA1A1A]/10 active:bg-[#BA1A1A]/20',
    },
};

// ── Classes computadas ─────────────────────────────────────────────────────
const buttonClasses = computed(() => {
    const colorVariant = colorMap[props.color]?.[props.variant] ?? '';

    const base = [
        // Layout & tipografia
        'inline-flex items-center justify-center gap-2',
        'px-5 py-2.5 rounded-lg',
        'font-sans font-medium text-sm tracking-wide',
        // Transições
        'transition-all duration-200 ease-in-out',
        // Cursor & foco
        'cursor-pointer select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        // Estados desabilitado / loading
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
    ].join(' ');

    // Ring de foco por cor
    const ringMap = {
        purple: 'focus-visible:ring-[#380252]',
        lilac:  'focus-visible:ring-[#E0A0FD]',
        green:  'focus-visible:ring-[#009D46]',
        red:    'focus-visible:ring-[#BA1A1A]',
    };

    return [base, colorVariant, ringMap[props.color]].join(' ');
});
</script>
