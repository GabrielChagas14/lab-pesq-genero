import { ref } from 'vue';
import { publicacoesMock } from '@/data/publicacoes.js';
import { useAuth } from './useAuth.js';

/**
 * usePesquisadorPublicacoes
 * Store reativo de CRUD de publicações para a área do pesquisador.
 *
 * Nota: em produção, cada operação seria uma chamada de API.
 * As alterações aqui NÃO refletem nas páginas públicas (que usam o
 * import estático de publicacoes.js) — isso seria resolvido por uma API real.
 */

// Estado singleton: cópia reativa do mock
const publicacoes = ref([...publicacoesMock]);
let _nextId = Math.max(...publicacoesMock.map((p) => p.id)) + 1;

export function usePesquisadorPublicacoes() {
    const { user } = useAuth();

    /**
     * Busca uma publicação pelo id (numérico ou string).
     */
    function buscarPorId(id) {
        return publicacoes.value.find((p) => p.id === Number(id)) ?? null;
    }

    /**
     * Adiciona uma nova publicação atribuída ao pesquisador logado.
     * @param {Object} dados — campos da publicação (sem id e pesquisador)
     */
    function adicionar(dados) {
        const nova = {
            id:          _nextId++,
            pesquisador: user.value?.nome ?? 'Desconhecido',
            ...dados,
        };
        publicacoes.value.push(nova);
        return nova;
    }

    /**
     * Atualiza os campos de uma publicação existente.
     */
    function atualizar(id, dados) {
        const idx = publicacoes.value.findIndex((p) => p.id === Number(id));
        if (idx === -1) return false;
        publicacoes.value[idx] = { ...publicacoes.value[idx], ...dados };
        return true;
    }

    /**
     * Remove uma publicação pelo id.
     */
    function remover(id) {
        const before = publicacoes.value.length;
        publicacoes.value = publicacoes.value.filter((p) => p.id !== Number(id));
        return publicacoes.value.length < before;
    }

    return { publicacoes, buscarPorId, adicionar, atualizar, remover };
}
