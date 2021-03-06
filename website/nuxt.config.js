// read .env file
const dotenv = require('dotenv');
dotenv.config({ path: require('path').join(__dirname, '.env') });

export default {
  env: {
    BASE_URL: process.env.BASE_URL
  },

  server: {
    host: '0'
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'آکورد گورانی کوردی',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vuesax/dist/vuesax.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vuesax',
    { src: '@plugins/toaster.js', mode: 'client' },
    { src: '@plugins/boot.ts', mode: 'client' },
    { src: '@plugins/croppa.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    {path:'~/components/administration', prefix:''},
    {path:'~/components/database', prefix:''},
    {path:'~/components/inputs', prefix:''},
    {path:'~/components/layouts', prefix:''},
    {path:'~/components/materials', prefix:''},
    {path:'~/components/notifiers', prefix:''},
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      'nuxt-i18n',
      {
        locales: [
          { code: 'fa', iso: 'fa-IR', file: 'fa-IR.js' },
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'fa'
      }
    ],

  ],

  router: {
    middleware: ['init']
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
