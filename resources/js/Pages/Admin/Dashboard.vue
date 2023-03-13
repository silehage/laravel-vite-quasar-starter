<script setup>
import { computed, ref } from 'vue'
import { Inertia } from '@inertiajs/inertia'
const title = 'Dashboard'

</script>

<template>
    <Head :title="title" />
    <div class="page-heading">
        <div class="title">{{ title }}</div>
    </div>

    <div>
        Dashboard
    </div>

</template>