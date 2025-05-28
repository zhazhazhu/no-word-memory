export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules: [
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@sidebase/nuxt-auth',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
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
  icon: {
    serverBundle: {
      collections: ['fluent:color'],
    },
  },
  devServer: {
    port: 3300,
  },
  build: {
    transpile: ['trpc-nuxt'],
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
  },
  devtools: { enabled: true },
});
