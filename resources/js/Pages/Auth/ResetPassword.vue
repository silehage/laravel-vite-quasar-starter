<script setup>
import { Head, useForm } from '@inertiajs/inertia-vue3';

const props = defineProps({
    email: String,
    token: String,
});

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('password.update'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Head title="Reset Password" />

    <q-card class="card-md box-shadow section" bordered>
        <q-card-section>
            <div class="card-title">
                <h2>Reset Password</h2>
            </div>

            <form @submit.prevent="submit" class="gutter-y">
        
                <q-input outlined id="email" type="email" v-model="form.email" required autofocus autocomplete="username" label="Email"/>
        
                <q-input outlined id="password" type="password" v-model="form.password" required autocomplete="current-password" label="Password"/>
        
                <q-input outlined id="password_confirmation" type="password" v-model="form.password_confirmation" required autocomplete="new-password" label="Confirm Password"/>

                <div class="flex items-center justify-end">
                    <q-btn :loading="form.processing" color="primary" type="submit">
                        Reset Password
                    </q-btn>
                </div>
            </form>
        </q-card-section>
    </q-card>
</template>
