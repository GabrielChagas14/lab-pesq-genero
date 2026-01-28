<script setup>

import FileUpload from 'primevue/fileupload';
import Card from 'primevue/card';
import Button from 'primevue/button';

</script>
<template>
    <div class="w-full h-full mx-4">
        <Card class="h-full">
            <template #title>
                <h1 class="mb-4">Dados Feminicídio</h1>
            </template>
            <template #content>
                <form>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="flex gap-4">
                            <FileUpload class="p-button-outlined" mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" :auto="true" chooseLabel="Browse" />
                            <Button label="Salvar" />

                        </div>
                    </div>
                    <div class="flex justify-end">
                    </div>
                </form>
            </template>
        </Card>
    </div>
</template>
<style scoped></style>