<template>
    <!-- Modo transparente: fundo lilas (#C884D8) -->
    <!-- Modo solido: fundo branco com borda e sombra sutil -->
    <nav
        :class="[
            'w-full flex items-center justify-center px-6 h-14 transition-all duration-300',
            transparent
                ? ''
                : 'bg-white border-b border-gray-200 shadow-sm'
        ]"
        :style="transparent ? { backgroundColor: bgColor } : {}"
    >
        <div
            class="flex items-center gap-9 w-fit px-4 h-full"
            :class="transparent ? 'border-b-2 border-white' : ''"
        >
            <router-link
                v-for="item in navItems"
                :key="item.route"
                :to="item.route"
                custom
                v-slot="{ isActive, navigate, href }"
            >
                <a
                    :href="href"
                    @click="navigate"
                    :class="[
                        'relative pb-1 text-base tracking-wide no-underline transition-colors duration-200',
                        'after:absolute after:bottom-0.5 after:left-0 after:h-0.5 after:rounded-sm after:transition-all after:duration-250',
                        transparent
                            ? [
                                'after:bg-white',
                                isActive
                                    ? 'text-white font-semibold after:w-full'
                                    : 'text-white/85 hover:text-white after:w-0 hover:after:w-full'
                              ]
                            : [
                                'after:bg-primary',
                                isActive
                                    ? 'text-primary font-semibold after:w-full'
                                    : 'text-gray-500 hover:text-primary after:w-0 hover:after:w-full'
                              ]
                    ]"
                >
                    {{ item.label }}
                </a>
            </router-link>
        </div>
    </nav>
</template>

<script setup>
defineProps({
    /**
     * Se `true`, exibe a topbar no modo transparente (fundo colorido).
     * Se `false`, exibe no modo solido (fundo branco com borda).
     */
    transparent: {
        type: Boolean,
        default: false,
    },
    /**
     * Cor de fundo usada no modo transparente.
     * Aceita qualquer valor CSS valido (hex, rgb, var(...), etc.).
     */
    bgColor: {
        type: String,
        default: '#8b3d97',
    },
    /**
     * Lista de itens de navegacao. Cada item deve ter `label` e `route`.
     */
    navItems: {
        type: Array,
        default: () => [
            { label: 'Inicio',   route: '/'        },
            { label: 'Memorial', route: '/Timeline' },
            { label: 'Atlas',    route: '/Atlas'    },
            { label: 'Artigos',  route: '/Artigos'  },
        ],
    },
});
</script>
