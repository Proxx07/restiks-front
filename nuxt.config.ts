// https://nuxt.com/docs/api/configuration/nuxt-config
import { options } from './plugins/PrimeVue/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  runtimeConfig: {
    apiBaseUrl: 'NUXT_API_BASE_URL',
    apiUser: 'NUXT_API_USER',
    apiPassword: 'NUXT_API_PASSWORD',
  },

  build: {
    transpile: ['primevue'],
  },

  app: {
    pageTransition: {
      name: 'fade-slow',
      mode: 'out-in',
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "~/assets/styles/_global.scss" as *;',
        },
      },
    },
  },

  css: [
    './primeicons/primeicons.css',
    '~/assets/styles/main.scss',
  ],

  modules: [
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    'vue-yandex-maps/nuxt',
  ],

  yandexMaps: {
    apikey: 'd1683129-041e-4b66-b5e3-8dea8e6cb4c2',
  },

  pinia: {
    storesDirs: ['./store/**'],
  },

  imports: {
    dirs: ['store'],
  },

  primevue: {
    autoImport: false,
    components: {
      include: [
        'Button', 'InputNumber', 'InputMask', 'Toast', 'Card',
        'Select', 'SelectButton', 'InputText', 'InputIcon',
        'InputGroup', 'InputGroupAddon', 'Skeleton', 'TextArea',
      ],
    },
    options,
  },
  i18n: {
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    vueI18n: './locales/config.ts',
    locales: [
      {
        code: 'ru',
        language: 'ru-RU',
        name: 'Русский',
        file: 'ru.json',
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'uz',
        language: 'uz-UZ',
        name: 'O\'zbekcha',
        file: 'uz.json',
      },
    ],
  },
});
