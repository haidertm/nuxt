// https://nuxt.com/docs/api/configuration/nuxt-config
const config = require(`./config/index.ts`);
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: config.appHead
  },
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'vue3-carousel-nuxt',
    '@nuxtjs/device',
    'nuxt-booster'
  ],
  booster: {},
  image: {
    provider: 'ipx',
    ipx: {
      maxAge: 60 * 60 * 24 * 365
    }
  },
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
