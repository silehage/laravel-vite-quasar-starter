<script setup>
import { Head, useForm, Link } from '@inertiajs/inertia-vue3';

defineProps({
    status: String,
});

const form = useForm({
    password: '',
});

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => form.reset(),
    })
};
</script>

<template>
    <Head title="Confirm Password" />

    <q-card class="card-md box-shadow section" bordered>
        <q-card-section>
            <div class="card-title">
                <h2>Confirm Password</h2>
            </div>

            <div class="q-mb-md text-sm text-gray-600">
                This is a secure area of the application. Please confirm your password before continuing.
            </div>

            <form @submit.prevent="submit" class="gutter-y">
                <q-input outlined id="password" type="password" v-model="form.password" required label="Password"/>

                <div class="flex justify-end">
                    <q-btn :loading="form.processing" color="primary" type="submit">
                        Confirm
                    </q-btn>
                </div>
            </form>
        </q-card-section>
    </q-card>

</template>
