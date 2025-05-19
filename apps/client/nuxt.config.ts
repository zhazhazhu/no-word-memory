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
  ui: {
    fonts: false,
  },
  auth: {
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'github',
      addDefaultCallbackUrl: true,
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/color-mode', '@sidebase/nuxt-auth'],
  css: ['~/assets/css/main.css'],
});
