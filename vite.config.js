import { defineConfig } from 'laravel-vite'
// import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default defineConfig({
    plugins: [
        vue({
            template: { transformAssetUrls }
          }),
        quasar({
        sassVariables: 'resources/css/quasar-variables.scss'
        })
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
            'resources': '/resources'
        },
    },
});