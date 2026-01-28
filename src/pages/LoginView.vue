<script setup>
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import { Password } from 'primevue';
import Button from 'primevue/button';
import IftaLabel from 'primevue/iftalabel';


</script>
<template>
    <div class="w-full h-full flex justify-center items-center">
        <Card style="height: 280px;">
            <template #title>
                Login
            </template>
            <template #content>
                <form class="flex flex-col gap-4">
                    <IftaLabel>
                        <label for="username">Username</label>
                        <InputText id="username" type="text" class="w-full" v-model="value" />
                    </IftaLabel>
                    <IftaLabel>
                        <Password inputId="password" v-model="value" toggleMask :feedback="false" />
                        <label for="password">Password</label>
                    </IftaLabel>
                    <Button as="router-link" to="/ResearcherList" label="Entrar" />
                </form>
            </template>
        </Card>
    </div>
</template>
<style lang="scss" scoped></style>