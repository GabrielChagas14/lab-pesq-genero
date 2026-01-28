<script setup>

import Card from 'primevue/card';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import DatePicker from 'primevue/datepicker';
import IftaLabel from 'primevue/iftalabel';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';

</script>
<template>
    <div class="w-full h-full mx-4">
        <Card class="h-full">
            <template #title>
                <h1 class="mb-4">Cadastro Mulher</h1>
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
                            <label>Data do Feminicídio</label>
                        </IftaLabel>
                        <IftaLabel>
                            <label for="description">Descrição</label>
                            <Textarea id="description" class="w-full" v-model="value" rows="5" cols="30" />
                        </IftaLabel>
                    </div>
                    <div class="flex justify-end">
                        <Button label="Salvar" />
                    </div>
                </form>
            </template>
        </Card>
    </div>
</template>
<style scoped></style>