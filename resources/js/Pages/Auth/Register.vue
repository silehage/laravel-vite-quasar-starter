<script setup>
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Head title="Register" />

    <q-card class="card-md box-shadow section" bordered>
        <q-card-section>
            <div class="card-title">
                <h2>Register</h2>
            </div>
            <form @submit.prevent="submit" class="gutter-y">
                <q-input outlined id="name" type="text" class="mt-1 block w-full" v-model="form.name" required autofocus autocomplete="name" label="Name"/>
        
                <q-input outlined id="email" type="email" v-model="form.email" required autofocus autocomplete="username" label="Email"/>
        
                <q-input outlined id="password" type="password" v-model="form.password" required autocomplete="current-password" label="Password"/>
        
                <q-input outlined id="password_confirmation" type="password" v-model="form.password_confirmation" required autocomplete="new-password" label="Confirm Password"/>
        
                <div class="flex items-center justify-end gutter-x-sm">
                    <Link :href="route('login')" class="underline text-sm text-gray-600 hover:text-gray-900">
                        Already registered?
                    </Link>
        
                    <q-btn :loading="form.processing" color="primary" type="submit">
                        Register
                    </q-btn>
                </div>
            </form>
        </q-card-section>
    </q-card>
</template>
