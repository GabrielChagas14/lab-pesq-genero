<template>
    <nav
        :class="[
            'fixed top-0 left-0 right-0 z-50',
            'w-full flex items-center h-14 px-6 transition-all duration-300',
            transparent
                ? ''
                : 'bg-white border-b border-gray-200 shadow-sm'
        ]"
        :style="transparent ? { backgroundColor: bgColor } : {}"
    >
        <!-- Links de navegação — absolutamente centralizados -->
        <div
            class="absolute left-1/2 -translate-x-1/2 flex items-center gap-9 h-full"
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

        <!-- Área do pesquisador logado (canto direito) -->
        <div v-if="isAuthenticated" class="ml-auto flex items-center gap-3">
            <!-- Nome do pesquisador -->
            <div
                class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
                :class="transparent ? 'bg-white/15' : 'bg-[#380252]/8'"
            >
                <div
                    class="w-5 h-5 rounded-full flex items-center justify-center"
                    :class="transparent ? 'bg-white/20' : 'bg-[#380252]/15'"
                >
                    <i
                        class="pi pi-user text-[9px]"
                        :class="transparent ? 'text-white' : 'text-[#380252]'"
                    />
                </div>
                <span
                    class="text-xs font-medium font-sans"
                    :class="transparent ? 'text-white/90' : 'text-[#380252]'"
                >
                    {{ user?.nome }}
                </span>
            </div>

            <!-- Botão Sair -->
            <BaseButton
                label="Sair"
                icon="pi pi-sign-out"
                :color="transparent ? 'lilac' : 'purple'"
                variant="outlined"
                class="!py-1.5 !px-3 !text-xs"
                :class="transparent ? '!text-white !border-white/40 hover:!bg-white/10' : ''"
                @click="handleLogout"
            />
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuth }   from '@/composables/useAuth.js';
import BaseButton    from '@/components/BaseButton.vue';

defineProps({
    transparent: {
        type: Boolean,
        default: false,
    },
    bgColor: {
        type: String,
        default: '#8b3d97',
    },
    navItems: {
        type: Array,
        default: () => [
            { label: 'Inicio',      route: '/'            },
            { label: 'Memorial',    route: '/memorial'    },
            { label: 'Dados',       route: '/dados'        },
            { label: 'Publicações', route: '/publicacoes'  },
        ],
    },
});

const router = useRouter();
const { user, isAuthenticated, logout } = useAuth();

function handleLogout() {
    logout();
    router.push('/login');
}
</script>
