// https://nuxt.com/docs/api/configuration/nuxt-config
import { options } from './plugins/PrimeVue/config';
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

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

  primevue: {
    autoImport: false,
    components: {
      include: [
        'Button', 'ConfirmDialog', 'Dialog', 'Toast', 'Card', 'InputNumber', 'Chip',
        'InputText', 'InputGroup', 'InputGroupAddon', 'InputIcon', 'Skeleton', 'Badge',
        'InputMask', 'Select', 'SelectButton', 'Message', 'ProgressSpinner',
        'Popover', 'TextArea',
      ],
    },
    options,
  },
});
