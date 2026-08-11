import { ref } from 'vue';

/**
 * usePageHero
 * ──────────────────────────────────────────────────────────
 * Compartilha o estado do hero entre a página e o App.vue,
 * permitindo que o TopBar mude entre transparente e sólido
 * conforme o hero entra/sai da viewport.
 *
 * Uso na PÁGINA:
 *   const { setHero } = usePageHero()
 *   onMounted(() => setHero(true, '#380252'))
 *   onUnmounted(() => setHero(false))
 *
 * Uso no APP:
 *   const { isHeroActive, heroBgColor } = usePageHero()
 */

// Estado module-level (singleton) para comunicação entre componentes
const isHeroActive = ref(false);
const heroBgColor  = ref('#380252');

export function usePageHero() {
    function setHero(active, color = '#380252') {
        isHeroActive.value = active;
        heroBgColor.value  = color;
    }

    return { isHeroActive, heroBgColor, setHero };
}
