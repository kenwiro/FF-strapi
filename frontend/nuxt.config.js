module.exports = {
  mode: 'universal',

  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  loading: { color: '#fff' },

  plugins: [
    { src: '~/plugins/socket.js' },
  ],

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/eslint-module',
  ],

  modules: [
    '@nuxtjs/pwa',
  ],

  vuetify: {
    customVariables: [ '~/assets/variables.scss' ],
    optionsPath: './vuetify.options.js',
    theme: { dark: true,
      themes: {
        dark: {
          primary: '#1976d2',
          accent: '#424242',
          secondary: '#ff8f00',
          info: '#26a69a',
          warning: '#ffc107',
          error: '#dd2c00',
          success: '#00e676'
        }
      }
    },
  },

  pwa: {
    manifest: {
      name: 'Nuxt.js PWA nuxt-chat-app',
      short_name: 'Nuxt.js PWA',
      start_url: '/',
      theme_color: '#424242',
      display: 'standalone',
    },
  },

  telemetry: false,

  build: {
    extend(config) {
      config.module.rules.push(
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader'
        },
      );
    }
  },
};
