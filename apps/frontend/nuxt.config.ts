// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public:{
      KEEP_SECRETS_API_BASE_URL: process.env.KEEP_SECRETS_API_BASE_URL,
      KEEP_SECRETS_FRONTEND_BASE_URL: process.env.KEEP_SECRETS_FRONTEND_BASE_URL,
    }
  },
  
  css: [
    '@/assets/css/style.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
