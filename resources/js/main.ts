import { createApp, h } from 'vue';
import { createInertiaApp, Head } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Quasar, Dialog, Notify } from 'quasar'
import MainLayout from '@/Layouts/MainLayout.vue'
import AuthLayout from '@/Layouts/AuthLayout.vue'

import quasarIconSet from 'quasar/icon-set/ionicons-v4'

import './bootstrap.js'
// Import icon libraries
import '@quasar/extras/ionicons-v4/ionicons-v4.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import 'resources/css/app.scss'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const module = await resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue'))
        if(name.startsWith('Admin/')) {
            module.default.layout = MainLayout
        }
        if(name.startsWith('Auth/')) {
            module.default.layout = AuthLayout
        }
        return module
    },
    setup({ el, app, props, plugin }) {
        return createApp({ render: () => h(app, props) })
            .use(plugin)
            .use(Quasar, {
                plugins: { Dialog, Notify },
                iconSet: quasarIconSet,
            })
            .mixin({ methods: { route } })
            .component('Head', Head)
            .mount(el);
    },
});

InertiaProgress.init({ color: '#4f1ae2' });
