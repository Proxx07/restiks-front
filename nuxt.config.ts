// https://nuxt.com/docs/api/configuration/nuxt-config
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
  ],

  pinia: {
    storesDirs: ['./store/**'],
  },

});
