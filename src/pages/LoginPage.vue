<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-sans"
  >
    <div class="w-full max-w-lg flex flex-col gap-6">
      <div>
        <h1
          class="font-display text-3xl text-[#380252] font-bold leading-tight"
        >
          Entrar na área de pesquisador
        </h1>
        <p class="text-gray-500 text-sm mt-2">
          Faça login para gerenciar suas publicações.
        </p>
      </div>

      <form
        @submit.prevent="handleLogin"
        novalidate
        class="flex flex-col gap-4"
      >
        <BaseInput
          v-model="form.email"
          label="E-mail"
          placeholder="seu@email.com"
          inputType="email"
          :error="erros.email"
        />

        <BaseInput
          v-model="form.senha"
          label="Senha"
          placeholder="••••••••"
          inputType="password"
          :error="erros.senha"
        />

        <div class="flex justify-end -mt-1">
          <span class="text-xs text-gray-400 cursor-not-allowed select-none">
            Esqueceu a senha?
          </span>
        </div>

        <div
          v-if="erros.geral"
          class="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#BA1A1A]/8 border border-[#BA1A1A]/20"
        >
          <i class="pi pi-exclamation-circle text-[#BA1A1A] text-sm" />
          <p class="text-[#BA1A1A] text-sm">{{ erros.geral }}</p>
        </div>

        <BaseButton
          type="submit"
          label="Entrar"
          icon="pi pi-sign-in"
          color="purple"
          variant="solid"
          :loading="carregando"
          class="w-full justify-center"
        />
      </form>

      <div class="text-center">
        <router-link
          to="/publicacoes"
          class="text-xs text-gray-400 hover:text-[#380252] transition-colors duration-150 underline underline-offset-2"
        >
          Ver publicações do laboratório sem login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from "vue";
  import { useRouter } from "vue-router";
  import { useAuth } from "@/composables/useAuth.js";
  import BaseInput from "@/components/BaseInput.vue";
  import BaseButton from "@/components/BaseButton.vue";

  const router = useRouter();
  const { login } = useAuth();

  const form = reactive({ email: "", senha: "" });
  const erros = reactive({ email: "", senha: "", geral: "" });
  const carregando = ref(false);

  function validar() {
    erros.email = "";
    erros.senha = "";
    erros.geral = "";
    let ok = true;

    if (!form.email.trim()) {
      erros.email = "Informe o e-mail.";
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      erros.email = "E-mail inválido.";
      ok = false;
    }

    if (!form.senha) {
      erros.senha = "Informe a senha.";
      ok = false;
    }

    return ok;
  }

  async function handleLogin() {
    if (!validar()) return;

    carregando.value = true;
    await new Promise((r) => setTimeout(r, 600));

    const resultado = login(form.email, form.senha);
    carregando.value = false;

    if (resultado.success) {
      router.push("/pesquisador/publicacoes");
    } else {
      erros.geral = resultado.message;
    }
  }
</script>
