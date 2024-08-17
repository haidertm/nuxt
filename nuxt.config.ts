// https://nuxt.com/docs/api/configuration/nuxt-config
const config = require(`./config/index.ts`);
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxtjs/tailwindcss', 'vue3-carousel-nuxt'],
  runtimeConfig: {
    public: {
      $config: config
    }
  },
  css: ['~/assets/style.scss']
})
