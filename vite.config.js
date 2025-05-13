// import react from '@vitejs/plugin-react'
// import laravel from 'laravel-vite-plugin'
// import { defineConfig } from 'vite'

import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'
// export default defineConfig({
//   plugins: [
//     react(),
//     laravel({
//       input: ['resources/css/app.css', 'resources/js/app.js'],
//       refresh: true,
//     }),
//   ],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://127.0.0.1:8000/',
//         changeOrigin: true,
//         headers: {
//           Accept: 'application/json',
//           Content_Type: 'application/json',
//         },
//       },
//     },
//   },
// })
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.js'],
      refresh: true,
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000/',
        changeOrigin: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    },
  },
})
