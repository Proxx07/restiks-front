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

  modules: [
    '@pinia/nuxt',
    '@primevue/nuxt-module',
  ],

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
        'Button', 'Card', 'InputNumber', 'InputMask', 'Toast',
        'Select', 'SelectButton', 'InputText', 'InputIcon',
        'InputGroup', 'InputGroupAddon', 'Skeleton', 'TextArea',
      ],
    },
    options,
  },
});
