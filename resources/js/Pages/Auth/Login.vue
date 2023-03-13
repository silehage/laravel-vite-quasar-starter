<script setup>
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: '',
    remember: false
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};

</script>

<template>
    <Head title="Log in" />

    <q-card class="card-md box-shadow section" bordered>
        <q-card-section>
            <div class="card-title">
                <h2>Login</h2>
            </div>
            <div class="text-red q-pb-sm" v-if="form.hasErrors && form.errors.email"> {{ form.errors.email }}</div> 
            <form @submit.prevent="submit" class="gutter-y">
                <q-input outlined id="email" type="email" v-model="form.email" required autofocus autocomplete="username" label="Email"
                />

                <q-input outlined id="password" type="password" v-model="form.password" required autocomplete="current-password" label="Password"/>

                <div class="flex justify-between items-center">
                    <q-checkbox name="remember" v-model="form.remember" label="Remember me"/>

                    <Link v-if="canResetPassword" :href="route('password.request')">
                        Forgot your password?
                    </Link>
                </div>
        
                <div class="flex items-center justify-end q-mt-lg gutter-x-sm">
        
                    <Link :href="route('register')" class="">
                      Not Yet Registered?
                    </Link>

                    <q-btn :loading="form.processing" color="primary" type="submit">
                        Log in
                    </q-btn>
                </div>
            </form>
        </q-card-section>
    </q-card>
</template>
