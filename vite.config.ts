import path from 'path'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    sentryVitePlugin({
      org: 'akdasa-studios',
      project: 'shlokas'
    })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // define: {
  //   global: "window"
  // },
  // test: {
  //   globals: true,
  //   environment: 'jsdom'
  // },
  server: {
    port: 8080,
  },

  build: {
    sourcemap: true
  }
})