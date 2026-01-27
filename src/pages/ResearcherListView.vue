<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from '@primevue/core/api';

const columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Nome' },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Telefone' },
    { field: 'birthday', header: 'Data de Nascimento' }
];

const researchers = [
    { id: 1, name: 'Ana Silva', email: 'ana.silva@example.com', phone: '(11) 9 8765-4321', birthday: '1985-06-15' },
    { id: 2, name: 'Bruno Souza', email: 'bruno.souza@example.com', phone: '(21) 9 8765-4321', birthday: '1980-03-20' },
    { id: 3, name: 'Carla Pereira', email: 'carla.pereira@example.com', phone: '(31) 9 8765-4321', birthday: '1982-09-10' },
    { id: 4, name: 'Daniel Costa', email: 'daniel.costa@example.com', phone: '(41) 9 8765-4321', birthday: '1988-07-25' },
    { id: 5, name: 'Elisa Fernandes', email: 'elisa.fernandes@example.com', phone: '(51) 9 8765-4321', birthday: '1987-12-05' },
    { id: 6, name: 'Felipe Gomes', email: 'felipe.gomes@example.com', phone: '(61) 9 8765-4321', birthday: '1986-04-30' }
];

// Definição reativa dos filtros
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
</script>

<template>
    <div class="w-full h-full px-4">
        <div class="mb-4 flex justify-between items-center">
            <h1 class="text-2xl font-medium">
                Pesquisadores
            </h1>
            <Button as="router-link" to="/Researcher" label="Novo Pesquisador" icon="pi pi-plus" />
        </div>
        <DataTable v-model:filters="filters" :value="researchers" stripedRows paginator removableSort :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
            :globalFilterFields="['name', 'email', 'phone']">
            <template #header>
                <div class="flex justify-end">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Busca geral..." />
                    </IconField>
                </div>
            </template>

            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" sortable></Column>
            <Column header="Ações">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-text p-button-sm"
                        @click="editResearcher(slotProps.data)" />
                    <Button icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm"
                        @click="deleteResearcher(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>