<script setup>
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputMask from 'primevue/inputmask';
import DatePicker from 'primevue/datepicker';
import IftaLabel from 'primevue/iftalabel';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';

import { ref } from "vue";

const selectedEducation = ref();
const educations = ref([
    { name: 'Ensino Médio', code: 'EM' },
    { name: 'Graduação', code: 'G' },
    { name: 'Pós-Graduação', code: 'PG' },
    { name: 'Doutorado', code: 'D' }
]);


</script>
<template>
    <div class="w-full h-full mx-4">
        <Card class="h-full">
            <template #title>
                <h1 class="mb-4">Cadastrar Pesquisador</h1>
            </template>
            <template #content>
                <form>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <IftaLabel>
                            <label for="name">Nome Completo</label>
                            <InputText id="name" type="text" class="w-full" v-model="value" />
                        </IftaLabel>
                        <IftaLabel class="w-full">
                            <DatePicker v-model="date" class="w-full" />
                            <label>Data de Nascimento</label>
                        </IftaLabel>
                        <IftaLabel class="w-full">
                            <Select v-model="selectedEducation" :options="educations" optionLabel="name"
                                optionValue="code" placeholder="Selecione a Escolaridade" class="!w-full md:w-56" />
                            <label>Escolaridade</label>
                        </IftaLabel>
                        <IftaLabel>
                            <label for="institution">Instituição de Ensino</label>
                            <InputText id="institution" type="text" class="w-full" v-model="value" />
                        </IftaLabel>
                        <IftaLabel class="w-full">
                            <label for="phone">Telefone</label>
                            <InputMask id="phone" class="w-full" v-model="value" mask="(99)9 9999-9999"
                                placeholder="(99)9 9999-9999" />
                        </IftaLabel>
                        <IftaLabel>
                            <label for="email">E-mail</label>
                            <InputText id="email" type="text" class="w-full" v-model="value" />
                        </IftaLabel>
                    </div>
                    <div class="flex justify-end">
                        <Button as="router-link" to="/ResearcherList" label="Salvar" />
                    </div>
                </form>
            </template>
        </Card>
    </div>
</template>
<style lang="scss" scoped></style>