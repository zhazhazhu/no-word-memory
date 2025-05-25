export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules: ['@nuxt/ui', '@nuxtjs/color-mode', '@sidebase/nuxt-auth'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          charset: 'utf-8',
        },
      ],
    },
  },
  ui: {
    fonts: false,
  },
  devServer: {
    port: 3300,
  },
  build: {
    transpile: ['trpc-nuxt'],
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  devtools: { enabled: true },
});
