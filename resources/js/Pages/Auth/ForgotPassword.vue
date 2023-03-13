<script setup>
import { Head, useForm, Link } from '@inertiajs/inertia-vue3';

defineProps({
    status: String,
});

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <Head title="Forgot Password" />
    
    <q-card class="card-md box-shadow section" bordered>
        <q-card-section>
            <div class="card-title">
                <h2>Forgot Password</h2>
            </div>
            <div class="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
            </div>
            <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
                {{ status }}
            </div>
    
            <form @submit.prevent="submit" class="gutter-y q-mt-sm">
                <q-input outlined id="email" type="email" v-model="form.email" required autofocus autocomplete="username" label="Email"/>
    
                <div class="flex items-center justify-between gutter-x">
                    <Link :href="route('login')" class="">
                        Back To Login
                    </Link>
                    <q-btn :loading="form.processing" color="primary" type="submit">
                        Email Password Reset Link
                    </q-btn>
                </div>
            </form>

        </q-card-section>
    </q-card>
</template>
