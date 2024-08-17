// https://nuxt.com/docs/api/configuration/nuxt-config
const config = require(`./config/index.ts`);
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'vue3-carousel-nuxt',
    '@nuxtjs/device'
  ],
  runtimeConfig: {
    public: {
      $config: config
    }
  },
  webpack: {
    extractCSS: true
  },
  css: ['~/assets/style.scss'],
  // css: ['~/assets/style.scss'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
    // cssPath: false
  }
})
