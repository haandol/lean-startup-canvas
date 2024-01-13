// https://nuxt.com/docs/api/configuration/nuxt-config
import * as path from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      title: 'Lean Startup Canvas',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  nitro: {
    output: {
      publicDir: path.join(__dirname, 'dist'),
    },
  },
  image: {
    dir: 'assets/images',
  },
  css: ['@/assets/css/main.css'],
  imports: {
    dirs: ['stores'],
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxt/image',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'definePiniaStore', 'acceptHMRUpdate'],
      },
    ],
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
