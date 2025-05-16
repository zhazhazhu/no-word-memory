export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
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
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/fonts', '@nuxtjs/color-mode', '@nuxt/icon'],
  css: ['~/assets/css/main.css'],
});