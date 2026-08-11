<template>
    <div class="pt-14 min-h-screen bg-gray-50">

        <!-- ── Cabeçalho ──────────────────────────────────────── -->
        <div class="bg-white border-b border-gray-200 shadow-sm">
            <div class="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
                <button
                    @click="$router.push('/pesquisador/publicacoes')"
                    class="w-9 h-9 flex items-center justify-center rounded-xl
                           bg-[#380252]/8 text-[#380252] hover:bg-[#380252]/15
                           transition-colors duration-150 cursor-pointer"
                    title="Voltar"
                >
                    <i class="pi pi-arrow-left text-sm" />
                </button>
                <div>
                    <p class="text-[10px] uppercase tracking-wider text-[#380252]/60 font-sans font-medium">
                        Minhas Publicações
                    </p>
                    <h1 class="font-display text-xl text-[#380252] leading-tight">
                        {{ modoEdicao ? 'Editar publicação' : 'Nova publicação' }}
                    </h1>
                </div>
            </div>
        </div>

        <!-- ── Formulário ──────────────────────────────────────── -->
        <div class="max-w-3xl mx-auto px-6 py-8">
            <form @submit.prevent="handleSubmit" novalidate class="flex flex-col gap-6">

                <!-- Card: Informações básicas -->
                <div class="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-5">
                    <div class="flex items-center gap-2 pb-4 border-b border-gray-100">
                        <i class="pi pi-info-circle text-[#380252] text-sm" />
                        <h2 class="font-sans text-sm font-semibold text-[#380252] uppercase tracking-wider">
                            Informações básicas
                        </h2>
                    </div>

                    <!-- Título -->
                    <BaseInput
                        v-model="form.titulo"
                        label="Título *"
                        placeholder="Título da publicação"
                        :error="erros.titulo"
                    />

                    <!-- Tipo + Categoria (lado a lado) -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <BaseInput
                            v-model="form.tipo"
                            type="select"
                            label="Tipo *"
                            :options="tiposOptions"
                            :error="erros.tipo"
                        />
                        <BaseInput
                            v-model="form.categoria"
                            type="select"
                            label="Categoria *"
                            :options="categoriasOptions"
                            :error="erros.categoria"
                        />
                    </div>

                    <!-- Data de publicação -->
                    <BaseInput
                        v-model="form.data_publicacao"
                        label="Data de publicação *"
                        inputType="date"
                        :error="erros.data_publicacao"
                    />
                </div>

                <!-- Card: Conteúdo -->
                <div class="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-5">
                    <div class="flex items-center gap-2 pb-4 border-b border-gray-100">
                        <i class="pi pi-align-left text-[#380252] text-sm" />
                        <h2 class="font-sans text-sm font-semibold text-[#380252] uppercase tracking-wider">
                            Conteúdo
                        </h2>
                    </div>

                    <!-- Resumo -->
                    <BaseInput
                        v-model="form.resumo"
                        type="textarea"
                        label="Resumo *"
                        placeholder="Breve descrição da publicação (aparece nos cards da listagem)"
                        :rows="3"
                        :error="erros.resumo"
                    />

                    <!-- Conteúdo completo -->
                    <BaseInput
                        v-model="form.conteudo"
                        type="textarea"
                        label="Conteúdo completo *"
                        placeholder="Texto completo, descrição detalhada ou transcrição da publicação"
                        :rows="10"
                        :error="erros.conteudo"
                    />
                </div>

                <!-- Ações -->
                <div class="flex items-center justify-between gap-3">
                    <BaseButton
                        label="Cancelar"
                        color="purple"
                        variant="outlined"
                        @click="$router.push('/pesquisador/publicacoes')"
                        type="button"
                    />

                    <BaseButton
                        :label="modoEdicao ? 'Salvar alterações' : 'Publicar'"
                        :icon="modoEdicao ? 'pi pi-save' : 'pi pi-send'"
                        color="purple"
                        variant="solid"
                        :loading="salvando"
                        type="submit"
                    />
                </div>

            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter }     from 'vue-router';
import BaseInput  from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import { usePesquisadorPublicacoes } from '@/composables/usePesquisadorPublicacoes.js';
import { useToast }                  from 'primevue/usetoast';

const props = defineProps({
    /** Se definido, entra em modo edição com os dados pré-preenchidos */
    publicacaoInicial: {
        type: Object,
        default: null,
    },
});

const router   = useRouter();
const toast    = useToast();
const { adicionar, atualizar } = usePesquisadorPublicacoes();

const modoEdicao = Boolean(props.publicacaoInicial);
const salvando   = ref(false);

// ── Formulário ─────────────────────────────────────────────────────────────
const form = reactive({
    titulo:          props.publicacaoInicial?.titulo          ?? '',
    tipo:            props.publicacaoInicial?.tipo            ?? '',
    categoria:       props.publicacaoInicial?.categoria       ?? '',
    data_publicacao: props.publicacaoInicial?.data_publicacao ?? '',
    resumo:          props.publicacaoInicial?.resumo          ?? '',
    conteudo:        props.publicacaoInicial?.conteudo        ?? '',
});

const erros = reactive({
    titulo: '', tipo: '', categoria: '', data_publicacao: '', resumo: '', conteudo: '',
});

// ── Opções dos selects ─────────────────────────────────────────────────────
const tiposOptions = [
    { label: 'Texto',   value: 'texto'   },
    { label: 'Link',    value: 'link'    },
    { label: 'PDF',     value: 'pdf'     },
    { label: 'Vídeo',   value: 'video'   },
    { label: 'Podcast', value: 'podcast' },
];

const categoriasOptions = [
    { label: 'Comunicação',          value: 'Comunicação'          },
    { label: 'Dados & Estatísticas', value: 'Dados & Estatísticas' },
    { label: 'Teoria Feminista',     value: 'Teoria Feminista'     },
    { label: 'Ciência & Tecnologia', value: 'Ciência & Tecnologia' },
    { label: 'Diversidade',          value: 'Diversidade'          },
    { label: 'Economia',             value: 'Economia'             },
    { label: 'Cultura',              value: 'Cultura'              },
    { label: 'Saúde',                value: 'Saúde'                },
    { label: 'Direito',              value: 'Direito'              },
];

// ── Validação ─────────────────────────────────────────────────────────────
function validar() {
    let ok = true;
    const obrigatorios = ['titulo', 'tipo', 'categoria', 'data_publicacao', 'resumo', 'conteudo'];
    obrigatorios.forEach((campo) => {
        if (!form[campo]?.trim()) {
            erros[campo] = 'Campo obrigatório.';
            ok = false;
        } else {
            erros[campo] = '';
        }
    });
    return ok;
}

// ── Submissão ─────────────────────────────────────────────────────────────
async function handleSubmit() {
    if (!validar()) return;

    salvando.value = true;
    await new Promise((r) => setTimeout(r, 500)); // simula latência

    if (modoEdicao) {
        atualizar(props.publicacaoInicial.id, { ...form });
        toast.add({
            severity: 'success',
            summary:  'Publicação atualizada',
            detail:   'As alterações foram salvas com sucesso.',
            life:     3500,
        });
    } else {
        adicionar({ ...form });
        toast.add({
            severity: 'success',
            summary:  'Publicação criada',
            detail:   'A publicação foi adicionada com sucesso.',
            life:     3500,
        });
    }

    salvando.value = false;
    router.push('/pesquisador/publicacoes');
}
</script>
