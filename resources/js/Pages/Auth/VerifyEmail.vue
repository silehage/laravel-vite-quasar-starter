<script setup>
import { Head, useForm, Link } from '@inertiajs/inertia-vue3';

const props = defineProps({
    status: String,
});

const form = useForm();

const submit = () => {
    form.post(route('verification.send'));
};

const verificationLinkSent = computed(() => props.status === 'verification-link-sent');
</script>

<template>
    <Head title="Email Verification" />
    <q-card class="card-md box-shadow section" bordered>
        <q-card-section>
            <div class="card-title">
                <h2>Email Verification</h2>
            </div>

            <div class="q-mb-sm text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </div>

            <div class="q-mb-sm font-medium text-sm text-green-600" v-if="verificationLinkSent" >
                A new verification link has been sent to the email address you provided during registration.
            </div>

            <form @submit.prevent="submit">
                <div class="flex items-center justify-between">
                    <q-btn :loading="form.processing" color="primary" type="submit">
                        Resend Verification Email
                    </q-btn>

                    <Link :href="route('logout')" method="post" as="button">Log Out</Link>
                </div>
            </form>
        </q-card-section>
    </q-card>
</template>
