import { ref, computed } from 'vue';

/**
 * useAuth
 * Mock de autenticação para pesquisadores.
 * Em produção: substituir por chamadas JWT/OAuth.
 *
 * Credenciais de demonstração:
 *   ana@lab.com    / 123456  → Dra. Ana Luísa Ferreira
 *   carlos@lab.com / 123456  → Prof. Carlos Mendes
 */

// Usuários mock
const MOCK_USERS = [
    { id: 1, nome: 'Profa. Patricia Rosalba', email: 'patricia@gmail.com', senha: '123456' },
    { id: 2, nome: 'Prof. Carlos Mendes',     email: 'carlos@lab.com',    senha: '123456' },
];

// Estado singleton — persiste enquanto a SPA estiver carregada
const currentUser = ref(null);

export function useAuth() {
    const isAuthenticated = computed(() => currentUser.value !== null);

    /**
     * Tenta fazer login com e-mail e senha.
     * @returns {{ success: boolean, message?: string }}
     */
    function login(email, senha) {
        const found = MOCK_USERS.find(
            (u) => u.email === email.trim() && u.senha === senha
        );
        if (found) {
            currentUser.value = { id: found.id, nome: found.nome, email: found.email };
            return { success: true };
        }
        return { success: false, message: 'E-mail ou senha incorretos.' };
    }

    function logout() {
        currentUser.value = null;
    }

    return { user: currentUser, isAuthenticated, login, logout };
}
