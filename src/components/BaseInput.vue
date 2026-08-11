<template>
    <!--
        BaseInput
        ══════════════════════════════════════════════════════
        Props
        ──────────────────────────────────────────────────────
        type     : 'text' | 'textarea' | 'select'
        inputType: String  – tipo do input HTML (default: 'text'). Ex: 'password', 'email', 'date'
        v-model  : valor reativo (string ou qualquer)
        label    : String  – rótulo acima do campo
        placeholder : String
        options  : Array   – obrigatório quando type = 'select'
                            ex: [{ label: 'Opção A', value: 'a' }]
                            ou simplesmente ['Opção A', 'Opção B']
        optionLabel : String – chave de exibição nos objetos (default: 'label')
        optionValue : String – chave de valor nos objetos   (default: 'value')
        hint     : String  – texto auxiliar abaixo do campo
        error    : String  – mensagem de erro (ativa estado de erro)
        disabled : Boolean
        rows     : Number  – linhas do textarea (default: 4)
        ══════════════════════════════════════════════════════
    -->

    <div class="flex flex-col gap-1 w-full">

        <!-- Label -->
        <label
            v-if="label"
            :for="inputId"
            :class="[
                'font-sans text-sm font-medium leading-tight transition-colors duration-150',
                error    ? 'text-[#BA1A1A]' : 'text-[#380252]',
                disabled ? 'opacity-40'      : '',
            ]"
        >
            {{ label }}
        </label>

        <!-- ── INPUT TEXT ──────────────────────────────────────────── -->
        <InputText
            v-if="type === 'text'"
            :id="inputId"
            :type="inputType"
            :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)"
            :placeholder="placeholder"
            :disabled="disabled"
            :class="inputClasses"
            unstyled
        />

        <!-- ── TEXTAREA ───────────────────────────────────────────── -->
        <Textarea
            v-else-if="type === 'textarea'"
            :id="inputId"
            :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)"
            :placeholder="placeholder"
            :disabled="disabled"
            :rows="rows"
            :class="inputClasses"
            autoResize
            unstyled
        />

        <!-- ── SELECT ─────────────────────────────────────────────── -->
        <Select
            v-else-if="type === 'select'"
            :id="inputId"
            :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)"
            :options="options"
            :optionLabel="optionLabel"
            :optionValue="optionValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :class="selectClasses"
            panelClass="bg-white border border-[#380252]/20 rounded-lg shadow-lg mt-1 overflow-hidden"
            unstyled
        >
            <!-- Item da lista -->
            <template #option="{ option }">
                <div
                    class="px-4 py-2 text-sm font-sans text-gray-800
                           hover:bg-[#380252]/8 cursor-pointer transition-colors duration-100"
                >
                    {{ resolveLabel(option) }}
                </div>
            </template>

            <!-- Valor selecionado exibido no campo -->
            <template #value="{ value }">
                <span v-if="value" class="text-gray-800 text-sm">
                    {{ resolveLabel(value) }}
                </span>
                <span v-else class="text-gray-400 text-sm">{{ placeholder }}</span>
            </template>

            <!-- Ícone de seta -->
            <template #dropdownicon>
                <i class="pi pi-chevron-down text-[#380252]/60 text-xs transition-transform duration-200" />
            </template>
        </Select>

        <!-- Hint / Erro -->
        <p
            v-if="error || hint"
            :class="[
                'font-sans text-xs leading-tight mt-0.5 transition-colors duration-150',
                error ? 'text-[#BA1A1A]' : 'text-gray-500',
                disabled ? 'opacity-40' : '',
            ]"
        >
            <i v-if="error" class="pi pi-exclamation-circle mr-1 text-[10px]" />
            {{ error || hint }}
        </p>

    </div>
</template>

<script setup>
import { computed, useId } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea  from 'primevue/textarea';
import Select    from 'primevue/select';

// ── Props & Emits ──────────────────────────────────────────────────────────
const props = defineProps({
    /** Tipo do campo: 'text' | 'textarea' | 'select' */
    type: {
        type: String,
        default: 'text',
        validator: (v) => ['text', 'textarea', 'select'].includes(v),
    },
    /** Tipo HTML do input — usado somente quando type='text'. Ex: 'password', 'email', 'date' */
    inputType: {
        type: String,
        default: 'text',
    },
    modelValue: {
        type: [String, Number, Object, null],
        default: null,
    },
    label: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    /** Somente para type='select' */
    options: {
        type: Array,
        default: () => [],
    },
    optionLabel: {
        type: String,
        default: 'label',
    },
    optionValue: {
        type: String,
        default: 'value',
    },
    hint: {
        type: String,
        default: '',
    },
    /** Mensagem de erro – ativa estado de erro quando não-vazio */
    error: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    /** Número de linhas para o textarea */
    rows: {
        type: Number,
        default: 4,
    },
});

defineEmits(['update:modelValue']);

// ── ID único para acessibilidade ───────────────────────────────────────────
const inputId = useId();

// ── Classes base compartilhadas (InputText / Textarea) ────────────────────
const BASE = [
    'w-full font-sans text-sm text-gray-800',
    'px-4 py-2.5 rounded-lg',
    'border bg-white',
    'placeholder:text-gray-400',
    'transition-all duration-200 ease-in-out',
    'outline-none',
].join(' ');

// ── Estado de cor / borda ──────────────────────────────────────────────────
const stateClasses = computed(() => {
    if (props.disabled) {
        return 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60';
    }
    if (props.error) {
        return [
            'border-[#BA1A1A]',
            'focus:ring-2 focus:ring-[#BA1A1A]/30 focus:border-[#BA1A1A]',
        ].join(' ');
    }
    return [
        'border-gray-300',
        'hover:border-[#380252]/50',
        'focus:ring-2 focus:ring-[#380252]/20 focus:border-[#380252]',
    ].join(' ');
});

// ── Classes para InputText / Textarea ─────────────────────────────────────
const inputClasses = computed(() => [BASE, stateClasses.value].join(' '));

// ── Classes para Select (inclui flex para ícone interno) ──────────────────
const selectClasses = computed(() => [
    'w-full font-sans text-sm text-gray-800',
    'px-4 py-2.5 rounded-lg',
    'border bg-white',
    'flex items-center justify-between gap-2',
    'transition-all duration-200 ease-in-out',
    'outline-none cursor-pointer',
    stateClasses.value,
].join(' '));

// ── Resolver label de item do select (suporta string ou objeto) ────────────
function resolveLabel(item) {
    if (typeof item === 'string' || typeof item === 'number') return item;
    return item?.[props.optionLabel] ?? '';
}
</script>
